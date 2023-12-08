import { useQuery } from '@tanstack/react-query';

import { QUERY_KEY, CASH_TIME } from '../constants';
import { getTasks } from '../task-fetchers';

function useTasks() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTasks,
    staleTime: CASH_TIME,
  });
}

export { useTasks };
