import { RepeatingDay, RepeatingDays, Task } from '@taskmanager/types';

import { RepeatingItem } from '../repeating-item/repeating-item';

type RepeatingContainerProps = {
  onChange: (repeatingDays: Task['repeatingDays']) => void;
  currentRepeatingDays: Task['repeatingDays'];
};

function RepeatingContainer({
  onChange,
  currentRepeatingDays,
}: RepeatingContainerProps) {
  const handleChange = (day: RepeatingDay, isChecked: boolean) => {
    onChange({
      ...currentRepeatingDays,
      [day]: isChecked,
    });
  };

  return (
    <div className='card__repeat-days-inner'>
      {RepeatingDays.map((day) => (
        <RepeatingItem
          key={day}
          day={day}
          checked={currentRepeatingDays[day]}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

export { RepeatingContainer };
