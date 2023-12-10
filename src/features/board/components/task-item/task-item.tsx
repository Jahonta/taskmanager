import { useState } from 'react';

import { Task } from '@taskmanager/types';
import { useKeydown } from '@taskmanager/hooks';
import { useTaskMutation } from '@taskmanager/api';

import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../task-card/task-card';

type TaskItemProps = {
  task: Task;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function TaskItem({ task, editingId, onEditClick }: TaskItemProps) {
  const updateMutation = useTaskMutation('update');
  const deleteMutation = useTaskMutation('delete');
  const [hasError, setHasError] = useState(false);

  const isEditing = editingId === task.id;
  useKeydown({
    key: 'Escape',
    callback: () => onEditClick(null),
    condition: isEditing,
  });

  const handleEditClick = () => {
    onEditClick(task.id);
  };

  const handleDelete = () => {
    deleteMutation
      .mutateAsync(task)
      .then(() => {
        onEditClick(null);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  const handleUpdate = (updatedTask: Task) => {
    updateMutation
      .mutateAsync(updatedTask)
      .then(() => {
        onEditClick(null);
        setHasError(false);
      })
      .catch(() => {
        setHasError(true);
      });
  };

  return isEditing ? (
    <TaskForm
      task={task}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
      isCreating={false}
      hasError={hasError}
      dropError={() => setHasError(false)}
    />
  ) : (
    <TaskCard
      task={task}
      onEditClick={handleEditClick}
      onUpdate={handleUpdate}
      hasError={hasError}
      dropError={() => setHasError(false)}
    />
  );
}

export { TaskItem };
