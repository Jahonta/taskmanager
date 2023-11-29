import { Color } from '@taskmanager/types';
import { LabeledInput } from '@taskmanager/components';

type ColorItemProps = {
  color: Color;
  onChange: () => void;
  checked: boolean;
};

function ColorItem({ color, onChange, checked }: ColorItemProps) {
  return (
    <LabeledInput
      type='radio'
      name='color'
      value={color}
      onChange={onChange}
      inputExtraClasses={['card__color-input', `card__color-input--${color}`]}
      labelExtraClasses={['card__color', `card__color--${color}`]}
      checked={checked}
    />
  );
}

export { ColorItem };
