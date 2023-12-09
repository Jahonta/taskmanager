import { Button } from '@taskmanager/components';
import { useKeydown } from '@taskmanager/hooks';

import { Header } from '../header/header';

type ControlContainerProps = {
  isCreating: boolean;
  onAddTaskClick: () => void;
  onCancel: () => void;
};

function ControlContainer({
  isCreating,
  onAddTaskClick,
  onCancel,
}: ControlContainerProps) {
  useKeydown({
    key: 'Escape',
    callback: onCancel,
    condition: isCreating,
  });

  return (
    <section className='main__control control container'>
      <Header />
      <Button
        extraClasses={['control__button']}
        onClick={onAddTaskClick}
        disabled={isCreating}
      >
        + ADD NEW TASK
      </Button>
    </section>
  );
}

export { ControlContainer };
