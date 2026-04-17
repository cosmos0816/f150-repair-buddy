/**
 * RockAuto catalog scraper for 2010 Ford F-150 5.4L V8.
 *
 * Usage:
 *   npx playwright install chromium   # first time only
 *   npx tsx scripts/scrape-rockauto.ts
 *
 * Output:
 *   sources/rockauto/catalog.json
 */

import { chromium, type Page } from "playwright";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BASE_URL = "https://www.rockauto.com";
const VEHICLE_PATH =
  "/en/catalog/ford,2010,f-150,5.4l+v8,1444700";
const OUTPUT_DIR = join(import.meta.dirname ?? ".", "..", "sources", "rockauto");
const OUTPUT_FILE = join(OUTPUT_DIR, "catalog.json");

const DELAY_BETWEEN_PAGES_MS = Number(process.env.RA_PAGE_DELAY_MS ?? "2000");
const DELAY_BETWEEN_CATEGORIES_MS = Number(
  process.env.RA_CATEGORY_DELAY_MS ?? "3000",
);
const PAGE_LOAD_TIMEOUT_MS = 30000;
const RESUME_EXISTING = process.env.RA_RESUME_EXISTING !== "0";
const SKIP_EXISTING_CATEGORIES = process.env.RA_SKIP_EXISTING_CATEGORIES === "1";
const SKIP_CATEGORY_MIN_PARTS = Number(
  process.env.RA_SKIP_CATEGORY_MIN_PARTS ?? "25",
);
const CATEGORY_FILTER = (process.env.RA_CATEGORY_FILTER ?? "")
  .split("|")
  .map((value) => value.trim())
  .filter(Boolean);

type ScrapedPart = {
  category: string;
  subcategory: string;
  brand: string;
  partNumber: string;
  description: string;
  price: string;
  url: string;
};

type CategoryLink = {
  name: string;
  url: string;
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function timestamp() {
  return new Date().toISOString().replace("T", " ").slice(0, 19);
}

function log(message: string) {
  console.info(`[${timestamp()}] ${message}`);
}

async function getSubcategoryLinks(
  page: Page,
  categoryUrl: string,
  categoryName: string,
): Promise<CategoryLink[]> {
  try {
    await page.goto(`${BASE_URL}${categoryUrl}`, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_LOAD_TIMEOUT_MS,
    });
    await sleep(DELAY_BETWEEN_PAGES_MS);

    // Wait for listing area to appear
    await page
      .waitForSelector('[id^="navhdr["], .ra-header-label, a[href*="catalog/ford"]', {
        timeout: 10000,
      })
      .catch(() => {});

    // Some broad categories populate their subcategory tree a few beats later.
    // Wait for category-specific child anchors before falling back to direct parts.
    await page
      .waitForFunction(
        (currentCategoryUrl) => {
          const anchors = Array.from(document.querySelectorAll("a"));
          return anchors.some((anchor) => {
            const href = anchor.getAttribute("href") ?? "";
            return href.startsWith(`${currentCategoryUrl},`);
          });
        },
        categoryUrl,
        { timeout: 10000 },
      )
      .catch(() => {});

    // One more short settling delay improves hit rate on pages with large nav trees.
    await sleep(1500);

    // RockAuto sometimes renders subcategory parttypes only in hidden jsn[]
    // inputs instead of obvious deeper anchors. Parse both sources.
    const links = await page.evaluate(
      ({ categoryUrl }) => {
        const anchors = Array.from(document.querySelectorAll("a"));
        const subcats: { name: string; url: string }[] = [];
        const seen = new Set<string>();

        for (const a of anchors) {
          const href = a.getAttribute("href") ?? "";
          // Subcategory links must START with the current category URL + comma
          // and are exactly 2 segments deeper (name + numeric ID, e.g. ",belt,8900")
          if (
            href.startsWith(categoryUrl + ",") &&
            !seen.has(href)
          ) {
            const text = a.textContent?.trim() ?? "";
            if (text && text.length < 100) {
              seen.add(href);
              subcats.push({ name: text, url: href });
            }
          }
        }

        const navNodes = Array.from(
          document.querySelectorAll<HTMLInputElement>('input[id^="jsn["]'),
        )
          .map((input) => {
            try {
              return JSON.parse(input.value) as {
                groupindex: string;
                nodetype?: string;
                groupname?: string;
                parttype?: string;
              };
            } catch {
              return null;
            }
          })
          .filter((node): node is {
            groupindex: string;
            nodetype?: string;
            groupname?: string;
            parttype?: string;
          } => Boolean(node));

        for (const node of navNodes) {
          if (
            node.nodetype !== "subgroupname" &&
            node.nodetype !== "parttype"
          ) {
            continue;
          }

          const anchor = document.getElementById(
            `navhref[${node.groupindex}]`,
          ) as HTMLAnchorElement | null;
          const href = anchor?.getAttribute("href") ?? "";
          const text = anchor?.textContent?.trim() ?? "";

          if (!href || !text || seen.has(href)) {
            continue;
          }

          if (
            href.startsWith(categoryUrl + ",") ||
            href === categoryUrl
          ) {
            seen.add(href);
            subcats.push({ name: text, url: href });
          }
        }

        return subcats;
      },
      { categoryUrl },
    );

    return links.filter((link, index, array) => {
      return array.findIndex((candidate) => candidate.url === link.url) === index;
    });
  } catch (error) {
    log(`  WARN: failed to load subcategories for ${categoryName}: ${error}`);
    return [];
  }
}

