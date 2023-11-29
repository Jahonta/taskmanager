import { Task } from '@taskmanager/types';

import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../task-card/task-card';
import { useEffect } from 'react';

type TaskItemProps = {
  task: Task;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function TaskItem({ task, editingId, onEditClick }: TaskItemProps) {
  const isEditing = editingId === task.id;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEditClick(null);
      }
    };

    if (isEditing) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isEditing, onEditClick]);

  const handleEditClick = () => {
    onEditClick(task.id);
  };

  return editingId === task.id ? (
    <TaskForm task={task} onSubmit={() => {}} />
  ) : (
    <TaskCard task={task} onEditClick={handleEditClick} />
  );
}

export { TaskItem };
