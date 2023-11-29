import { Color, Colors } from '@taskmanager/types';

import { ColorItem } from '../color-item/color-item';

type ColorsContainerProps = {
  onChange: (color: Color) => void;
  currentColor: Color;
};

function ColorsContainer({ onChange, currentColor }: ColorsContainerProps) {
  return (
    <div className='card__colors-inner'>
      <h3 className='card__colors-title'>Color</h3>
      <div className='card__colors-wrap'>
        {Colors.map((color) => (
          <ColorItem
            key={color}
            color={color}
            onChange={() => onChange(color)}
            checked={color === currentColor}
          />
        ))}
      </div>
    </div>
  );
}

export { ColorsContainer };
