import { useState } from 'react';

import { TasksProvider } from '@taskmanager/api';
import { Board } from '@taskmanager/board';
import { Control } from '@taskmanager/control';
import { Filter } from '@taskmanager/filter';
import { Task } from '@taskmanager/types';

function App() {
  const [editingId, setEditingId] = useState<Task['id'] | null>(null);
  const [isCreating, setCreating] = useState(false);

  const handleCreating = (flag: boolean) => {
    setCreating(flag);
    setEditingId(null);
  };

  const handleEditing = (id: Task['id'] | null) => {
    setEditingId(id);
    setCreating(false);
  };

  return (
    <TasksProvider>
      <main className='main'>
        <Control isCreating={isCreating} onAddTaskClick={handleCreating} />
        <Filter />
        <Board
          isCreating={isCreating}
          editingId={editingId}
          onEditClick={handleEditing}
        />
      </main>
    </TasksProvider>
  );
}

export default App;
