import React, {useCallback} from 'react';
import {cn} from "../utils.ts";
import "./tool-picker.css";

interface ToolPickerProps {
  hover: boolean;
  setHover: (hover: boolean) => void;
  className?: string;
}

const ToolPicker: React.FC<ToolPickerProps> = ({hover, setHover, className}) => {

  const getIcon = useCallback(() => {
    return hover ? <img src="/brush_icon.svg" alt="Pen"></img> : <img src="/pen_icon.svg" alt="Brash"></img>;
  }, [hover]);

  const handleClick = useCallback(() => {
    setHover(!hover);
  }, [hover, setHover]);

  return (
    <div
      className={cn(className, 'tool-picker')}
      onClick={handleClick}>
      { getIcon() }
    </div>
  )
}

export default ToolPicker;