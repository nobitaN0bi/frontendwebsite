import { useCallback, useEffect, useRef, useState } from 'react';

export const useBrowserNarration = ({ chapters, activeIndex, onAdvance }) => {
  const [status, setStatus] = useState('idle');
  const [spokenIndex, setSpokenIndex] = useState(null);
  const sessionRef = useRef(0);
  const speakRef = useRef(null);
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  const stop = useCallback(() => {
    sessionRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
    setStatus('idle');
    setSpokenIndex(null);
  }, [supported]);

  const speak = useCallback((index, guided = true) => {
    if (!supported || !chapters[index]) return;
    sessionRef.current += 1;
    const session = sessionRef.current;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(chapters[index].narration);
    const voices = Array.from(window.speechSynthesis.getVoices?.() || []);
    const preferredVoice = voices.find((voice) => /^en(-|_)/i.test(voice.lang) && /Samantha|Ava|Google|Microsoft/i.test(voice.name)) || voices.find((voice) => /^en(-|_)/i.test(voice.lang));
    if (preferredVoice) {
      try { utterance.voice = preferredVoice; } catch (error) { /* Browser automation may expose non-native voice descriptors. */ }
    }
    utterance.rate = 0.92;
    utterance.pitch = 0.96;
    utterance.onstart = () => { if (session === sessionRef.current) { setStatus('playing'); setSpokenIndex(index); } };
    utterance.onend = () => {
      if (session !== sessionRef.current) return;
      const next = index + 1;
      if (guided && next < chapters.length) {
        onAdvance(next);
        window.setTimeout(() => speakRef.current?.(next, true), 320);
      } else {
        setStatus('idle');
        setSpokenIndex(null);
      }
    };
    utterance.onerror = (event) => {
      if (session === sessionRef.current && !['interrupted', 'canceled'].includes(event.error)) setStatus('idle');
    };
    window.speechSynthesis.speak(utterance);
  }, [chapters, onAdvance, supported]);

  speakRef.current = speak;

  const play = useCallback(() => {
    if (!supported) return;
    if (status === 'paused') {
      window.speechSynthesis.resume();
      setStatus('playing');
      return;
    }
    speak(activeIndex, true);
  }, [activeIndex, speak, status, supported]);

  const pause = useCallback(() => {
    if (!supported || status !== 'playing') return;
    window.speechSynthesis.pause();
    setStatus('paused');
  }, [status, supported]);

  useEffect(() => () => {
    sessionRef.current += 1;
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  return { supported, status, spokenIndex, play, pause, stop, speak };
};