import { useState } from 'react';

import { Board } from '@taskmanager/board';
import { Control } from '@taskmanager/control';
import { Filter } from '@taskmanager/filter';
import { Task, Filters, Filter as FilterType } from '@taskmanager/types';

function App() {
  const [editingId, setEditingId] = useState<Task['id'] | null>(null);
  const [isCreating, setCreating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>(Filters[0]);

  const startCreating = () => {
    setCreating(true);
    setEditingId(null);
    setActiveFilter(Filters[0]);
  };

  const stopCreating = () => {
    setCreating(false);
    setEditingId(null);
  };

  const handleEditing = (id: Task['id'] | null) => {
    setEditingId(id);
    setCreating(false);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setCreating(false);
    setEditingId(null);
  };

  return (
    <main className='main'>
      <Control
        isCreating={isCreating}
        onAddTaskClick={startCreating}
        onCancel={stopCreating}
      />
      <Filter
        activeFilter={activeFilter}
        setActiveFilter={handleFilterChange}
      />
      <Board
        isCreating={isCreating}
        onCancel={stopCreating}
        onSuccess={stopCreating}
        editingId={editingId}
        onEditClick={handleEditing}
        activeFilter={activeFilter}
      />
    </main>
  );
}

export default App;
