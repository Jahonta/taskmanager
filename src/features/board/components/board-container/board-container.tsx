import { Button } from '@taskmanager/components';

import { SortingList } from '../sorting-list/sorting-list';
import { TaskList } from '../task-list/task-list';

function BoardContainer() {
  return (
    <section className='board container'>
      <SortingList />

      <TaskList />

      <Button extraClasses={['load-more']} onClick={() => {}}>
        load more
      </Button>
    </section>
  );
}

export { BoardContainer };
