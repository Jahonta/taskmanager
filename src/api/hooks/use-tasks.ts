import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '../constants';
import { getTasks } from '../task-fetchers';

function useTasks() {
  return useQuery({ queryKey: [QUERY_KEY], queryFn: getTasks });
}

export { useTasks };
