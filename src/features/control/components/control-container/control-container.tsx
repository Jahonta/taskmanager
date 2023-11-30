import { Button } from '@taskmanager/components';
import { useKeydown } from '@taskmanager/hooks';

import { Header } from '../header/header';

type ControlContainerProps = {
  isCreating: boolean;
  onAddTaskClick: (flag: boolean) => void;
};

function ControlContainer({
  isCreating,
  onAddTaskClick,
}: ControlContainerProps) {
  useKeydown({
    key: 'Escape',
    callback: () => {
      onAddTaskClick(false);
    },
    condition: isCreating,
  });

  const handleAddTaskClick = () => {
    onAddTaskClick(!isCreating);
  };

  return (
    <section className='main__control control container'>
      <Header />
      <Button
        extraClasses={['control__button']}
        onClick={handleAddTaskClick}
        disabled={isCreating}
      >
        + ADD NEW TASK
      </Button>
    </section>
  );
}

export { ControlContainer };
