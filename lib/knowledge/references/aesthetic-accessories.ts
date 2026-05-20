import type { TruckReferenceRecord } from "@/lib/knowledge/references/types";

// 2009-2014 Ford F-150 aesthetic / cosmetic accessory reference catalog.
// Covers visual upgrade categories the dealer/RockAuto data does not document
// well: amber DRL/marker lighting, body protection (deflectors, splash guards),
// running boards, fender flares, grilles, wheels, and a small interior cosmetic
// section. Focused on non-Raptor trims where the prompt explicitly called it
// out (amber grille light kits), but flags Raptor-specific compatibility where
// relevant.
//
// TruckPartId coverage note — several aesthetic part categories below do not
// yet have a TruckPartId. Recommended additions to lib/knowledge/types.ts when
// the knowledge base grows aesthetic coverage:
//   - running_board, nerf_bar, side_step
//   - bug_deflector, hood_guard
//   - window_deflector, vent_visor
//   - splash_guard, mud_flap
//   - fender_flare
//   - grille, grille_insert
//   - light_bar, rock_light, drl_marker
//   - wheel, tire
//   - floor_mat, shift_knob, pillar_gauge_pod
//   - hood_scoop, cowl_hood, badge, window_tint
// Until those exist, entries below reuse the closest existing TruckPartId
// (lamp_socket, light_bulb, headlight_housing, taillight_housing, etc.) and
// note the gap in the excerpt where useful.

