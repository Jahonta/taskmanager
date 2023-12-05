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
    deleteMutation.mutate(task);
  };

  const handleUpdate = (updatedTask: Task) => {
    updateMutation.mutate(updatedTask);
  };

  return isEditing ? (
    <TaskForm
      task={task}
      onSubmit={handleUpdate}
      onDelete={handleDelete}
      isCreating={false}
    />
  ) : (
    <TaskCard
      task={task}
      onEditClick={handleEditClick}
      onUpdate={handleUpdate}
    />
  );
}

export { TaskItem };
