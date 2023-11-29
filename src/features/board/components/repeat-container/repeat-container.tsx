import { RepeatingDay, RepeatingDays, Task } from '@taskmanager/types';

import { RepeatingItem } from '../repeating-item/repeating-item';

type RepeatContainerProps = {
  onChange: (repeatingDays: Task['repeatingDays']) => void;
  currentRepeatingDays: Task['repeatingDays'];
};

function RepeatContainer({
  onChange,
  currentRepeatingDays,
}: RepeatContainerProps) {
  const handleChange = (day: RepeatingDay, isChecked: boolean) => {
    onChange({
      ...currentRepeatingDays,
      [day]: isChecked,
    });
  };

  return (
    <div className='card__repeat-days-inner'>
      {RepeatingDays.map((day) => (
        <RepeatingItem key={day} day={day} onChange={handleChange} />
      ))}
    </div>
  );
}

export { RepeatContainer };
