import { useEffect, useMemo, useState } from 'react';

import { Filter, Task } from '@taskmanager/types';
import { Button } from '@taskmanager/components';
import { useTasks } from '@taskmanager/api';
import { getTasksByFilter } from '@taskmanager/helpers';

import { DEFAULT_SORTING, TASKS_PER_PORTION } from '../../constants';
import { Sorting } from '../../types/sorting';
import { sort } from '../../helpers/sorting';

import { SortingList } from '../sorting-list/sorting-list';
import { TaskList } from '../task-list/task-list';
import { Message } from '../message/message';

type BoardContainerProps = {
  isCreating: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
  activeFilter: Filter;
};

function BoardContainer({
  isCreating,
  onCancel,
  onSuccess,
  editingId,
  onEditClick,
  activeFilter,
}: BoardContainerProps) {
  const { data, isLoading, isError } = useTasks();
  const [renderedTaskCount, setRenderedTaskCount] = useState(0);
  const [activeSorting, setActiveSorting] = useState<Sorting>(DEFAULT_SORTING);
  const filteredTasks = useMemo(
    () => getTasksByFilter(activeFilter, data),
    [activeFilter, data]
  );

  useEffect(() => {
    setActiveSorting(DEFAULT_SORTING);
  }, [activeFilter, isCreating]);

  useEffect(() => {
    setRenderedTaskCount(TASKS_PER_PORTION);
  }, [activeFilter]);

  if (!data && isLoading) {
    return <Message type='loading' filter={activeFilter} />;
  }

  if (isError) {
    return <Message type='error' filter={activeFilter} />;
  }

  if (!filteredTasks.length && !isCreating) {
    return <Message type='empty' filter={activeFilter} />;
  }

  const sortedData = sort[activeSorting](filteredTasks);

  const handleLoadMoreClick = () => {
    setRenderedTaskCount((prevRenderedTaskCount) =>
      Math.min(prevRenderedTaskCount + TASKS_PER_PORTION, filteredTasks.length)
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
        onSuccess={onSuccess}
        editingId={editingId}
        onEditClick={onEditClick}
      />

      {filteredTasks.length > renderedTaskCount && (
        <Button extraClasses={['load-more']} onClick={handleLoadMoreClick}>
          load more
        </Button>
      )}
    </section>
  );
}

export { BoardContainer };
