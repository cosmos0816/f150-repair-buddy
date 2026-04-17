export type MediaDeviceKind = "camera" | "microphone";

export type MediaAccessState =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unsupported"
  | "error";

type MediaAccessFailure = {
  state: "denied" | "unsupported" | "error";
  message: string;
};

export type MediaBrowserHints = {
  isIPhoneSafari: boolean;
  isSafari: boolean;
};

type TorchMediaTrackCapabilities = MediaTrackCapabilities & {
  torch?: boolean;
};

type TorchMediaTrackSettings = MediaTrackSettings & {
  torch?: boolean;
};

type TorchConstraintSet = MediaTrackConstraintSet & {
  torch?: boolean;
};

type TorchCapableMediaStreamTrack = MediaStreamTrack & {
  getCapabilities?: () => TorchMediaTrackCapabilities;
  getSettings?: () => TorchMediaTrackSettings;
};

export type CameraTorchState = {
  isEnabled: boolean;
  isSupported: boolean;
};

export function getTorchUnavailableMessage() {
  return "Torch unavailable";
}

function getMediaUserAgent() {
  if (typeof navigator === "undefined") {
    return "";
  }

  return navigator.userAgent;
}

export function buildGenericVideoOnlyCameraConstraints(): MediaStreamConstraints {
  return {
    video: true,
    audio: false,
  };
}

export function getCameraTorchState(
  track?: MediaStreamTrack | null,
): CameraTorchState {
  if (!track) {
    return {
      isEnabled: false,
      isSupported: false,
    };
  }

  const torchTrack = track as TorchCapableMediaStreamTrack;
  const capabilities =
    typeof torchTrack.getCapabilities === "function"
      ? (torchTrack.getCapabilities() as TorchMediaTrackCapabilities)
      : undefined;
  const settings =
    typeof torchTrack.getSettings === "function"
      ? (torchTrack.getSettings() as TorchMediaTrackSettings)
      : undefined;

  return {
    isEnabled: Boolean(settings?.torch),
    isSupported: Boolean(capabilities?.torch),
  };
}

export async function setCameraTorchEnabled(
  track: MediaStreamTrack,
  enabled: boolean,
) {
  const constraints: MediaTrackConstraints & {
    advanced: TorchConstraintSet[];
  } = {
    advanced: [{ torch: enabled }],
  };

  await track.applyConstraints(constraints);
}

export function getMediaBrowserHints(): MediaBrowserHints {
  const userAgent = getMediaUserAgent();
  const isIPhone = /iPhone/i.test(userAgent);
  const isSafari =
    /Safari/i.test(userAgent) &&
    !/(CriOS|Chrome|FxiOS|Firefox|EdgiOS|OPiOS|DuckDuckGo|YaBrowser)/i.test(
      userAgent,
    );

  return {
    isIPhoneSafari: isIPhone && isSafari,
    isSafari,
  };
}

export function isMediaAccessSupported() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  return window.isSecureContext && !!navigator.mediaDevices?.getUserMedia;
}

export function getUnsupportedMediaMessage(kind: MediaDeviceKind) {
  const { isIPhoneSafari } = getMediaBrowserHints();

  if (typeof window !== "undefined" && !window.isSecureContext) {
    if (isIPhoneSafari) {
      return kind === "camera" ? "Use HTTPS or Safari" : "Use HTTPS";
    }

    return kind === "camera" ? "Use HTTPS" : "Use HTTPS";
  }

  if (isIPhoneSafari) {
    return kind === "camera" ? "Open in Safari" : "Mic unavailable";
  }

  return kind === "camera" ? "Preview unavailable" : "Mic unavailable";
}

export function buildPreferredCameraConstraints(): MediaStreamConstraints {
  const supportedConstraints = navigator.mediaDevices.getSupportedConstraints();
  const videoConstraints: MediaTrackConstraints = {
    width: { ideal: 1280 },
    height: { ideal: 720 },
  };

  if (supportedConstraints.facingMode) {
    videoConstraints.facingMode = { ideal: "environment" };
  }

  return {
    video: videoConstraints,
    audio: false,
  };
}

export function getInitialMediaDetail(kind: MediaDeviceKind) {
  const { isIPhoneSafari } = getMediaBrowserHints();

  if (kind === "camera") {
    return "Tap to enable camera";
  }

  return isIPhoneSafari ? "Mic optional" : "Mic optional";
}

export function getRequestingMediaDetail(kind: MediaDeviceKind) {
  if (kind === "camera") {
    return "Opening camera";
  }

  return "Checking mic";
}

export function getGrantedMicrophoneDetail() {
  return "Mic ready";
}

export function describeCameraPreview(
  track?: MediaStreamTrack,
  options?: { usedBasicVideoFallback?: boolean },
) {
  const label = track?.label.toLowerCase() ?? "";

  if (/(back|rear|environment)/.test(label)) {
    return "Rear camera live";
  }

  if (options?.usedBasicVideoFallback) {
    return "Camera live";
  }

  return "Camera live";
}

export function resolveMediaAccessFailure(
  kind: MediaDeviceKind,
  error: unknown,
  options?: { cameraPreviewActive?: boolean },
): MediaAccessFailure {
  const name = error instanceof DOMException ? error.name : "";
  const { isIPhoneSafari } = getMediaBrowserHints();
  const cameraPreviewCopy =
    kind === "microphone" && options?.cameraPreviewActive
      ? " Camera preview can keep running."
      : "";

  if (name === "NotAllowedError" || name === "PermissionDeniedError") {
    if (isIPhoneSafari) {
      return {
        state: "denied",
        message:
          kind === "camera" ? "Camera blocked" : `Mic blocked${cameraPreviewCopy}`,
      };
    }

    return {
      state: "denied",
      message:
        kind === "camera" ? "Camera blocked" : `Mic blocked${cameraPreviewCopy}`,
    };
  }

  if (name === "SecurityError") {
    return {
      state: "unsupported",
      message: getUnsupportedMediaMessage(kind),
    };
  }

  if (
    name === "NotFoundError" ||
    name === "DevicesNotFoundError" ||
    name === "OverconstrainedError" ||
    name === "ConstraintNotSatisfiedError"
  ) {
    if (isIPhoneSafari && kind === "camera") {
      return {
        state: "error",
        message: "Preview unavailable",
      };
    }

    return {
      state: "error",
      message:
        kind === "camera" ? "Preview unavailable" : `Mic unavailable${cameraPreviewCopy}`,
    };
  }

  if (
    name === "NotReadableError" ||
    name === "TrackStartError" ||
    name === "AbortError"
  ) {
    if (isIPhoneSafari) {
      return {
        state: "error",
        message:
          kind === "camera" ? "Camera busy" : `Mic busy${cameraPreviewCopy}`,
      };
    }

    return {
      state: "error",
      message:
        kind === "camera" ? "Camera busy" : `Mic busy${cameraPreviewCopy}`,
    };
  }

  return {
    state: "error",
    message:
      kind === "camera" ? "Try again" : `Try mic${cameraPreviewCopy}`,
  };
}
