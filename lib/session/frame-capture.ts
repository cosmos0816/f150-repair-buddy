type CapturedFrame = {
  height: number;
  mimeType: "image/jpeg";
  url: string;
  width: number;
};

const MAX_CAPTURE_EDGE = 960;

export function captureFrameFromVideo(video: HTMLVideoElement): CapturedFrame | null {
  const sourceWidth = video.videoWidth;
  const sourceHeight = video.videoHeight;

  if (!sourceWidth || !sourceHeight) {
    return null;
  }

  const scale = Math.min(1, MAX_CAPTURE_EDGE / Math.max(sourceWidth, sourceHeight));
  const targetWidth = Math.max(1, Math.round(sourceWidth * scale));
  const targetHeight = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");

  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  context.drawImage(video, 0, 0, targetWidth, targetHeight);

  return {
    width: targetWidth,
    height: targetHeight,
    mimeType: "image/jpeg",
    url: canvas.toDataURL("image/jpeg", 0.82),
  };
}
