import React, { useEffect, useRef } from 'react';

interface IProps {
  source : any
}

function AudioPlayer({source} : IProps) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio : any = audioRef.current;
    audio.play()
      .then(() => console.log('Audio playing'))
      .catch((error : any) => console.log("audio mai error" ,error));
  }, []);

  return (
    <audio autoPlay src={source} ref={audioRef} />
  );
}

export default AudioPlayer;
