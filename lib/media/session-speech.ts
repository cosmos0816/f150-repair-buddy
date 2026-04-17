import type {
  SessionLanguage,
  SessionVoiceOutputState,
} from "@/lib/types/session";

export interface SessionSpeechController {
  readonly isSupported: boolean;
  speak(text: string): Promise<boolean>;
  stop(): void;
  updateLanguage(language: SessionLanguage): void;
}

type CreateSessionSpeechControllerOptions = {
  language: SessionLanguage;
  onStateChange?: (state: SessionVoiceOutputState) => void;
};

const MAX_SPOKEN_REPLY_LENGTH = 220;
const MAX_SPOKEN_SENTENCES = 2;

function getSpeechSynthesisInstance() {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    typeof SpeechSynthesisUtterance === "undefined"
  ) {
    return null;
  }

  return window.speechSynthesis;
}

function getLanguageTag(language: SessionLanguage) {
  return language === "ko" ? "ko-KR" : "en-US";
}

function buildSpeakableReply(text: string) {
  const normalized = text.replace(/\s+/g, " ").trim();

  if (!normalized) {
    return "";
  }

  const sentences = normalized
    .split(/(?<=[.!?。！？])\s+/u)
    .filter(Boolean)
    .slice(0, MAX_SPOKEN_SENTENCES)
    .join(" ");

  const speakable = sentences || normalized;

  if (speakable.length <= MAX_SPOKEN_REPLY_LENGTH) {
    return speakable;
  }

  return `${speakable.slice(0, MAX_SPOKEN_REPLY_LENGTH - 1).trimEnd()}…`;
}

function pickBestVoice(
  voices: SpeechSynthesisVoice[],
  language: SessionLanguage,
) {
  const preferredTags =
    language === "ko" ? ["ko-kr", "ko"] : ["en-us", "en-gb", "en"];

  const normalizedVoices = voices.map((voice) => ({
    normalizedLang: voice.lang.trim().toLowerCase(),
    voice,
  }));

  for (const preferredTag of preferredTags) {
    const exactMatch = normalizedVoices.find(({ normalizedLang }) => {
      return normalizedLang === preferredTag;
    });

    if (exactMatch) {
      return exactMatch.voice;
    }
  }

  for (const preferredTag of preferredTags) {
    const prefixMatch = normalizedVoices.find(({ normalizedLang }) => {
      return normalizedLang.startsWith(preferredTag);
    });

    if (prefixMatch) {
      return prefixMatch.voice;
    }
  }

  return undefined;
}

async function loadSpeechVoices(synthesis: SpeechSynthesis) {
  const initialVoices = synthesis.getVoices();

  if (initialVoices.length > 0) {
    return initialVoices;
  }

  return new Promise<SpeechSynthesisVoice[]>((resolve) => {
    let settled = false;

    const finish = () => {
      if (settled) {
        return;
      }

      settled = true;
      synthesis.removeEventListener("voiceschanged", finish);
      window.clearTimeout(timeoutId);
      resolve(synthesis.getVoices());
    };

    synthesis.addEventListener("voiceschanged", finish);
    const timeoutId = window.setTimeout(finish, 350);
  });
}

export function createSessionSpeechController(
  options: CreateSessionSpeechControllerOptions,
): SessionSpeechController {
  const synthesis = getSpeechSynthesisInstance();
  let currentLanguage = options.language;
  let activeRequestId = 0;

  if (!synthesis) {
    options.onStateChange?.("unsupported");

    return {
      isSupported: false,
      async speak() {
        return false;
      },
      stop() {},
      updateLanguage(language: SessionLanguage) {
        currentLanguage = language;
      },
    };
  }

  options.onStateChange?.("idle");

  return {
    isSupported: true,
    async speak(text: string) {
      const spokenReply = buildSpeakableReply(text);

      if (!spokenReply) {
        return false;
      }

      const requestId = activeRequestId + 1;
      activeRequestId = requestId;
      synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(spokenReply);
      utterance.lang = getLanguageTag(currentLanguage);
      utterance.rate = currentLanguage === "ko" ? 0.98 : 1;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = await loadSpeechVoices(synthesis);
      const bestVoice = pickBestVoice(voices, currentLanguage);

      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.onstart = () => {
        if (requestId === activeRequestId) {
          options.onStateChange?.("speaking");
        }
      };

      const settle = () => {
        if (requestId === activeRequestId) {
          options.onStateChange?.("idle");
        }
      };

      utterance.onend = settle;
      utterance.onerror = settle;

      synthesis.speak(utterance);

      return true;
    },
    stop() {
      activeRequestId += 1;
      synthesis.cancel();
      options.onStateChange?.("idle");
    },
    updateLanguage(language: SessionLanguage) {
      currentLanguage = language;
    },
  };
}
