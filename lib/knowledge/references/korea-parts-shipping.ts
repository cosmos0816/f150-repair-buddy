import { F150_GENERAL_VEHICLE_ID } from "@/lib/config/app-config";
import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

export const KOREA_PARTS_SHIPPING_REFERENCES: TruckReferenceRecord[] = [
  // ── 1. KORUS FTA duty-free ───────────────────────────────────────────
  {
    id: "korea-parts-korus-fta-duty-free",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "KORUS FTA — US-origin auto parts are 0% tariff, 10% VAT only",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "KORUS FTA", "한미 FTA", "관세", "tariff", "duty free",
      "부품 관세", "자동차 부품 관세", "수입 관세",
    ],
    excerpt:
      "Under the Korea-US Free Trade Agreement (KORUS FTA), US-manufactured automotive parts enter Korea at 0% tariff. You only pay 10% VAT (부가가치세) on the declared value + shipping cost. This applies to parts with US country of origin — verify the part is actually manufactured in the US, not just sold by a US retailer. Chinese-manufactured parts sold through US retailers do NOT qualify for 0% tariff. Keep all invoices and shipping documentation for customs declaration. The FTA makes importing OEM Ford parts from the US 30-55% cheaper than buying from Korean Ford dealers.",
    sourceCitationKey: "korea-parts-korus-fta-duty-free",
  },

  // ── 2. 배대지 shipping guide ──────────────────────────────────────────
  {
    id: "korea-parts-baedaeji-shipping-guide",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "배대지 (forwarding service) comparison — Malltail, Ohmyzip, MyUS, Ship7, iPorter",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "배대지", "해외직구", "forwarding service", "package forwarding",
      "Malltail", "몰테일", "Ohmyzip", "오마이집", "MyUS",
      "Ship7", "iPorter", "아이포터", "직구 배송",
    ],
    excerpt:
      "배대지 (배송대행지) comparison for auto parts: Malltail (몰테일) — best for heavy/oversized parts, competitive rates for 10+ lb packages, Korean customer support. Ohmyzip (오마이집) — cheapest for small/light items under 5 lbs, fast processing. MyUS — best international reputation, consolidation service, but pricier for heavy items. Ship7 — good for bulk orders, warehouse storage up to 30 days free. iPorter (아이포터) — specialized in Korean market, good customs support. For auto parts specifically, Malltail or iPorter are recommended due to better handling of heavy/bulky items. Typical transit time: 7-14 days via sea, 3-5 days via air. Cost estimate: $30-80 for a typical parts order (5-15 lbs).",
    sourceCitationKey: "korea-parts-baedaeji-shipping-guide",
  },

  // ── 3. RockAuto ordering guide ───────────────────────────────────────
  {
    id: "korea-parts-rockauto-guide",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "RockAuto ordering guide — use 배대지, 5% coupon via RetailMeNot",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "RockAuto", "록오토", "RockAuto Korea", "RockAuto 직구",
      "RockAuto coupon", "RockAuto 쿠폰", "RetailMeNot",
    ],
    excerpt:
      "RockAuto is the best online source for aftermarket and OEM-equivalent F-150 parts, with prices typically 40-70% below dealer MSRP. IMPORTANT: RockAuto does NOT ship directly to Korea. You must use a 배대지 (US forwarding address). Setup: (1) Create a RockAuto account. (2) Set your shipping address to your 배대지 US warehouse address. (3) Apply a 5% discount coupon from RetailMeNot (search 'RockAuto coupon' — always available). (4) Choose the cheapest shipping option to the 배대지. Tips: Order multiple parts together to save on 배대지 shipping. Check the 'Warehouse' column — parts from the same warehouse ship together. Economy/Daily Driver lines are excellent value for maintenance parts.",
    sourceCitationKey: "korea-parts-rockauto-guide",
  },

  // ── 4. Tasca Parts for OEM ───────────────────────────────────────────
  {
    id: "korea-parts-tasca-oem-guide",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "Tasca Parts — genuine OEM Ford parts at up to 40% off MSRP, ships worldwide",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Tasca Parts", "Tasca Ford", "OEM parts online",
      "genuine Ford parts", "정품 포드 부품", "타스카",
      "Ford OEM discount",
    ],
    excerpt:
      "Tasca Parts (tascaparts.com) is an authorized Ford dealer that sells genuine OEM Ford/Motorcraft parts online at 20-40% below MSRP. Unlike RockAuto, Tasca ships internationally — they will ship directly to Korea, though using a 배대지 is often cheaper for shipping. Best for: parts where OEM is critical (cam phasers, timing chain kits, VCT solenoids, PCM modules, body panels). IMPORTANT: Ford warranty on parts does NOT apply outside the US. Tasca has a 30-day return policy. Pro tip: Use Ford's online parts catalog (parts.ford.com) to find exact part numbers, then search those on Tasca for pricing.",
    sourceCitationKey: "korea-parts-tasca-oem-guide",
  },

  // ── 5. Korean Ford dealers ───────────────────────────────────────────
  {
    id: "korea-parts-korean-ford-dealers",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "Korean Ford dealers — 혜인오토모티브, 2-5x US prices, for urgent/emergency only",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "혜인오토모티브", "Korean Ford dealer", "Ford Korea",
      "포드 코리아", "포드 딜러", "한국 포드",
      "수입차 부품", "긴급 부품",
    ],
    excerpt:
      "Korean Ford dealers (혜인오토모티브 is the primary authorized importer/dealer network) stock common maintenance parts and can order anything from Ford's global parts catalog. However, prices are typically 2-5x US retail prices. Example: a Motorcraft oil filter that costs $8 in the US may be ₩25,000-35,000 ($19-27) at a Korean dealer. A timing chain kit listed at $400 in the US can be ₩1,500,000+ ($1,150+) through the Korean dealer. Use Korean dealers ONLY for: (1) Emergency/urgent parts needed same-day. (2) Warranty-covered repairs. (3) Parts requiring dealer programming (PCMs, keys). (4) Genuine body panels where fit is critical and you can't wait.",
    sourceCitationKey: "korea-parts-korean-ford-dealers",
  },

  // ── 6. Korean aftermarket sources ────────────────────────────────────
  {
    id: "korea-parts-korean-aftermarket-sources",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "Korean aftermarket sources — Parts114, 필통수입차부품, GPARTS, UFAP",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "Parts114", "필통수입차부품", "GPARTS", "UFAP",
      "수입차 부품", "한국 부품", "중고 부품", "재생 부품",
      "국내 부품", "aftermarket Korea",
    ],
    excerpt:
      "Korean domestic sources for F-150 parts: Parts114 (parts114.co.kr) — largest Korean aftermarket auto parts marketplace, good for filters, brake pads, and common wear items. 필통수입차부품 — specializes in imported vehicle parts, has some F-150 inventory. GPARTS — good for used/salvage parts from totaled imports, significantly cheaper but no warranty. UFAP (Used Foreign Auto Parts) — another used parts source, check part condition carefully. For used parts, always verify the part number matches your specific year/engine before purchasing. These sources are best for: brake components, filters, bulbs, sensors, and weatherstripping. They rarely stock engine internals or Raptor-specific suspension components.",
    sourceCitationKey: "korea-parts-korean-aftermarket-sources",
  },

  // ── 7. Cost comparison summary ───────────────────────────────────────
  {
    id: "korea-parts-cost-comparison",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "Cost comparison — 30-55% savings importing parts vs Korean dealer pricing",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "cost comparison", "price comparison", "savings",
      "가격 비교", "비용 비교", "절약",
      "import vs local", "직구 vs 국내",
    ],
    excerpt:
      "Real-world cost comparison (US import via 배대지 vs Korean Ford dealer): Oil filter (FL-500S): $8 + $5 shipping = $13 vs ₩35,000 ($27) = 52% savings. Spark plugs (set of 6, SP-578): $42 + $10 shipping = $52 vs ₩180,000 ($138) = 62% savings. Front brake pads (Motorcraft): $45 + $12 shipping = $57 vs ₩150,000 ($115) = 50% savings. Timing chain kit: $380 + $40 shipping = $420 vs ₩1,500,000 ($1,150) = 63% savings. UCA assembly: $250 + $25 shipping = $275 vs ₩650,000 ($500) = 45% savings. Average savings across common parts: 30-55% after shipping and 10% VAT. The savings increase dramatically for larger/more expensive parts.",
    sourceCitationKey: "korea-parts-cost-comparison",
  },

  // ── 8. De minimis threshold ──────────────────────────────────────────
  {
    id: "korea-parts-de-minimis-threshold",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "De minimis threshold — under $200 via express = duty-free AND VAT-free (목록통관)",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "de minimis", "목록통관", "소액면세", "관세 면제",
      "duty free threshold", "VAT free", "$200 rule",
      "면세 한도", "소액 직구",
    ],
    excerpt:
      "Korea's de minimis threshold (목록통관): imports valued under $200 (USD) shipped via international express courier (DHL, FedEx, UPS, EMS) are exempt from BOTH customs duty AND 10% VAT. This means small parts orders under $200 arrive completely tax-free. Strategy: split larger orders into multiple shipments under $200 each. Example: order spark plugs ($42) and an oil filter ($8) in one shipment = $50, no tax at all. IMPORTANT: this only applies to express courier shipments, NOT sea freight. The $200 limit includes the product price only (not shipping cost). This threshold applies per shipment, per day. 배대지 services can help split shipments to optimize for this threshold.",
    sourceCitationKey: "korea-parts-de-minimis-threshold",
  },

  // ── 9. What to buy locally vs import ─────────────────────────────────
  {
    id: "korea-parts-local-vs-import",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "What to buy locally vs import — filters/oil local, specialty parts import",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "what to import", "local vs import", "buy local",
      "뭘 직구", "국내 구매", "직구 추천",
      "수입 추천", "현지 구매",
    ],
    excerpt:
      "BUY LOCALLY in Korea: Engine oil (Mobil 1, Castrol widely available at Costco Korea, 쿠팡). Oil filters (Motorcraft FL-500S available on 쿠팡/G마켓). Air filters. Brake fluid. Wiper blades. Bulbs. Battery. These items are heavy relative to value or readily available domestically. IMPORT from US: Spark plugs (huge price difference). Suspension components (UCAs, ball joints, tie rod ends). Timing chain kits. Electrical components (sensors, modules). Brake rotors and calipers. Gasket sets. Any Raptor-specific parts. Specialty tools. RULE OF THUMB: if the savings after shipping + VAT exceeds 30%, import it. If the part is needed urgently (truck is down), buy locally regardless of price.",
    sourceCitationKey: "korea-parts-local-vs-import",
  },

  // ── 10. Group buying strategy ────────────────────────────────────────
  {
    id: "korea-parts-group-buying-strategy",
    sourceType: "repair_note",
    sourceLabel: "Korea Parts Guide",
    title: "Group buying strategy — Naver Cafe and Bobaedream communities",
    vehicleScope: F150_GENERAL_VEHICLE_ID,
    systemTags: ["engine_mechanical"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "group buy", "공동구매", "네이버 카페", "보배드림",
      "Naver Cafe", "Bobaedream", "community buy",
      "포드 동호회", "F-150 카페",
    ],
    excerpt:
      "Korean F-150 and American truck owner communities organize regular group buys (공동구매) to share 배대지 shipping costs and negotiate bulk discounts. Key communities: Naver Cafe '포드트럭동호회' and '미국차동호회' — regular group buys for oil filters, spark plugs, brake parts. Bobaedream (보배드림) 수입차 게시판 — individual sellers and group buy postings. Strategy: (1) Join the relevant Naver Cafe. (2) Watch for group buy announcements (usually quarterly for common maintenance parts). (3) Pool orders with other members to fill a 배대지 shipment box, splitting the shipping cost 3-5 ways. (4) For large orders (timing chain kits, suspension kits), coordinate with 2-3 owners to hit free shipping thresholds on RockAuto ($50+ per warehouse). Savings: an additional 15-25% off already-discounted import prices.",
    sourceCitationKey: "korea-parts-group-buying-strategy",
  },
];
