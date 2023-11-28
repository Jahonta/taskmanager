import { TasksProvider } from '@taskmanager/api';
import { Board } from '@taskmanager/board';
import { Control } from '@taskmanager/control';
import { Filter } from '@taskmanager/filter';

function App() {
  return (
    <TasksProvider>
      <main className='main'>
        <Control />
        <Filter />
        <Board />
      </main>
    </TasksProvider>
  );
}

export default App;
