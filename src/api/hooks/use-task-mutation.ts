import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task } from '@taskmanager/types';

import { QUERY_KEY } from '../constants';
import { addTask, deleteTask, updateTask } from '../task-fetchers';

type Action = 'add' | 'update' | 'delete';

const mutationFn: Record<Action, (task: Task) => Promise<Task | void>> = {
  add: (task: Task) => addTask(task),
  update: (task: Task) => updateTask(task),
  delete: (task: Task) => deleteTask(task),
};

function useTaskMutation(action: Action) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mutationFn[action],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
  });
}

export { useTaskMutation };