async function scrapePartsFromPage(
  page: Page,
  url: string,
  category: string,
  subcategory: string,
): Promise<ScrapedPart[]> {
  try {
    await page.goto(`${BASE_URL}${url}`, {
      waitUntil: "domcontentloaded",
      timeout: PAGE_LOAD_TIMEOUT_MS,
    });
    await sleep(DELAY_BETWEEN_PAGES_MS);

    // Wait for part listings to load
    await page
      .waitForSelector(".listing-inner, .ra-listing-part-number, [id^='listingcontainer']", {
        timeout: 15000,
      })
      .catch(() => {});

    // Additional wait for dynamic price loading
    await sleep(1500);

    const parts = await page.evaluate(
      ({ cat, subcat, pageUrl }) => {
        const results: {
          category: string;
          subcategory: string;
          brand: string;
          partNumber: string;
          description: string;
          price: string;
          url: string;
        }[] = [];

        // RockAuto uses various listing structures. Try multiple selectors.
        // Each part listing typically has: brand header, part number, description, price

        // Strategy 1: look for listing-inner divs
        const listings = document.querySelectorAll(
          '.listing-inner, [id^="listingcontainer"], tr[id^="listingrow"]',
        );

        if (listings.length > 0) {
          let currentBrand = "";

          for (const listing of Array.from(listings)) {
            // Check if this is a brand header
            const brandEl = listing.querySelector(
              '.listing-text-row-mfr-name, .ra-header-label, [id*="mfrlabel"]',
            );
            if (brandEl?.textContent?.trim()) {
              currentBrand = brandEl.textContent.trim();
            }

            // Find part number
            const partNumEl = listing.querySelector(
              '.listing-text-row-part-number, .ra-listing-part-number, [class*="partnumber"], a[id*="vew_part"]',
            );
            const partNumber = partNumEl?.textContent?.trim() ?? "";

            if (!partNumber) continue;

            // Find description
            const descEl = listing.querySelector(
              '.listing-text-row-description, .ra-listing-description, [class*="description"]',
            );
            const description = descEl?.textContent?.trim() ?? "";

            // Find price
            const priceEl = listing.querySelector(
              '.listing-text-row-price, .ra-listing-price, [class*="price"], span[id*="dprice"]',
            );
            const price = priceEl?.textContent?.trim() ?? "";

            // Brand might be in the listing itself
            const inlineBrand = listing.querySelector(
              '.listing-text-row-mfr, [class*="manufacturer"]',
            );
            const brand =
              inlineBrand?.textContent?.trim() || currentBrand || "";

            if (partNumber) {
              results.push({
                category: cat,
                subcategory: subcat,
                brand,
                partNumber,
                description,
                price,
                url: pageUrl,
              });
            }
          }
        }

        // Strategy 2: broader text scrape if strategy 1 found nothing
        if (results.length === 0) {
          // Look for any elements containing part-number-like text
          const allText = document.querySelectorAll(
            "td, div, span",
          );
          let currentBrand = "";

          for (const el of Array.from(allText)) {
            const text = el.textContent?.trim() ?? "";
            const classes = el.className?.toString() ?? "";
            const id = el.id ?? "";

            // Detect brand headers (usually bold, uppercase, in header rows)
            if (
              (classes.includes("mfr") ||
                id.includes("mfr") ||
                classes.includes("brand")) &&
              text.length < 50
            ) {
              currentBrand = text;
              continue;
            }

            // Detect part numbers (alphanumeric, typically 4-20 chars)
            if (
              (classes.includes("part") || id.includes("part")) &&
              /^[A-Z0-9][-A-Z0-9]{3,20}$/i.test(text)
            ) {
              results.push({
                category: cat,
                subcategory: subcat,
                brand: currentBrand,
                partNumber: text,
                description: "",
                price: "",
                url: pageUrl,
              });
            }
          }
        }

        return results;
      },
      { cat: category, subcat: subcategory, pageUrl: url },
    );

    return parts;
  } catch (error) {
    log(`  WARN: failed to scrape ${category} > ${subcategory}: ${error}`);
    return [];
  }
}

