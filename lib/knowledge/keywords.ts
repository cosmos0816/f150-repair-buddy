/**
 * Shared signal keyword map extracted from mock-diagnosis.ts so both the mock
 * path and the Gemini grounding path use the same keyword lists.
 *
 * DiagnosisSignal mirrors BookmarkType minus "other".
 */
export type DiagnosisSignal =
  | "belt_pulley"
  | "connector"
  | "leak"
  | "light"
  | "rust"
  | "sound";

export const SIGNAL_KEYWORDS: Record<DiagnosisSignal, string[]> = {
  belt_pulley: [
    "belt",
    "pulley",
    "idler",
    "tensioner",
    "alternator",
    "wobble",
    "tracking",
    "squeal",
  ],
  connector: ["connector", "plug", "tab", "corrosion", "fitment"],
  leak: ["leak", "drip", "fluid", "coolant", "wet trail"],
  light: ["light", "bulb", "socket", "flash", "hyperflash", "turn signal"],
  rust: ["rust", "flaking", "underbody", "wheel well", "corrosion"],
  sound: ["sound", "noise", "chirp", "ticking", "tick", "rattle", "squeak"],
};
