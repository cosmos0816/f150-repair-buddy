const TARGET_SAMPLE_RATE = 16000;
const PROCESSOR_BUFFER_SIZE = 4096;

type MicrophonePcmStreamParams = {
  onChunk(base64PcmChunk: string): void;
};

export interface MicrophonePcmStream {
  stop(): Promise<void>;
}

function downsampleToInt16Pcm(
  input: Float32Array,
  inputSampleRate: number,
  targetSampleRate: number,
) {
  if (inputSampleRate === targetSampleRate) {
    const direct = new Int16Array(input.length);

    for (let index = 0; index < input.length; index += 1) {
      const sample = Math.max(-1, Math.min(1, input[index] ?? 0));
      direct[index] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }

    return direct;
  }

  const ratio = inputSampleRate / targetSampleRate;
  const outputLength = Math.max(1, Math.round(input.length / ratio));
  const output = new Int16Array(outputLength);
  let outputIndex = 0;
  let inputIndex = 0;

  while (outputIndex < outputLength) {
    const nextInputIndex = Math.min(
      input.length,
      Math.round((outputIndex + 1) * ratio),
    );
    let accumulator = 0;
    let count = 0;

    while (inputIndex < nextInputIndex) {
      accumulator += input[inputIndex] ?? 0;
      inputIndex += 1;
      count += 1;
    }

    const averageSample = count > 0 ? accumulator / count : 0;
    const clamped = Math.max(-1, Math.min(1, averageSample));
    output[outputIndex] = clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff;
    outputIndex += 1;
  }

  return output;
}

function base64FromInt16Pcm(samples: Int16Array) {
  const bytes = new Uint8Array(samples.buffer);
  let binary = "";

  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index] ?? 0);
  }

  return window.btoa(binary);
}

export async function createMicrophonePcmStream(
  stream: MediaStream,
  params: MicrophonePcmStreamParams,
): Promise<MicrophonePcmStream> {
  const audioContext = new AudioContext();
  await audioContext.resume();

  const inputSource = audioContext.createMediaStreamSource(stream);
  const processor = audioContext.createScriptProcessor(
    PROCESSOR_BUFFER_SIZE,
    1,
    1,
  );
  const silentGain = audioContext.createGain();
  silentGain.gain.value = 0;

  processor.onaudioprocess = (event) => {
    const inputBuffer = event.inputBuffer.getChannelData(0);

    if (!inputBuffer || inputBuffer.length === 0) {
      return;
    }

    const pcmSamples = downsampleToInt16Pcm(
      inputBuffer,
      audioContext.sampleRate,
      TARGET_SAMPLE_RATE,
    );

    if (pcmSamples.length === 0) {
      return;
    }

    params.onChunk(base64FromInt16Pcm(pcmSamples));
  };

  inputSource.connect(processor);
  processor.connect(silentGain);
  silentGain.connect(audioContext.destination);

  return {
    async stop() {
      processor.disconnect();
      inputSource.disconnect();
      silentGain.disconnect();
      processor.onaudioprocess = null;
      await audioContext.close();
      stream.getTracks().forEach((track) => track.stop());
    },
  };
}

export function getMicrophonePcmMimeType() {
  return `audio/pcm;rate=${TARGET_SAMPLE_RATE}`;
}