async function getCategoryLinks(page: Page): Promise<CategoryLink[]> {
  await page.goto(`${BASE_URL}${VEHICLE_PATH}`, {
    waitUntil: "domcontentloaded",
    timeout: PAGE_LOAD_TIMEOUT_MS,
  });
  await sleep(DELAY_BETWEEN_PAGES_MS);

  await page
    .waitForSelector('a[href*="catalog/ford"]', { timeout: 10000 })
    .catch(() => {});

  const links = await page.evaluate((vehiclePath) => {
    const anchors = Array.from(document.querySelectorAll("a"));
    const cats: { name: string; url: string }[] = [];
    const seen = new Set<string>();

    for (const a of anchors) {
      const href = a.getAttribute("href") ?? "";
      const text = a.textContent?.trim() ?? "";

      // Top-level categories: one segment deeper than vehicle path
      if (
        href.startsWith(vehiclePath) &&
        href !== vehiclePath &&
        href.split(",").length === vehiclePath.split(",").length + 1 &&
        text &&
        text.length < 80 &&
        !seen.has(href)
      ) {
        seen.add(href);
        cats.push({ name: text, url: href });
      }
    }

    return cats;
  }, VEHICLE_PATH);

  return links;
}

async function main() {
  log("Starting RockAuto scraper for 2010 Ford F-150 5.4L V8");
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  });

  const page = await context.newPage();
  const allParts: ScrapedPart[] = [];
  const seenPartKeys = new Set<string>();
  const stats = {
    categories: 0,
    subcategories: 0,
    parts: 0,
    errors: 0,
  };

  try {
    if (RESUME_EXISTING && existsSync(OUTPUT_FILE)) {
      const existing = JSON.parse(readFileSync(OUTPUT_FILE, "utf8")) as {
        parts?: ScrapedPart[];
      };

      existing.parts?.forEach((part) => {
        const key = [
          part.category,
          part.subcategory,
          part.brand,
          part.partNumber,
          part.url,
        ].join("::");
        seenPartKeys.add(key);
        allParts.push(part);
      });

      if (allParts.length > 0) {
        log(`Loaded ${allParts.length} existing parts from checkpoint`);
      }
    }

    // Step 1: Get all top-level categories
    log("Fetching category list...");
    let categories = await getCategoryLinks(page);

    if (CATEGORY_FILTER.length > 0) {
      categories = categories.filter((category) =>
        CATEGORY_FILTER.includes(category.name),
      );
    }

    if (SKIP_EXISTING_CATEGORIES && allParts.length > 0) {
      const categoryCounts = new Map<string, number>();
      allParts.forEach((part) => {
        categoryCounts.set(
          part.category,
          (categoryCounts.get(part.category) ?? 0) + 1,
        );
      });

      categories = categories.filter((category) => {
        const existingCount = categoryCounts.get(category.name) ?? 0;
        return existingCount < SKIP_CATEGORY_MIN_PARTS;
      });
    }

    log(`Found ${categories.length} categories`);
    stats.categories = categories.length;

    // Step 2: Walk each category
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i]!;
      log(
        `[${i + 1}/${categories.length}] ${category.name}`,
      );

      // Get subcategories for this category
      const subcategories = await getSubcategoryLinks(
        page,
        category.url,
        category.name,
      );
      log(`  ${subcategories.length} subcategories`);

      if (subcategories.length === 0) {
        // Maybe this category directly lists parts
        const parts = await scrapePartsFromPage(
          page,
          category.url,
          category.name,
          category.name,
        );
        if (parts.length > 0) {
          log(`  ${parts.length} parts (direct)`);
          parts.forEach((part) => {
            const key = [
              part.category,
              part.subcategory,
              part.brand,
              part.partNumber,
              part.url,
            ].join("::");

            if (seenPartKeys.has(key)) {
              return;
            }

            seenPartKeys.add(key);
            allParts.push(part);
          });
          stats.parts = allParts.length;
        }
      }

      for (let j = 0; j < subcategories.length; j++) {
        const subcategory = subcategories[j]!;
        stats.subcategories += 1;

        const parts = await scrapePartsFromPage(
          page,
          subcategory.url,
          category.name,
          subcategory.name,
        );

        if (parts.length > 0) {
          log(
            `  [${j + 1}/${subcategories.length}] ${subcategory.name}: ${parts.length} parts`,
          );
          parts.forEach((part) => {
            const key = [
              part.category,
              part.subcategory,
              part.brand,
              part.partNumber,
              part.url,
            ].join("::");

            if (seenPartKeys.has(key)) {
              return;
            }

            seenPartKeys.add(key);
            allParts.push(part);
          });
          stats.parts = allParts.length;
        } else {
          log(
            `  [${j + 1}/${subcategories.length}] ${subcategory.name}: 0 parts (may need deeper nav)`,
          );
        }

        await sleep(DELAY_BETWEEN_PAGES_MS);
      }

      await sleep(DELAY_BETWEEN_CATEGORIES_MS);

      // Write intermediate results every 5 categories
      if ((i + 1) % 5 === 0 || i === categories.length - 1) {
        const intermediate = {
          vehicle: "2010 Ford F-150 5.4L V8",
          scrapedAt: new Date().toISOString(),
          stats: { ...stats, parts: allParts.length },
          parts: allParts,
        };
        writeFileSync(OUTPUT_FILE, JSON.stringify(intermediate, null, 2));
        log(`  Checkpoint saved: ${allParts.length} parts so far`);
      }
    }
  } catch (error) {
    log(`FATAL: ${error}`);
    stats.errors += 1;
  } finally {
    await browser.close();
  }

  // Write final output
  const catalog = {
    vehicle: "2010 Ford F-150 5.4L V8",
    rockautoVehicleUrl: `${BASE_URL}${VEHICLE_PATH}`,
    scrapedAt: new Date().toISOString(),
    stats,
    parts: allParts,
  };

  writeFileSync(OUTPUT_FILE, JSON.stringify(catalog, null, 2));
  log(`Done. ${allParts.length} parts saved to ${OUTPUT_FILE}`);
  log(
    `Stats: ${stats.categories} categories, ${stats.subcategories} subcategories, ${allParts.length} parts`,
  );
}

main().catch((error) => {
  console.error("Scraper failed:", error);
  process.exit(1);
});
