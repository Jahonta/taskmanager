import { Board } from './features/board';
import { Control } from './features/control';
import { Filter } from './features/filter';

function App() {
  return (
    <main className='main'>
      <Control />
      <Filter />
      <Board />
    </main>
  );
}

export default App;
