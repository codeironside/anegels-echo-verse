import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Square, Play, Pause, Upload, Trash2, Save, Volume2 } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';

interface AudioFeaturesProps {
  onAudioSave: (audioBlob: Blob) => void;
}

export const AudioFeatures: React.FC<AudioFeaturesProps> = ({ onAudioSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (audioURL && waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(var(--color-text))',
        progressColor: 'rgb(var(--color-secondary))',
        cursorColor: 'rgb(var(--color-accent))',
        height: 80,
        normalize: true,
        barWidth: 2,
        barGap: 1,
      });

      wavesurferRef.current.on('finish', () => setIsPlaying(false));
      
      if (audioURL.startsWith('blob:')) {
        fetch(audioURL)
          .then(r => r.blob())
          .then(blob => wavesurferRef.current?.loadBlob(blob));
      }
    }
  }, [audioURL]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('audio/')) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
    }
  };

  const togglePlayPause = () => {
    if (wavesurferRef.current) {
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
  };

  const handleSave = () => {
    if (audioURL) {
      fetch(audioURL)
        .then(r => r.blob())
        .then(blob => onAudioSave(blob));
    }
  };

  const handleDelete = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
      wavesurferRef.current = null;
    }
    setAudioURL(null);
    setIsPlaying(false);
  };

  return (
    <div className="bg-[rgb(var(--color-card))] rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-serif mb-6">Audio Recording</h2>

      {/* Recording Controls */}
      <div className="flex items-center gap-4">
        {!audioURL && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isRecording ? stopRecording : startRecording}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))]'
            }`}
          >
            {isRecording ? (
              <>
                <Square size={20} />
                Stop Recording
              </>
            ) : (
              <>
                <Mic size={20} />
                Start Recording
              </>
            )}
          </motion.button>
        )}

        {!isRecording && (
          <label className="cursor-pointer">
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-[rgb(var(--color-background))] rounded-lg font-medium"
            >
              <Upload size={20} />
              Upload Audio
            </motion.div>
          </label>
        )}
      </div>

      {/* Waveform Display */}
      {audioURL && (
        <div className="space-y-4">
          <div ref={waveformRef} className="w-full" />
          
          {/* Playback Controls */}
          <div className="flex items-center gap-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlayPause}
              className="p-3 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-full"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>

            <div className="flex items-center gap-2 flex-1">
              <Volume2 size={20} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-32 h-2 bg-[rgb(var(--color-background))] rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-[rgb(var(--color-secondary))] text-[rgb(var(--color-background))] rounded-lg"
              >
                <Save size={18} />
                Save
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                <Trash2 size={18} />
                Delete
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};