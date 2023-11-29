import { useTasks } from '@taskmanager/api';

import { TaskItem } from '../task-item/task-item';

function TaskList() {
  const { data } = useTasks();

  return (
    <div className='board__tasks'>
      {data &&
        data.map((task) => (
          <TaskItem key={task.id} task={task} isEditing={false} />
        ))}
    </div>
  );
}

export { TaskList };
