import { useState } from 'react';

import { Task } from '@taskmanager/types';
import { useTaskMutation } from '@taskmanager/api';

import { getEmptyTask } from '../../helpers/task';

import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';

type TaskListProps = {
  tasks: Task[];
  isCreating: boolean;
  onCancel: () => void;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function TaskList({
  tasks,
  isCreating,
  onCancel,
  editingId,
  onEditClick,
}: TaskListProps) {
  const addMutation = useTaskMutation('add');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (newTask: Task) => {
    addMutation.mutateAsync(newTask).catch(() => {
      setHasError(true);
    });
  };

  return (
    <div className='board__tasks'>
      {isCreating && (
        <TaskForm
          task={getEmptyTask()}
          onSubmit={handleSubmit}
          onDelete={onCancel}
          isCreating={true}
          hasError={hasError}
          dropError={() => setHasError(false)}
        />
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingId={editingId}
          onEditClick={onEditClick}
        />
      ))}
    </div>
  );
}

export { TaskList };
