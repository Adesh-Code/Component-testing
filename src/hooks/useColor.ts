import { useState, useEffect } from 'react';
import { ColorType } from './../types/types';

export const dummyColor: ColorType = {
  Primary: '#EA3946',
  Secondary: '#3B4474',
  Error: '#DC2626',
  Success: '#348D48',
  Warning: '#F2994A',
  White: '#FFFFFF',
  Bg: '#F3F3F3',
  Gray: '#C6C6CB',
};

export const useColor = ({ setColors }: { setColors?: Partial<ColorType> }) => {
  const [color, setColor] = useState<ColorType>(dummyColor);

  const handleProps = (props?: Partial<ColorType>) => {
    if (props) {
      setColor({ ...color, ...props });
    } else return;
  };

  useEffect(() => {
    handleProps(setColors);
  }, []);

  return color as ColorType;
};
