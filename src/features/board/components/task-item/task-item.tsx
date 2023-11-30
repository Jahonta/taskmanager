import { Task } from '@taskmanager/types';
import { useKeydown } from '@taskmanager/hooks';

import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../task-card/task-card';

type TaskItemProps = {
  task: Task;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function TaskItem({ task, editingId, onEditClick }: TaskItemProps) {
  const isEditing = editingId === task.id;
  useKeydown({
    key: 'Escape',
    callback: () => onEditClick(null),
    condition: isEditing,
  });

  const handleEditClick = () => {
    onEditClick(task.id);
  };

  return isEditing ? (
    <TaskForm task={task} onSubmit={() => {}} />
  ) : (
    <TaskCard task={task} onEditClick={handleEditClick} />
  );
}

export { TaskItem };
