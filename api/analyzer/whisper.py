import sounddevice as sd
from scipy.io.wavfile import write
from pydub import AudioSegment
from pathlib import Path
from analyzer.aisingleton import openai

def record_audio(file_name_base: str, seconds=4, fs=44100) -> str:
    """
    Record audio for SECONDS seconds and sample it at the FS rate.
    """
    wav = f"{file_name_base}.wav"
    mp3 = f"{file_name_base}.mp3"
    try:
        print("Starting: Speak now!")
        recording = sd.rec(int(seconds * fs), samplerate=fs, channels=1)
        sd.wait()  # Wait until recording is finished
        print("Finished recording. Converting to mp3...")
        write(wav, fs, recording)  # Save as WAV file
        AudioSegment.from_wav(wav).export(mp3, format="mp3")
        print("mp3 conversion successful.")
        return mp3
    except Exception:
        Path(mp3).unlink(missing_ok=True)
        return ""
    finally:
        Path(wav).unlink(missing_ok=True)


def text_to_speech(file_name: str = 'tts') -> str:
    recording = record_audio(file_name)
    with open(recording, 'rb') as audio_file:
        print("Accessing whisper API...")
        transcript = openai.Audio.transcribe("whisper-1", audio_file)
        print("API call successful, translated text to speech.")
        return transcript['text'] # type: ignore


if __name__ == '__main__':
    print(text_to_speech())

