/**
 * PCM audio player for Gemini Live voice responses.
 * Decodes base64 PCM 16-bit audio chunks and plays them through the Web Audio API.
 */

export class PcmAudioPlayer {
  private audioContext: AudioContext | null = null;
  private nextStartTime = 0;
  private started = false;

  start() {
    if (this.started) return;
    this.audioContext = new AudioContext();
    this.nextStartTime = 0;
    this.started = true;
  }

  enqueue(base64PcmData: string, sampleRate: number) {
    if (!this.audioContext || !this.started) return;

    const ctx = this.audioContext;

    // Decode base64 to raw bytes
    const binaryString = atob(base64PcmData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Convert 16-bit PCM to float32
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }

    // Create audio buffer
    const audioBuffer = ctx.createBuffer(1, float32.length, sampleRate);
    audioBuffer.copyToChannel(float32, 0);

    // Schedule playback
    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);

    const now = ctx.currentTime;
    const startAt = Math.max(now, this.nextStartTime);
    source.start(startAt);
    this.nextStartTime = startAt + audioBuffer.duration;
  }

  stop() {
    if (this.audioContext) {
      this.audioContext.close().catch(() => {});
      this.audioContext = null;
    }
    this.nextStartTime = 0;
    this.started = false;
  }

  /** Resume audio context after user gesture (required by browsers) */
  async resume() {
    if (this.audioContext?.state === "suspended") {
      await this.audioContext.resume();
    }
  }
}
