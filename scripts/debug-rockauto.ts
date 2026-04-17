import { chromium } from "playwright";

const BASE_URL = "https://www.rockauto.com";
const VEHICLE_PATH = "/en/catalog/ford,2010,f-150,5.4l+v8,1444700";
const CATEGORY_PATH = process.env.RA_DEBUG_CATEGORY ?? `${VEHICLE_PATH},engine`;

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  console.log(`Loading: ${BASE_URL}${CATEGORY_PATH}`);
  await page.goto(`${BASE_URL}${CATEGORY_PATH}`, {
    waitUntil: "domcontentloaded",
    timeout: 30000,
  });
  await new Promise((r) => setTimeout(r, 4000));

  const details = await page.evaluate(({ categoryPath }) => {
    const anchors = Array.from(document.querySelectorAll("a")).map((a) => ({
      href: a.getAttribute("href") ?? "",
      text: a.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "",
      id: a.id ?? "",
      onclick: a.getAttribute("onclick")?.slice(0, 180) ?? "",
    }));

    const jsnNodes = Array.from(
      document.querySelectorAll<HTMLInputElement>('input[id^="jsn["]'),
    )
      .map((input) => {
        try {
          return {
            id: input.id,
            value: JSON.parse(input.value) as Record<string, unknown>,
          };
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .slice(0, 400) as Array<{ id: string; value: Record<string, unknown> }>;

    const matchingAnchors = anchors
      .filter((anchor) => anchor.href.includes("1444700"))
      .slice(0, 120);

    const matchingNodes = jsnNodes.filter((node) => {
      const nodetype = typeof node.value.nodetype === "string" ? node.value.nodetype : "";
      const groupname = typeof node.value.groupname === "string" ? node.value.groupname : "";
      const parttype = typeof node.value.parttype === "string" ? node.value.parttype : "";

      return (
        nodetype === "subgroupname" ||
        nodetype === "parttype" ||
        groupname.toLowerCase() === categoryPath.split(",").at(-1)?.replace(/\+/g, " ").toLowerCase() ||
        parttype.length > 0
      );
    });

    const expandedRows = Array.from(document.querySelectorAll('[id^="nav_o["], [id^="navchildren["]'))
      .slice(0, 80)
      .map((element) => ({
        id: element.id,
        className: element.className?.toString() ?? "",
        text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "",
      }));

    return {
      title: document.title,
      matchingAnchors,
      matchingNodes,
      expandedRows,
    };
  }, { categoryPath: CATEGORY_PATH });

  console.log("\nAnchors containing vehicle ID:");
  console.log(JSON.stringify(details.matchingAnchors, null, 2));

  console.log("\nHidden jsn nodes matching subgroup/parttype:");
  console.log(JSON.stringify(details.matchingNodes, null, 2));

  console.log("\nNavigation row sample:");
  console.log(JSON.stringify(details.expandedRows, null, 2));

  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
