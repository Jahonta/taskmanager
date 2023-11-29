import { useState } from 'react';

import { useTasks } from '@taskmanager/api';
import { Task } from '@taskmanager/types';

import { TaskItem } from '../task-item/task-item';

function TaskList() {
  const { data } = useTasks();
  const [editingId, setEditingId] = useState<Task['id'] | null>(null);

  return (
    <div className='board__tasks'>
      {data &&
        data.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            editingId={editingId}
            onEditClick={setEditingId}
          />
        ))}
    </div>
  );
}

export { TaskList };
