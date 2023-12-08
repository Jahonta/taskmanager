import { LabeledInput } from '@taskmanager/components';
import { RepeatingDay } from '@taskmanager/types';

type RepeatingItemProps = {
  day: RepeatingDay;
  checked: boolean;
  onChange: (day: RepeatingDay, isChecked: boolean) => void;
};

function RepeatingItem({ day, checked, onChange }: RepeatingItemProps) {
  return (
    <LabeledInput
      inputExtraClasses={['card__repeat-day-input']}
      labelExtraClasses={['card__repeat-day']}
      type='checkbox'
      name='repeat'
      value={day}
      checked={checked}
      onChange={onChange}
    >
      {day}
    </LabeledInput>
  );
}

export { RepeatingItem };
