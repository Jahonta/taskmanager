import { Filter } from '@taskmanager/types';

type MessageProps = {
  type: 'loading' | 'error' | 'empty';
  filter: Filter;
};

const messageText = {
  loading: 'Loading...',
  error: 'Something went wrong',
};

const emptyFilterText: Record<Filter, string> = {
  all: 'Click «ADD NEW TASK» in menu to create your first task',
  overdue: 'There are no overdue tasks now',
  today: 'There are no tasks today',
  favorites: 'There are no favorite tasks now',
  repeating: 'There are no repeating tasks now',
  archive: 'There are no archived tasks now',
};

function Message({ type, filter }: MessageProps) {
  let message = emptyFilterText[filter];

  if (type === 'error') {
    message = messageText.error;
  }

  if (type === 'loading') {
    message = messageText.loading;
  }

  return <p className='board__no-tasks'>{message}</p>;
}

export { Message };
