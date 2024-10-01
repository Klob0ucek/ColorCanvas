import {useState} from "react"

const defaultColor = '#ffffff';

const useCanvas = (numSquares = 10000) => {
  const [pixels, setPixels] = useState(Array(numSquares).fill(defaultColor));

  // if (random) {
  //   for(let i = 0; i < numSquares; i++) {
  //     pixels[i] = colors[Math.floor(Math.random() * colors.length)];
  //   }
  // }

  const updatePixel = (index: number, color: string) => {
    const newColors = [...pixels];
    newColors[index] = color;
    setPixels(newColors);
  };

  return {
    pixels,
    updatePixel,
  };
};

export default useCanvas;