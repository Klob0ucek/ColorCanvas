import React from 'react';
import {cn} from "../utils.ts";
import "./paint-picker.css";
import {colors} from "../models/colors";

interface PaintPickerProps {
  paint: string;
  setPaint: (paint: string) => void;
  className?: string;
}

const PaintPicker: React.FC<PaintPickerProps> = ({paint, setPaint, className}) => {
  const [paletteVisible, setPaletteVisible] = React.useState(false);

  const showPalette = () => {
    setPaletteVisible(true);
  }

  const hidePalette = () => {
    setPaletteVisible(false);
  }

  return (
    <div className={cn(className, 'paint-picker')}>
      <div
        className='paint-picker__color'
        style={{
          backgroundColor: paint,
        }}
        onClick={showPalette}
      ></div>
      <div
        className='paint-picker__palette'
        onClick={hidePalette}
        style={{
          display: paletteVisible ? 'flex' : 'none',
        }}>
        {
          colors.map((color) => (
            <div
              key={color}
              className='paint-picker__palette-color'
              style={{
                backgroundColor: color,
              }}
              onClick={() => setPaint(color)}
            ></div>
          ))
        }
        </div>
    </div>
  )
}

export default PaintPicker;