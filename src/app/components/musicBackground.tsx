"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export default function BackgroundMusic() {
   const [isPlaying, setIsPlaying] = useState(false);
   const audioRef = useRef<HTMLAudioElement | null>(null);

   useEffect(() => {
      const playAudio = () => {
         if (audioRef.current) {
            audioRef.current.volume = 0.3;
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
               playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() =>
                     console.log("Trình duyệt chặn autoplay!"));
            }
         }
      };

      const handleUserInteraction = () => {
         playAudio();
         document.removeEventListener("click", handleUserInteraction);
         document.removeEventListener("pointerdown", handleUserInteraction);
      };

      // Click or touch to turn on music
      document.addEventListener("click", handleUserInteraction);
      document.addEventListener("pointerdown", handleUserInteraction);

      return () => {
         document.removeEventListener("click", handleUserInteraction);
         document.removeEventListener("pointerdown", handleUserInteraction);
      };
   }, []);

   const toggleMusic = () => {
      if (audioRef.current) {
         if (isPlaying) {
            audioRef.current.pause();
         } else {
            audioRef.current.play();
         }
         setIsPlaying(!isPlaying);
      }
   };

   return (
      <div className="fixed bottom-4 right-4">
         <button onClick={toggleMusic} className="bg-black p-2 hover:opacity-75 rounded-full">
            {isPlaying
               ? (<Image src="/pausemusic.svg" alt="Tic-Tac-Toe Image" width={32} height={32} />)
               : (<Image src="/playmusic.svg" alt="Tic-Tac-Toe Image" width={32} height={32} />)}
         </button>
         <audio ref={audioRef} loop>
            <source src="/BalatroMusic.mp3" type="audio/mpeg" />
         </audio>
      </div>
   );
}
