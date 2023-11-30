import { useEffect, useState } from 'react';

import { Task } from '@taskmanager/types';
import { Button } from '@taskmanager/components';
import { useTasks } from '@taskmanager/api';

import { TASKS_PER_PORTION } from '../../constants';

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
  const { data } = useTasks();
  const [renderedTaskCount, setRenderedTaskCount] = useState(0);

  useEffect(() => {
    if (data) {
      setRenderedTaskCount(Math.min(TASKS_PER_PORTION, data.length));
    }
  }, [data]);

  if (!data) {
    return null;
  }

  const handleLoadMoreClick = () => {
    setRenderedTaskCount((prevRenderedTaskCount) =>
      Math.min(prevRenderedTaskCount + TASKS_PER_PORTION, data.length)
    );
  };

  return (
    <section className='board container'>
      <SortingList />

      <TaskList
        tasks={data.slice(0, renderedTaskCount)}
        isCreating={isCreating}
        editingId={editingId}
        onEditClick={onEditClick}
      />

      {data.length > renderedTaskCount && (
        <Button extraClasses={['load-more']} onClick={handleLoadMoreClick}>
          load more
        </Button>
      )}
    </section>
  );
}

export { BoardContainer };
