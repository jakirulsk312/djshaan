import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Track {
  title: string;
  url: string;
  coverUrl: string;
}

interface MusicPlayerProps {
  track: Track | null;
  onEnd: () => void;
}

const MusicPlayer = ({ track, onEnd }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (track) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(track.url);
      audio.volume = volume;
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);

      audio.ontimeupdate = () => {
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      audio.onended = () => {
        setIsPlaying(false);
        onEnd();
      };
    }
  }, [track]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime =
      (value[0] / 100) * audioRef.current.duration;
  };

  const handleVolume = (value: number[]) => {
    const vol = value[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  if (!track) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg p-4 flex items-center gap-4 z-50">
      <img
        src={track.coverUrl}
        alt={track.title}
        className="w-12 h-12 object-cover rounded-md"
      />
      <div className="flex-1">
        <p className="font-medium">{track.title}</p>
        <Slider
          value={[progress]}
          max={100}
          step={1}
          onValueChange={handleSeek}
        />
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={togglePlay}>
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <div className="w-24 flex items-center gap-2">
          <Volume2 className="w-4 h-4" />
          <Slider
            value={[volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolume}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
