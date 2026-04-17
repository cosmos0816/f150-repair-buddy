export type GeminiLiveSessionConfigSnapshot = {
  inputAudioTranscription: Record<string, never>;
  outputAudioTranscription: Record<string, never>;
  responseModalities: string[];
  speechConfig: {
    languageCode: string;
  };
  systemInstruction: string;
  temperature: number;
  tools: Array<{
    functionDeclarations: unknown[];
  }>;
  toolConfig?: {
    functionCallingConfig: {
      mode: string;
      allowedFunctionNames?: string[];
    };
  };
};

export type GeminiLiveBootstrapResponse =
  | {
      apiVersion: string;
      diagnostics: {
        activeProvider: "gemini";
        geminiKeyPresent: true;
        liveModeExplicitlyDisabled: boolean;
      };
      liveConfig: GeminiLiveSessionConfigSnapshot;
      provider: "gemini";
      model: string;
      token: string;
      websocketBaseUrl: string;
      websocketMethod: "BidiGenerateContentConstrained";
    }
  | {
      diagnostics: {
        activeProvider: "mock";
        geminiKeyPresent: boolean;
        liveModeExplicitlyDisabled: boolean;
      };
      provider: "mock";
      reason: "missing_api_key" | "disabled";
    };
