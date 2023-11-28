import { Button } from '@taskmanager/components';

import { Sorting } from '../sorting/sorting';
import { TaskList } from '../task-list/task-list';

function Container() {
  return (
    <section className='board container'>
      <Sorting />

      <TaskList />

      <Button extraClasses={['load-more']} onClick={() => {}}>
        load more
      </Button>
    </section>
  );
}

export { Container };
