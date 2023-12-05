import { useEffect, useState } from 'react';

import { Filter, Task } from '@taskmanager/types';
import { Button } from '@taskmanager/components';

import { DEFAULT_SORTING, TASKS_PER_PORTION } from '../../constants';
import { Sorting } from '../../types/sorting';
import { sort } from '../../helpers/sorting';

import { SortingList } from '../sorting-list/sorting-list';
import { TaskList } from '../task-list/task-list';

type BoardContainerProps = {
  tasks: Task[];
  isCreating: boolean;
  onCancel: () => void;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
  activeFilter: Filter;
};

function BoardContainer({
  tasks,
  isCreating,
  onCancel,
  editingId,
  onEditClick,
  activeFilter,
}: BoardContainerProps) {
  const [renderedTaskCount, setRenderedTaskCount] = useState(0);
  const [activeSorting, setActiveSorting] = useState<Sorting>(DEFAULT_SORTING);

  useEffect(() => {
    setActiveSorting(DEFAULT_SORTING);
  }, [activeFilter]);

  useEffect(() => {
    setRenderedTaskCount(Math.min(TASKS_PER_PORTION, tasks.length));
  }, [tasks, activeSorting]);

  const sortedData = sort[activeSorting](tasks);

  const handleLoadMoreClick = () => {
    setRenderedTaskCount((prevRenderedTaskCount) =>
      Math.min(prevRenderedTaskCount + TASKS_PER_PORTION, tasks.length)
    );
  };

  return (
    <section className='board container'>
      <SortingList
        activeSorting={activeSorting}
        setActiveSorting={(type: Sorting) => {
          setActiveSorting(type);
          onEditClick(null);
        }}
      />

      <TaskList
        tasks={sortedData.slice(0, renderedTaskCount)}
        isCreating={isCreating}
        onCancel={onCancel}
        editingId={editingId}
        onEditClick={onEditClick}
      />

      {tasks.length > renderedTaskCount && (
        <Button extraClasses={['load-more']} onClick={handleLoadMoreClick}>
          load more
        </Button>
      )}
    </section>
  );
}

export { BoardContainer };
