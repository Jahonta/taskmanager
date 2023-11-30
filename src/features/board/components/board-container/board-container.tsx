import { Task } from '@taskmanager/types';
import { Button } from '@taskmanager/components';

import { SortingList } from '../sorting-list/sorting-list';
import { TaskList } from '../task-list/task-list';

type BoardContainerProps = {
  isCreating: boolean;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function BoardContainer({
  isCreating,
  editingId,
  onEditClick,
}: BoardContainerProps) {
  return (
    <section className='board container'>
      <SortingList />

      <TaskList
        isCreating={isCreating}
        editingId={editingId}
        onEditClick={onEditClick}
      />

      <Button extraClasses={['load-more']} onClick={() => {}}>
        load more
      </Button>
    </section>
  );
}

export { BoardContainer };
