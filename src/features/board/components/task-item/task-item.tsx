import { Task } from '@taskmanager/types';

import { TaskForm } from '../task-form/task-form';
import { TaskCard } from '../task-card/task-card';

type TaskItemProps = {
  task: Task;
  isEditing: boolean;
};

function TaskItem({ task, isEditing }: TaskItemProps) {
  return isEditing ? (
    <TaskForm task={task} onSubmit={() => {}} />
  ) : (
    <TaskCard task={task} />
  );
}

export { TaskItem };
