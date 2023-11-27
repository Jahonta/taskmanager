import { Sorting } from '../sorting/sorting';
import { TaskList } from '../task-list/task-list';

import { Button } from '@components';

function Container() {
  return (
    <section className='board container'>
      <Sorting />

      <TaskList />

      <Button extraClass='load-more' onClick={() => {}}>
        load more
      </Button>
    </section>
  );
}

export { Container };