export const AESTHETIC_ACCESSORIES_REFERENCES: TruckReferenceRecord[] = [
  // ═══════════════════════════════════════════════════
  // LIGHTING — AMBER DRL / MARKER (NON-RAPTOR)
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-amber-grille-light-raptor-style",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Raptor-style 3-amber-LED grille light kit on NON-Raptor F-150",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical", "body"],
    issueAreaIds: ["lighting_socket_wiring"],
    // partTags would ideally include "grille" — not in TruckPartId yet (see header note).
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "amber grille lights", "raptor style amber lights", "3 amber LED kit",
      "amber DRL", "amber marker lights", "raptor grille mod",
      "앰버 그릴 등", "랩터 스타일 앰버", "황색 그릴 라이트",
    ],
    excerpt: "Adds the Raptor look to any 2009-2014 XL/STX/XLT/FX2/FX4/Lariat/King Ranch/Platinum grille. Universal 3-amber-LED grille light kits ($20-60 on Amazon, Recon, Putco, Diode Dynamics-licensed) bolt or 3M-tape into the upper grille bar. Most kits are 12V with a 2-wire pigtail. Wire to the parking light circuit (10A fuse #14 in 2010-2014 BCM) so they run with parking lamps and headlights but stay off during start — OR tap to a switched ignition source for daytime-only operation. Each LED draws ~0.5W so all three on one fused tap is safe. CRITICAL fitment note: Raptor SVT grilles have integrated amber LED housings molded into the grille bars; non-Raptor grilles do NOT, so non-Raptor installs are either surface-mount on the existing grille or require swapping to a Raptor-style replacement grille (see grille entry).",
    inspectionHint: "Confirm the upper grille bar has at least 3/8 inch of flat surface for the LED housings before ordering. The 2009-2010 grille bar profile is narrower than the 2011-2014 refresh — measure before buying.",
    safetyNote: "DOT/FMVSS 108: amber is legal on the front and sides of a vehicle, NEVER facing rearward (rear must be red). Front amber DRL/markers are legal in all 50 US states and in Korea. Do not aim grille amber lights such that they could be confused with a turn signal indication.",
    sourceCitationKey: "aesthetic-amber-grille-light-raptor-style",
  },
  {
    id: "aesthetic-recon-smoked-tow-mirror-amber",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Recon smoked tow-mirror amber LED side markers (264246BK)",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "recon mirror lights", "264246BK", "smoked tow mirror amber",
      "recon side marker", "mirror amber LED",
      "리콘 미러 라이트", "앰버 사이드 마커",
    ],
    excerpt: "Direct-replacement amber LED side marker housings that mount on the tow-mirror caps (where equipped) of 2009-2014 F-150 SuperCab/SuperCrew Lariat/King Ranch/Platinum with the trailer tow package. Recon part 264246BK ($75-110/pair) — smoked lens with 9 amber LEDs. Replaces the factory clear/amber incandescent puck. Drop-in plug-and-play, no wiring splices required if the truck has the factory pre-wired tow mirror harness. For trucks WITHOUT factory tow mirrors (XL/STX/many XLT), this kit is not a fit — you would need to retrofit the tow mirror assembly first ($300-500 for housings plus power harness work).",
    inspectionHint: "Look at the lower outboard edge of each tow mirror cap. If it has a small clear or amber lens, that's the factory marker location and this kit fits. If the mirror cap is smooth, the truck lacks the marker provision.",
    sourceCitationKey: "aesthetic-recon-smoked-tow-mirror-amber",
  },
  {
    id: "aesthetic-amber-front-bumper-marker",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "AAL Performance / Putco amber LED front bumper and fender markers",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "AAL performance", "putco amber markers", "front bumper amber",
      "fender amber", "amber LED kit", "amber side marker LED",
      "앞범퍼 앰버", "펜더 앰버",
    ],
    excerpt: "AAL Performance amber LED kit (~$40-80) and Putco amber LED bulbs (~$15-25/pair) drop into existing front fender side-marker housings on 2009-2014 F-150. Factory bulb is 194NA amber wedge; LED replacements are direct fit. For NEW marker locations (front bumper corner, fender flare, lower grille valance) use surface-mount 1-LED or 3-LED amber pods (Diode Dynamics SSC1 amber, ~$30-50/pair). Wire all front amber markers to the parking light circuit (orange/blue wire at the headlight harness) — this keeps them legal as position lamps. DOT note: amber on FRONT and SIDES only; never wire rearward-facing amber LEDs to anything other than the turn signal circuit.",
    inspectionHint: "Test new LED bulbs for hyperflash on the turn signal — if the side marker shares circuits with the turn signal (some 2009-2010 trucks do), a low-draw LED can cause the turn signal to flash fast. Use a load resistor or LED-compatible flasher if so.",
    sourceCitationKey: "aesthetic-amber-front-bumper-marker",
  },
  {
    id: "aesthetic-diode-dynamics-luxx",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Diode Dynamics LUXX amber side marker LED — best-in-class fitment",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "lamp_socket"],
    symptomTags: [],
    aliases: [
      "diode dynamics LUXX", "LUXX amber", "diode amber bulb",
      "194 LED amber",
      "다이오드 다이나믹스", "LUXX 앰버",
    ],
    excerpt: "Diode Dynamics LUXX series 194/T10 amber LED bulbs ($15-25/pair) are the highest-quality direct replacement for F-150 amber side marker bulbs. Polarity-insensitive, automotive-grade temperature rating, 5-year warranty. Brighter than factory incandescent without the harsh blue tint of cheap LEDs. Fits all 2009-2014 F-150 trims in stock side marker housings. Made in USA. For amber 'pod' style add-ons (mount on bumper, fender, mirror), the Diode Dynamics SSC1 ($30-60/pair) and SS3 cube ($90-150/pair) lines offer SAE-compliant amber projector pods.",
    sourceCitationKey: "aesthetic-diode-dynamics-luxx",
  },

  // ═══════════════════════════════════════════════════
  // LIGHTING — HEADLIGHTS / TAILLIGHTS / FOG
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-headlight-fitment-by-trim",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Headlight upgrade fitment by trim — halogen vs HID housings",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount"],
    partTags: ["headlight_housing", "light_bulb"],
    symptomTags: [],
    aliases: [
      "headlight upgrade", "spyder LED headlight", "alpharex pro series",
      "morimoto retrofit", "HID headlight", "LED projector headlight",
      "헤드라이트 업그레이드", "프로젝터 헤드라이트",
    ],
    excerpt: "Factory headlight equipment varies by trim: XL/STX/XLT/FX2/FX4/Lariat/King Ranch use halogen reflector housings with 9008/H13 dual-filament bulbs; Platinum and Limited use Bi-Xenon HID projectors with D3S bulbs and dynamic auto-leveling sensors. Aftermarket options: Spyder Auto LED projector headlights ($300-500/pair) — drop-in for halogen-equipped trims, NOT direct-fit to Platinum/Limited HID harnesses. AlphaRex Pro-Series LUXX/NOVA ($800-1,200/pair) — premium LED with sequential turn signal and DRL, requires anti-flicker harnesses on some trims. Morimoto XB LED ($900-1,300/pair) — DOT-compliant LED projector. Morimoto retrofit kits (~$400-700) let you keep the OEM housing and install a TL-R or Mini H1 bi-LED projector inside — best beam pattern quality. Korean inspection note: aftermarket headlights must be E-mark or SAE/DOT marked AND maintain proper cutoff or they will fail 자동차검사.",
    inspectionHint: "Before ordering aftermarket headlights, verify your trim's factory bulb type. Open the hood and look at the back of the headlight — H13/9008 socket = halogen-compatible aftermarket; D3S/D-series = HID Platinum/Limited (limited aftermarket).",
    safetyNote: "Plug-and-play 'HID kits' for halogen reflector housings produce uncontrolled glare and are illegal in most jurisdictions including Korea. Use only projector-housing-based upgrades, not HID-bulb-in-halogen-housing conversions.",
    sourceCitationKey: "aesthetic-headlight-fitment-by-trim",
  },
  {
    id: "aesthetic-tail-light-upgrades",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Tail light upgrades — Recon, Spyder, Anzo LED options",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring", "lamp_housing_moisture_or_mount"],
    partTags: ["taillight_housing", "light_bulb"],
    symptomTags: ["leak"],
    aliases: [
      "tail light upgrade", "LED tail lights", "smoked tail lights",
      "recon tail lights", "anzo LED bar", "spyder tail light",
      "테일라이트 업그레이드", "스모크 테일라이트",
    ],
    excerpt: "2009-2014 F-150 tail light housings are shared across the generation — no 2013-refresh delta on the rear lamps. Aftermarket options: Recon 264168 LED tails ($250-400/pair) — direct-fit with smoked or clear lens, drop-in plug-and-play. Spyder ALT-YD smoked LED ($200-350/pair) — popular budget LED upgrade. Anzo 311256 LED bar style ($180-300/pair) — distinctive 'C' light bar look; plug-and-play. Plug compatibility is universal across 2009-2014 because Ford did not change the rear lamp connector. CRITICAL: many aftermarket LED tails draw less current than incandescent; the BCM may throw a 'lamp out' warning. Most kits include in-line resistors or load equalizers — install them or use the Forscan tool to disable the lamp-out detection. For OEM-LED retrofits, the Ford 2013+ chrome LED tail housing ($280-400 each new) can be retrofitted to 2009-2012 trucks (same plug). Korean inspection note: any tail light replacement must maintain red color and minimum brightness per FMVSS 108 / KMVSS.",
    inspectionHint: "After installation, run the brake lights and turn signals for 30 seconds and feel the housing — if it gets too hot to touch comfortably, the load resistors are dissipating heat and must be mounted to metal (not plastic) to avoid melting.",
    sourceCitationKey: "aesthetic-tail-light-upgrades",
  },
  {
    id: "aesthetic-fog-light-retrofit",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Fog light retrofit for XL/STX trims that came without fogs",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical", "body"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["headlight_housing", "light_bulb", "connector"],
    symptomTags: [],
    aliases: [
      "fog light retrofit", "add fog lights", "morimoto XB fog",
      "diode dynamics SL1", "fog light kit",
      "포그라이트 추가", "안개등 레트로핏",
    ],
    excerpt: "Factory fog lights came standard on XLT (chrome package and above), FX2/FX4, Lariat, King Ranch, Platinum, Limited, and Raptor. They were OPTIONAL or absent on XL and STX work-truck trims and many fleet XLTs. Adding fogs to a non-fog truck requires: (1) Fog light housings — Ford OEM 9L3Z-15200-AA/AB (driver/passenger, ~$80-150 each, with halogen bulbs) or aftermarket from Morimoto XB LED Type F ($350-450/pair, projector LED), Diode Dynamics SL1 ($150-220/pair, LED). (2) Lower valance/bumper cover with fog cutouts — XL valances are blank in the fog locations, so either swap the valance ($150-300 used) or carefully cut openings. (3) Wiring harness — Ford fog light sub-harness or aftermarket relay-and-switch kit ($30-80). (4) Dash switch — replace the blank with the OEM fog switch (~$25). Total DIY cost: $250-700 depending on housing choice.",
    inspectionHint: "Before cutting the valance, dry-fit the housings against the back of the panel and verify the mounting tabs align with the molded bosses on the inside. If there are no bosses, this truck's valance was never molded with fog provision.",
    sourceCitationKey: "aesthetic-fog-light-retrofit",
  },
  {
    id: "aesthetic-light-bars",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Auxiliary light bars — Rigid, Baja Designs, KC Hilites mounting",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "connector"],
    symptomTags: [],
    aliases: [
      "light bar", "rigid E-series", "baja designs squadron",
      "KC gravity LED", "roof light bar", "bumper light bar",
      "라이트 바", "보조등", "탑 루프 라이트",
    ],
    excerpt: "Common auxiliary light bar mounting locations on 2009-2014 F-150: (1) Roof — 50-inch curved LED bar above the windshield, typically Rigid Industries E-Series Pro ($600-1,200), needs bracket kit ($80-150) that bolts to the A-pillar inside the door jamb (no drilling). (2) Lower grille / bumper — 20-30 inch bar mounted behind the lower grille, Rigid SR-Series or Baja Designs S8 ($250-500), uses no-drill brackets to the front frame horns. (3) Hood scoop / cowl — smaller 10-20 inch bar; less common. (4) Ditch lights — A-pillar-mounted cube lights (Baja Designs Squadron Pro $300-500/pair, KC Hilites Cyclone $200-300/pair), bolt to the cowl/hood hinge bolts. Wiring: all should run through a relay (typically 30-40A) with in-cab switch. Sources: Rigid Industries, Baja Designs (premium), KC Hilites, Diode Dynamics SS Series (good value), Auxbeam (budget). Most cost-effective entry point: 30-inch dual-row LED bar in the lower bumper, ~$80-150 generic, ~$300-500 name-brand.",
    safetyNote: "Off-road light bars must be wired to an OFF position when on public roads (Korea: 도로교통법). Cover with mesh covers or angle downward when on-road. Bars >40W on the roof can also blow fuse #57 (30A) if wired to the same circuit as factory fogs.",
    sourceCitationKey: "aesthetic-light-bars",
  },
  {
    id: "aesthetic-rock-lights-underbody",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Rock lights and underbody LED — FX4 / off-road popular mod",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical", "underbody"],
    issueAreaIds: ["lighting_socket_wiring"],
    partTags: ["light_bulb", "connector"],
    symptomTags: [],
    aliases: [
      "rock lights", "underbody lights", "diode dynamics stage series",
      "baja designs RTL", "RGB rock lights",
      "락 라이트", "언더바디 LED",
    ],
    excerpt: "Rock lights illuminate the ground around the truck for trail crawling and parking-lot show appeal. Quality kits: Diode Dynamics Stage Series RGBW Rock Lights ($300-450 for 8-pod kit, Bluetooth app control), Baja Designs RTL (Rock The Lights, $400-600 for 6-light kit, white only, daylight bright). Budget: Amazon generic RGB 8-pod kits ($60-120). Mounting locations: inside each wheel well (4 pods), rear bumper underside (2 pods), side rocker panels (2-4 pods). Always wire through a relay (10-20A) to a switched ignition source or dedicated rocker switch. Use stainless hardware and silicone the wire entry to the cab — these are exposed to spray, mud, and salt. Most popular on FX4 trims for the off-road aesthetic. Korean inspection: white underbody lighting is generally tolerated; RGB color-cycling can trigger a fail if active during inspection — turn off before 자동차검사.",
    sourceCitationKey: "aesthetic-rock-lights-underbody",
  },

  // ═══════════════════════════════════════════════════
  // BODY PROTECTION — BUG DEFLECTORS / HOOD GUARDS
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-bug-deflector-hood",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Bug deflector / hood guard — AVS, Lund, WeatherTech, EGR",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "bug deflector", "hood guard", "bug shield", "stone deflector",
      "AVS aeroskin", "AVS bugflector", "lund interceptor",
      "weathertech stone bug deflector", "EGR superguard",
      "본넷 가드", "벌레 디플렉터", "후드 가드",
    ],
    excerpt: "Bug deflectors deflect bug splatter and small stones up and over the windshield. Two mount styles: (a) FLUSH MOUNT — AVS Aeroskin ($65-110), low-profile, attaches with 3M VHB tape only, follows the contour of the hood. (b) STAND-OFF MOUNT — AVS Bugflector II ($55-90), Lund Interceptor ($45-75), WeatherTech Stone & Bug Deflector ($90-130), EGR Superguard ($55-95) — sits ~3/4 inch above the hood with brackets or tape+clip combo. CRITICAL fitment: the SVT Raptor hood and the FX4/FX2 sport hood have a raised power-dome center that requires a Raptor-specific or sport-hood-specific deflector. Standard F-150 hoods (XL/STX/XLT/Lariat/King Ranch/Platinum) share one part number. Installation tip: clean the hood with isopropyl alcohol (NOT wax-and-grease remover), warm both surfaces to >18°C / 65°F before applying 3M tape, and leave the vehicle parked for 24-48 hours before washing. WeatherTech and EGR are made of polycarbonate (impact resistant); AVS Aeroskin uses acrylic (more prone to UV haze after 5-7 years).",
    inspectionHint: "Look at the leading edge of the hood — if the deflector edge is pulling away or shows white residue at the tape line, the 3M VHB has failed (often from washing too soon after install). Remove, clean, and reapply with fresh 3M tape.",
    sourceCitationKey: "aesthetic-bug-deflector-hood",
  },
  {
    id: "aesthetic-window-deflectors",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Window deflectors / vent visors — AVS, WeatherTech, Lund by cab",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "window deflector", "vent visor", "rain guard", "side window deflector",
      "AVS ventvisor", "weathertech side window deflector",
      "lund ventvisor elite", "in channel rain guards",
      "사이드 바이저", "도어 바이저", "윈도우 디플렉터",
    ],
    excerpt: "Window deflectors (a.k.a. vent visors, rain guards) let you crack the windows in rain and reduce wind noise. Per-cab fitment: Regular Cab uses a 2-piece set; SuperCab uses a 4-piece set (2 front + 2 small rear clamshell doors); SuperCrew uses a 4-piece set (2 front + 2 full-size rear doors) — these are NOT interchangeable across cab styles. Mount styles: (a) IN-CHANNEL — slides into the top window channel, no tape needed, but window can rub on the lower lip; AVS In-Channel Ventvisor ($60-90 4-pc SuperCrew), Lund Ventvisor Elite ($50-80). (b) STICK-ON / TAPE-ON — 3M VHB to the outside of the window frame, stands off ~1/2 inch; AVS Ventvisor original ($45-75), WeatherTech Side Window Deflector ($90-130). WeatherTech is dark smoke acrylic; AVS is smoke acrylic; Lund offers ABS plastic. Korean note: in-channel style is more popular in Korea (sold widely on Coupang as 'sun visor'); shipping the tape-on style from US sites is fine — they're light. Install on a warm dry day, prep with alcohol, do not wash for 48 hours.",
    inspectionHint: "Roll the window all the way down then back up after install — if the window catches or scrapes on the lower lip of an in-channel deflector, slide the deflector slightly higher or sand the bottom edge.",
    sourceCitationKey: "aesthetic-window-deflectors",
  },

  // ═══════════════════════════════════════════════════
  // BODY PROTECTION — SPLASH GUARDS / MUD FLAPS
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-splash-guards",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Splash guards / mud flaps — OEM, Husky, WeatherTech fitment",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body", "underbody"],
    issueAreaIds: [],
    partTags: ["wheel_well_lip"],
    symptomTags: [],
    aliases: [
      "splash guards", "mud flaps", "mud guards", "fender splash guard",
      "ford OEM splash guard", "husky liners muddog",
      "weathertech mudflaps", "rugged liner",
      "흙받이", "머드 플랩", "스플래시 가드",
    ],
    excerpt: "Splash guards protect lower body panels, rocker panels, and following vehicles from road spray. Fitment splits on whether the truck has factory fender flares (FX4 with flare option, Raptor, some King Ranch/Platinum) or smooth fenders. Sources: (1) Ford OEM Splash Guard Set — 9L3Z-16A550-A front, 9L3Z-16A550-B rear, with Ford oval logo, ~$30-45 per pair retail, no drilling, uses existing fender liner clips. Different front part numbers for FX2/FX4 fender-flared trucks. (2) Husky Liners Custom MudDog ($60-100/set of 4) — molded thermoplastic, OE-style mount, includes hardware. (3) WeatherTech No-Drill MudFlaps ($75-120/pair, front or rear) — patented DigitalFit, twist-and-lock to factory holes, no drilling. (4) Rugged Liner ($45-80/set) — budget option, may require drilling on smooth-fender trucks. Install rears LAST because the rear flap shape changes if you add a rear fender flare later. Korea import: heavy and bulky — buy locally if possible; oversize fee from RockAuto can exceed the part price.",
    inspectionHint: "Mud flaps that contact the tire or rub on the wheel well liner under suspension compression will show shiny black tire scuff marks. Trim with sharp scissors or relocate the upper mount hole 5-10 mm.",
    sourceCitationKey: "aesthetic-splash-guards",
  },

  // ═══════════════════════════════════════════════════
  // CAB / EXTERIOR — RUNNING BOARDS / NERF BARS
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-running-boards-overview",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Running boards / side steps overview — by cab and use case",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "running boards", "side steps", "nerf bars", "step bars",
      "wheel to wheel", "rocker step", "cab length step",
      "사이드 스텝", "러닝 보드", "발판",
    ],
    excerpt: "Running boards / nerf bars / side steps must be ordered to cab length. SuperCrew length is the longest, SuperCab medium, Regular Cab shortest. Wheel-to-wheel bars extend past the rear cab into the bed area (popular for stepping into the bed). Categories: (1) MOTORIZED POWER STEPS — AMP Research PowerStep ($1,300-1,700 + harness $80), deploys when door opens and retracts when closed; hidden when stowed. (2) OVAL TUBE NERF BARS — classic 4-inch oval, Westin Pro Traxx ($300-500/pair), Iron Cross HD ($400-700/pair), Romik R3 ($350-550). (3) DROP-DOWN STEP BARS — Westin HDX Drop ($450-700/pair), N-FAB Wheel-2-Wheel ($600-900). (4) OE-STYLE FLAT BOARDS — Bushwacker OE Style ($350-550/pair), polypropylene molded to mimic the OEM running board look. (5) ARIES AdventEDGE ($400-700/pair) — squared-off design with rugged styling. Cab-specific part numbers — confirm SuperCrew vs SuperCab vs Regular Cab when ordering. Weight rating: most bars rated 300-500 lb static; AMP PowerStep rated 600 lb. Korean import note: oversize package fee from RockAuto can be $150-300; check Coupang and 'F-150 사이드 스텝' searches for locally stocked options first.",
    inspectionHint: "Grab the running board and pull up/down with full body weight — if it flexes more than 1/2 inch, the mounting brackets are under-engineered for the load.",
    safetyNote: "AMP PowerStep electric motors and harnesses are NOT rated for permanent submersion. If you drive through deep water/mud regularly (FX4 use case), inspect the motors and harness connections every 6 months for water intrusion and corrosion.",
    sourceCitationKey: "aesthetic-running-boards-overview",
  },
  {
    id: "aesthetic-amp-powerstep",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "AMP Research PowerStep — motorized retractable running boards",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body", "electrical"],
    issueAreaIds: [],
    partTags: ["connector"],
    symptomTags: [],
    aliases: [
      "AMP research powerstep", "motorized running boards",
      "retractable side step", "power running boards",
      "75126-01A", "76235-01A",
      "AMP 파워스텝", "전동 사이드 스텝",
    ],
    excerpt: "AMP Research PowerStep automatically deploys when any door opens and retracts when all doors close. Part numbers for 2009-2014 F-150: 75126-01A (SuperCrew, ~$1,400-1,700), 75126-01A (SuperCab, same kit different mounting), plus wiring harness 76235-01A (~$80-120). Motor drive system uses 12V DC actuator at each end, articulating linkage drops board ~6 inches below stow position. Installation: 3-4 hours DIY with hand tools — bolt-on to existing frame holes, no drilling, wire harness taps into door pin switches and ignition fuse. Common failure modes after 5-8 years: motor seizure from water/salt intrusion (replace motor ~$200 each), articulating arm bushing wear (replaceable, kit ~$40), board-stays-down due to door switch wiring corrosion (clean connectors). PowerStep XL has a wider step and 600 lb capacity vs 300 lb for regular. The PowerStep harness draws ~5A momentarily, ~0mA at rest.",
    inspectionHint: "Test deploy each door individually — if one door doesn't trigger the step, the door-pin switch input on that side has failed (usually corrosion at the connector behind the kick panel).",
    sourceCitationKey: "aesthetic-amp-powerstep",
  },

  // ═══════════════════════════════════════════════════
  // CAB / EXTERIOR — FENDER FLARES
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-fender-flares",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Fender flares — Bushwacker, EGR, AVS pocket and OE styles",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: ["wheel_well_lip"],
    symptomTags: [],
    aliases: [
      "fender flares", "wheel arch trim", "bushwacker pocket style",
      "EGR bolt on", "AVS OE style", "20929-02", "20920-02",
      "펜더 플레어", "휠 아치 트림", "오버펜더",
    ],
    excerpt: "Fender flares cover the wheel arch lip — required if you run tires that poke past the stock fender, popular for the wide-body look. Styles: (1) POCKET STYLE — Bushwacker Pocket Style ($350-500/set of 4, P/N 20929-02 for 2009-2014), simulated rivet bolt heads, ~3 inches wider per side, drill-required for some trims. (2) BOLT-ON STYLE — EGR Bolt-On Style ($400-600/set), smoother profile, ~2 inches wider, no drilling. (3) OE STYLE — Bushwacker OE Style ($250-380/set, P/N 20920-02), Lund SX-Sport ($250-400/set), AVS OE-style — matches factory FX4-flare look, ~1 inch wider, no drilling. (4) RAPTOR-STYLE WIDE — wider 4-6 inches per side, requires Raptor-specific fenders (full sheet metal swap) or fiberglass wide-body kits ($800-2,000) — not a simple bolt-on. Material: TPO thermoplastic (textured black) standard; color-matched paint adds $200-400 to the cost. Korean note: changing the registered overall width on the vehicle 등록증 may require 구조변경 inspection if flares add more than 30 mm of total width.",
    inspectionHint: "Pre-drill any flare mounting hole with a step drill, then prime the bare metal with rust converter or zinc primer before bolting through — drilled and unprotected holes are the #1 cause of fender rust within 2 years.",
    sourceCitationKey: "aesthetic-fender-flares",
  },

  // ═══════════════════════════════════════════════════
  // CAB / EXTERIOR — GRILLES
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-grille-replacements",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Grille replacements — Raptor-style, billet, mesh, bar inserts",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    // partTags would ideally include "grille" — not in TruckPartId yet (see header note).
    partTags: [],
    symptomTags: [],
    aliases: [
      "grille replacement", "raptor style grille", "billet grille",
      "T-rex grille", "putco bar grille", "rough country mesh",
      "paramount restyling", "그릴 교체", "랩터 그릴",
    ],
    excerpt: "Two generations of grille opening on 2009-2014 F-150: 2009-2010 used a narrower 3-bar chrome grille; 2011-2012 introduced the wider opening with 4 large horizontal bars (XLT/Lariat) or honeycomb (King Ranch/Platinum); 2013-2014 received a mild refresh with revised inserts. Aftermarket categories: (1) RAPTOR-STYLE REPLACEMENT GRILLES — fits 2009-2014 F-150 XLT/Lariat/King Ranch grille opening with the FORD lettering across the front; $200-500 (Paramount Restyling, Status Grill, AOSK). Note: these fit the NON-Raptor body but adopt the Raptor's aesthetic. (2) BILLET INSERTS — Putco Bar Style ($150-300), T-Rex Billet Aluminum ($300-600), insert into existing grille bars. (3) MESH INSERTS — Rough Country Mesh Grille ($150-250), Paramount Restyling mesh ($200-400). (4) FULL REPLACEMENT GRILLES — T-Rex Pro-Series ($400-900), Carriage Works ($350-600). Most aftermarket grilles are direct bolt-on using the factory grille clips and 4-6 bolts behind the radiator support; budget 30-60 minutes DIY. The 2013-2014 grille opening differs slightly from 2011-2012 — confirm year-specific part numbers before ordering.",
    inspectionHint: "Before swapping grilles, verify the YEAR-specific fitment matches your truck. 2009-2010 grilles do NOT fit 2011-2014 trucks. 2013-2014 has refined opening tabs that can damage 2011-2012 grilles if forced.",
    sourceCitationKey: "aesthetic-grille-replacements",
  },

  // ═══════════════════════════════════════════════════
  // CAB / EXTERIOR — HOOD MODS, BADGES, TINT, WRAP
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-hood-scoops-cowls",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Hood scoops and cowl hood replacements",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "hood scoop", "cowl hood", "ram air hood", "reflexxion cowl",
      "lund hood scoop", "후드 스쿱", "보닛 카울",
    ],
    excerpt: "Hood appearance mods on 2009-2014 F-150: (1) BOLT-ON HOOD SCOOP — Lund Hood Scoop (no longer in production; aftermarket Xenon and AVS offer alternatives, $80-200), 3M tape + screw mount, purely cosmetic (does NOT feed cold air to the intake). (2) REPLACEMENT COWL HOOD — Reflexxion 2-inch Cowl Induction Hood (~$700-1,100 fiberglass, $1,200-1,800 steel), full hood replacement with a raised cowl in the center; requires repainting to match. Glasstek and TruFiber also offer aftermarket cowl hoods. (3) RAPTOR-STYLE HOOD — full Raptor hood swap requires Raptor-specific fenders and trim, not a simple bolt-on. (4) RAM-AIR FUNCTIONAL HOODS — none widely available for 2009-2014 F-150; the factory intake routing is in the driver-side fender, so a cowl hood is purely visual. Painting: budget $300-600 for a body shop to color-match a fiberglass cowl hood, more for tri-coat colors (Tuxedo Black is straightforward, Ruby Red Metallic is harder to match).",
    inspectionHint: "Aftermarket fiberglass hoods often need shimming at the hinges and latch — expect 1-2 hours of fitment work before final paint. Verify hood pin alignment and that the latch fully engages when closed before driving on highway.",
    sourceCitationKey: "aesthetic-hood-scoops-cowls",
  },
  {
    id: "aesthetic-badge-delete",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Badge delete / debadging — clean F-150 tailgate and fender",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "debadging", "badge delete", "emblem removal", "tailgate badge",
      "엠블럼 제거", "배지 삭제",
    ],
    excerpt: "Debadging removes the F-150, FX4, XLT, Lariat, etc. emblems for a cleaner look. Two methods: (1) DENTAL FLOSS / FISHING LINE — work waxed dental floss or 50-lb fishing line between the badge and the body, sawing back and forth in a downward motion to slice through the 3M VHB adhesive. (2) HEAT GUN + PLASTIC PICK — warm the badge to ~60°C / 140°F with a heat gun (NOT a hair dryer — too weak), then pry up with a plastic trim tool from a corner. Both methods leave glue residue; remove with 3M Adhesive Remover, Goo Gone, or WD-40, then re-clay-bar and polish the spot. Faded/sunburned paint underneath: 5+ year old trucks will show a ghost outline of the badge because the surrounding paint has UV-faded around it; cut and polish (Meguiar's Ultimate Compound) usually blends it; severe ghost may need a single-stage detail polish or paint correction at a shop ($100-300). Korea note: registered model name on the 등록증 doesn't change; this is purely cosmetic.",
    inspectionHint: "After removing badges, look at the body color in direct sunlight. If you see a clear outline of the removed badge, do a full panel polish before the contrast becomes permanent.",
    sourceCitationKey: "aesthetic-badge-delete",
  },
  {
    id: "aesthetic-window-tint-korea",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Window tint — Korean VLT law and inspection requirements",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body", "cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "window tint", "VLT", "ceramic tint", "3M crystalline",
      "llumar", "선팅", "윈도우 틴팅", "자동차 틴트",
    ],
    excerpt: "Korean window tint law (자동차관리법 시행규칙): front windshield and front side windows must allow at least 70% VLT (visible light transmission); rear side windows and rear glass have no statutory limit but the 자동차검사 (vehicle inspection) station may take measurements. Most reputable installers in Korea apply 70%+ on the front windows and 15-35% on the rear. Ceramic tints (3M Crystalline, LLumar IRX, XPEL Prime XR Plus) provide IR-blocking heat rejection without being darker; expect ~$400-800 for a full F-150 SuperCrew SuperCab. Dyed tints fade purple within 3-5 years in Korean UV. Aftermarket installation note: factory rear privacy glass on King Ranch/Platinum/Limited is already darker than 35% — adding film on top can stack to near-zero transmission. Removing existing film for new application costs $80-150. Korean inspection: bring a polarized VLT meter receipt if you ran into a strict inspection — the limits are sometimes misapplied at older stations.",
    safetyNote: "Front windshield tinting darker than 70% VLT is illegal in Korea and a 7-point violation. Front side windows below 40% VLT have been measured at police stops in 2023-2024 — keep the receipt and VLT certificate in the glove box.",
    sourceCitationKey: "aesthetic-window-tint-korea",
  },
  {
    id: "aesthetic-hood-wrap-vinyl",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Hood wraps and vinyl — matte black, carbon, full color change",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "hood wrap", "vinyl wrap", "matte black hood", "carbon fiber wrap",
      "3M 1080", "avery dennison", "랩핑", "후드 랩",
    ],
    excerpt: "Vinyl wrap is a removable, paint-protective film applied over body panels. Most common on F-150: matte black hood wrap (gives the FX4/sport look on any trim, $150-300 DIY, $300-500 installed), carbon fiber pattern roof or hood (~$200-500), full color change ($2,500-4,500 installed). Quality films: 3M 1080 series (cast vinyl, 7-year warranty), Avery Dennison SW900 series (premium cast), KPMF (UK budget cast), Oracal 970 (entry cast). Avoid calendared vinyls (Oracal 651, generic Amazon film) on curved hood areas — they shrink and lift within 6 months. Installation: clean with 70% IPA, work in a dust-free 18-25°C / 65-77°F environment, use a squeegee with felt edge, post-heat all stretched corners to >90°C / 195°F to set the adhesive memory. Lasts 3-7 years before removal. Removal: heat the film to 70°C / 160°F and peel slowly at a 30-degree angle; do not let adhesive bake in sun for 8+ years or it becomes very difficult to remove. Carbon fiber dash kits for interior are sold by Putco and Rdash ($80-250).",
    inspectionHint: "Before wrapping, inspect the panel for stone chips and clear coat damage — wrap will not hide these; it will show every imperfection through the film.",
    sourceCitationKey: "aesthetic-hood-wrap-vinyl",
  },

  // ═══════════════════════════════════════════════════
  // WHEELS — OEM AND AFTERMARKET (COSMETIC)
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-oem-wheel-swaps",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "OEM wheel cross-trim swaps — Platinum, Lariat, FX4, Raptor",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "OEM wheel swap", "platinum wheels", "lariat chrome wheels",
      "FX4 wheels", "raptor 17 inch wheels", "raptor beadlock",
      "휠 교체", "OEM 휠", "랩터 비드락",
    ],
    excerpt: "All 2009-2014 F-150 trims share the same 6x135mm bolt pattern and 87mm center bore — OEM wheels swap freely across trims. Popular OEM cross-trim swaps: (1) PLATINUM 20-INCH POLISHED — multi-spoke polished aluminum, $300-500 each used, factory tire 275/55R20. (2) LARIAT 18-INCH CHROME-CLAD — chrome cladding on cast aluminum, $150-300 each used, factory tire 275/65R18. (3) FX4 18-INCH MACHINED — machined-face dark gray, $200-350 each used, tire 275/65R18. (4) RAPTOR 17-INCH — most popular non-Raptor upgrade because they fit larger off-road tires and look aggressive; cast aluminum standard or BEADLOCK-CAPABLE forged (2014+), $400-700 each used (cast) or $800-1,400 (beadlock forged). Raptor 17x8.5 wheels have 4.25-inch backspace and need wheel spacers (~$50 each) or longer wheel studs on non-Raptor F-150 to clear the front suspension on full lock. Stock tire load index must be matched — XL/STX use load-range C tires (P-metric), do NOT downgrade to lower load when swapping to oversize off-road tires. Torque: 150 lb-ft for all 2009-2014 lug nuts.",
    inspectionHint: "After any wheel swap, drive a few blocks then re-torque all lug nuts to 150 lb-ft — newly seated wheel-to-hub mating settles in the first 25-50 miles.",
    sourceCitationKey: "aesthetic-oem-wheel-swaps",
  },
  {
    id: "aesthetic-aftermarket-wheels-popular",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Aftermarket wheels popular on 2009-2014 F-150 — Method, KMC, Fuel",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "method race wheels", "MR301", "KMC XD series", "fuel offroad",
      "black rhino", "american force", "moto metal",
      "애프터마켓 휠", "메소드 휠", "퓨얼 휠",
    ],
    excerpt: "Aftermarket 17-22 inch wheels in the 6x135 bolt pattern that fit 2009-2014 F-150: (1) METHOD RACE WHEELS — MR301 Standard ($230-320 each, matte black or bronze), MR305 NV ($260-360), 17-20 inch off-road-focused. (2) KMC XD SERIES — XD820 Grenade ($240-340), XD827 Rockstar 3 ($260-380), 17-22 inch. (3) FUEL OFF-ROAD — Maverick D538 ($300-450), Vapor D560 ($280-400), Rebel D679 ($280-420). (4) BLACK RHINO — Armory, Calico, Razorback ($280-450). (5) AMERICAN FORCE — forged billet, $700-1,500 each (premium custom polished). (6) MOTO METAL — MO962/MO970 ($200-300, budget-friendly chrome and black options). When sizing: keep the OUTSIDE diameter close to factory (32-33 inches OD for 18/20-inch wheels) to preserve speedometer accuracy and TCS/ABS calibration. -12mm to +18mm offset range is safe; more negative offset (-25mm and beyond) requires fender flares or trimming. Korean import tip: 6x135 is a Ford-specific pattern; locally-stocked Korean wheels rarely fit. Order from US (Discount Tire Direct, Tire Rack) and accept the freight cost, or check Coupang for imported sets.",
    safetyNote: "Lug nut taper must match the wheel seat. Factory wheels use a conical (60-degree) taper; some aftermarket wheels need ball-seat or shank-style lug nuts. Mismatched lugs back out within 50-100 miles and cause wheel loss — verify before installation.",
    sourceCitationKey: "aesthetic-aftermarket-wheels-popular",
  },
  {
    id: "aesthetic-tire-sizes-stock",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Stock tire sizes by trim and aesthetic plus-size considerations",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "stock tire size", "F-150 tire size", "plus size",
      "265/70R17", "275/65R18", "275/55R20", "315/70R17",
      "타이어 사이즈", "순정 타이어",
    ],
    excerpt: "Stock tire sizes by trim for 2009-2014 F-150: XL 17-inch P265/70R17 (~31.6 inches OD), STX 17-inch or 18-inch, XLT 18-inch P275/65R18 (~32.1 inches OD), FX2/FX4 18-inch P275/65R18, Lariat 18-inch or optional 20-inch P275/55R20 (~31.9 inches OD), King Ranch 18-inch P275/65R18 (chrome-clad), Platinum 20-inch P275/55R20 polished, Limited 22-inch P285/45R22 (~32.1 inches OD), Raptor 17-inch LT315/70R17 (~34.4 inches OD on BFG All-Terrain T/A KO). Plus-sizing aesthetic guide: 18-inch to 20-inch upgrade preserves ride quality; 22-inch becomes harsh on rough roads (especially Korea's expansion joints) but looks dramatic. Largest fit without lift: ~33-inch tires on 18-inch wheels with -12 to +18mm offset, modest rubbing on full-lock turning. With 2-inch leveling kit: ~33-34 inch tires clear without trimming. For Raptor-style 35-inch tires: requires leveling kit AND fender liner trimming AND larger flares (or Raptor sheet metal). Korean inspection rule: tire diameter cannot vary more than +/- 3% from registered (등록증) value without 구조변경.",
    inspectionHint: "After tire upsizing, recalibrate the speedometer with Forscan or AccessTuner — every 1% increase in tire diameter throws off the speedometer reading by 1%. A 3% larger tire makes the speedometer read 3% slow.",
    sourceCitationKey: "aesthetic-tire-sizes-stock",
  },

  // ═══════════════════════════════════════════════════
  // INTERIOR AESTHETIC (LIGHT TOUCH)
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-pillar-gauge-pods",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "A-pillar gauge pods — boost, EGT, oil pressure monitors",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "pillar gauge pod", "a-pillar pod", "boost gauge", "EGT gauge",
      "AEM gauge", "prosport gauge", "필러 게이지",
      "부스트 게이지", "EGT 게이지",
    ],
    excerpt: "A-pillar gauge pods mount aftermarket gauges in the driver's line of sight along the windshield A-pillar. Most popular on tuned 3.5L EcoBoost F-150 for boost monitoring and EGT (exhaust gas temp) sensing. Sources: Lotek 2-gauge pod ($45-75, fits 2-1/16 inch gauges), DAYTONA Sensors triple pod ($90-130), AEM 52mm pillar pod ($60-100). Gauge brands: AEM X-Series Boost ($150-220), Prosport Premium 60mm ($90-140), Innovate MTX-AL ($200-280 includes wideband O2 sensor). Wiring: pillar trim removes with 3 push-pin clips (no fasteners on most trims), gauge harness routes down the A-pillar to the dash and into the engine bay through the factory grommet at the firewall (driver side, behind brake booster). Tap +12V switched to fuse #25 (radio/accessory) and ground to the body bolt at the steering column. NON-EcoBoost trims (5.4L Triton, 5.0L Coyote) rarely need boost gauges — most installs on these are vanity gauges (voltmeter, oil pressure, water temp) for the aesthetic.",
    inspectionHint: "After installing a pillar pod, check the side-curtain airbag clearance behind the trim — if the airbag is contacted by the gauge pod, it can deploy unevenly in a crash. Most aftermarket pods are designed around the airbag location, but verify.",
    safetyNote: "Do not block the side curtain airbag deployment path with a thick gauge pod. Check trim fitment against the OEM A-pillar trim — if the new pod is significantly thicker, the airbag may not deploy correctly.",
    sourceCitationKey: "aesthetic-pillar-gauge-pods",
  },
  {
    id: "aesthetic-shift-knobs",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Shift knobs — column shifter and floor console replacement",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "shift knob", "shifter knob", "T-handle shifter",
      "RAM short throw", "leather shift knob",
      "기어봉", "시프트 노브",
    ],
    excerpt: "2009-2014 F-150 has either COLUMN SHIFTER (XL, STX, XLT base, work-truck configs) or FLOOR CONSOLE SHIFTER (XLT chrome, FX2/FX4, Lariat, King Ranch, Platinum, Limited, Raptor). Column shifter has no aftermarket support — the chrome knob unscrews but only OEM replacements are sold ($25-50). Floor console shifter is a tower-style PRNDL with a knob at the top; replacement knobs: Mishimoto leather shift knob ($30-60), Razo classic ($25-40), Steeda billet ($45-75), Raptor SVT shift knob ($60-100 from Ford). Removal: pry up the leather shift boot cover, unscrew the OEM knob counter-clockwise (sometimes glued — apply heat gun gently and use rubber-grip pliers). Aesthetic-only — does NOT change shift feel. Notable: NO short-throw kits exist for the 6R80 automatic in F-150 — it's electronically controlled by the TCM; 'short-throw' is a manual-transmission concept. The 'RAM short throw' mentioned in some F-150 forums refers to a knob style, not function.",
    inspectionHint: "Test the boot cover after install — if it's twisted or pulled off the bezel, the knob is screwed on too far; back it off a half-turn.",
    sourceCitationKey: "aesthetic-shift-knobs",
  },
  {
    id: "aesthetic-floor-mats",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Floor mats — WeatherTech, Husky X-Act, Ford OEM all-weather",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["cabin_controls", "body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "floor mats", "all weather mats", "WeatherTech FloorLiner",
      "husky x-act contour", "ford OEM mats", "rubber floor mat",
      "플로어 매트", "고무 매트", "올웨더 매트",
    ],
    excerpt: "Floor mat options for 2009-2014 F-150 cab — sized by cab type (Regular Cab 2-piece, SuperCab and SuperCrew 4-piece): (1) WEATHERTECH FLOORLINER — laser-measured DigitalFit, deep channels with raised lip; tan/black/cocoa/grey, $80-130 front pair, $60-90 rear. WT P/N 442931 front (2009-2014 all cabs), 442932 rear (SuperCab/SuperCrew). (2) HUSKY X-ACT CONTOUR — rubberized thermoplastic, $90-140 set of 3 or 4; deep edges, second-place fitment to WeatherTech. (3) FORD OEM ALL-WEATHER — vinyl with Ford oval, $60-90 front, $40-60 rear. (4) BUDGET — generic universal rubber mats ($25-50 set), poor fit but cheap. WeatherTech is the gold standard for water/snow/salt containment. In Korea — heated radiant winter floors are not a concern (truck has carpet underneath), but the salt and slush in Seoul winters destroy carpet mats; rubberized liners are strongly recommended year-round. Husky X-Act fits closer to the body but is harder to clean than WeatherTech's smoother surface.",
    inspectionHint: "Pull the mats and check the carpet underneath every 3-6 months — trapped salt and moisture between mat and carpet causes carpet rot and floor pan corrosion from inside.",
    sourceCitationKey: "aesthetic-floor-mats",
  },

  // ═══════════════════════════════════════════════════
  // KOREA / IMPORT CONSIDERATIONS — CROSS-CUTTING
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-korea-shipping-oversize",
    sourceType: "repair_note",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Korea import — oversize package fees on aesthetic accessories",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["body"],
    issueAreaIds: [],
    partTags: [],
    symptomTags: [],
    aliases: [
      "korea shipping", "oversize package", "rockauto oversize fee",
      "fender flare shipping", "running board shipping",
      "한국 배송", "오버사이즈 배송비",
    ],
    excerpt: "Korean F-150 owners ordering aesthetic accessories from RockAuto, Summit Racing, or Amazon US need to budget heavily for oversize/freight fees. Items >48 inches in any dimension or >50 lbs typically incur $80-300 in freight surcharges on top of base shipping. Worst offenders: full-length running boards (60-80 inches long, oversize fee $150-300), bed-length tonneau covers (78+ inches, $200-400), fender flares (set of 4 in a 50-inch box, $100-200), full grilles (~$60-150 surcharge), light bars 30+ inches ($60-150). Strategies: (1) BUY LOCAL — Coupang, Auction, and 11번가 stock common items (AVS Ventvisor, Husky liners, OEM splash guards) at Korean prices that often beat US+shipping. Search '포드 F-150' or 'F150 액세서리'. (2) US FORWARDING — Shipito, MyUS consolidate multiple items to reduce per-package fees; works well for smaller items <20 lb. (3) BUNDLED ORDERS — pair small heavy items (brake rotors, etc.) with aesthetic items in one shipment to amortize freight. (4) DIRECT FROM MANUFACTURER — some brands (WeatherTech, Bushwacker) ship internationally at flat rates that beat retailer surcharges. RockAuto's wholesaler closeouts on aesthetic parts can still beat all options for parts under 20 lb.",
    inspectionHint: "Always check the carrier-rated weight + box dimensions BEFORE adding to cart on RockAuto — the oversize surcharge appears at checkout, not on the product page. A $35 mud flap set can become a $135 delivered cost.",
    sourceCitationKey: "aesthetic-korea-shipping-oversize",
  },

  // ═══════════════════════════════════════════════════
  // LIGHTING — WIRING / DOT NOTES (CROSS-CUTTING)
  // ═══════════════════════════════════════════════════
  {
    id: "aesthetic-amber-wiring-tips",
    sourceType: "inspection_hint",
    sourceLabel: "Aesthetic Accessory Reference",
    title: "Amber DRL / marker wiring tips and DOT compliance summary",
    vehicleScope: "2009-2014-ford-f150-general",
    systemTags: ["lighting", "electrical", "connectors_harness"],
    issueAreaIds: ["lighting_socket_wiring", "connector_and_harness_fitment"],
    partTags: ["light_bulb", "lamp_socket", "connector"],
    symptomTags: ["hyperflash"],
    aliases: [
      "amber wiring", "parking light tap", "add a fuse", "DOT amber legal",
      "DRL wiring", "amber LED installation",
      "앰버 배선", "주차등 탭",
    ],
    excerpt: "Wiring amber DRL/marker accessories on 2009-2014 F-150: the cleanest tap point is the parking light circuit, accessible at fuse #14 (10A, BCM in 2010-2014; verify your year's fuse box diagram). Use an 'add-a-fuse' adapter ($5-8) to maintain the original circuit while pulling 12V for the new lights. For switched/keyed-on power, fuse #25 (radio accessory, 10A) is convenient. Total amber LED load <2A is safe on either fuse. For higher-draw setups, add a relay (Bosch-style 30/40A) triggered by the parking light circuit and run the load directly from the battery through a fuse holder. DOT / FMVSS 108 summary: AMBER is legal facing forward (front markers, DRL, turn signals, fog lamps), legal facing sideways (side markers), NEVER legal facing rearward — rear-facing lamps must be red. CLEAR/WHITE is restricted to headlamps, fog lamps (some states), reverse lamps, and license plate; off-road auxiliary LEDs must be covered when on public roads. Korea (자동차관리법): amber is legal in the same positions; off-road bars must be wired to a separate switch and off during 자동차검사.",
    inspectionHint: "After installation, cycle the parking lights, headlights, turn signals, and ignition through all positions while watching the new LEDs. If they flicker, dim erratically, or stay on when expected to be off, you have a circuit interaction problem — usually a missing diode or shared ground issue.",
    safetyNote: "Amber LEDs aimed rearward (e.g., mounted on the tailgate or under the rear bumper facing back) violate FMVSS 108 in the US and are an inspection fail in Korea. Always orient amber pods to face FRONT or SIDE only.",
    sourceCitationKey: "aesthetic-amber-wiring-tips",
  },
];
