import { Task } from '@taskmanager/types';

import { TaskItem } from '../task-item/task-item';
import { TaskForm } from '../task-form/task-form';
import { getEmptyTask } from '@taskmanager/board/helpers/task';

type TaskListProps = {
  tasks: Task[];
  isCreating: boolean;
  editingId: Task['id'] | null;
  onEditClick: (id: Task['id'] | null) => void;
};

function TaskList({
  tasks,
  isCreating,
  editingId,
  onEditClick,
}: TaskListProps) {
  return (
    <div className='board__tasks'>
      {isCreating && (
        <TaskForm task={getEmptyTask()} onSubmit={() => {}} isCreating={true} />
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
