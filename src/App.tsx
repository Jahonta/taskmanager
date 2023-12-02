import { useState } from 'react';

import { useTasks } from '@taskmanager/api';
import { Board } from '@taskmanager/board';
import { Control } from '@taskmanager/control';
import { Filter } from '@taskmanager/filter';
import { Task, Filters, Filter as FilterType } from '@taskmanager/types';

import { getFilteredTasks } from './helpers/filter';

function App() {
  const { data } = useTasks();
  const [editingId, setEditingId] = useState<Task['id'] | null>(null);
  const [isCreating, setCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(Filters[0]);

  if (!data) {
    return null;
  }

  const filteredTasks = getFilteredTasks(data);

  const handleCreating = (flag: boolean) => {
    setCreating(flag);
    setEditingId(null);

    if (flag) {
      setActiveFilter(Filters[0]);
    }
  };

  const handleEditing = (id: Task['id'] | null) => {
    setEditingId(id);
    setCreating(false);
  };

  return (
    <main className='main'>
      <Control isCreating={isCreating} onAddTaskClick={handleCreating} />
      <Filter
        filteredTasks={filteredTasks}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <Board
        tasks={filteredTasks[activeFilter]}
        isCreating={isCreating}
        editingId={editingId}
        onEditClick={handleEditing}
        activeFilter={activeFilter}
      />
    </main>
  );
}

export default App;
