import { Task } from '@taskmanager/types';

import { ServerTask } from '../types/server-task';
import { API_TOKEN, TASKS_API } from '../constants';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

function request({
  method = 'GET',
  id,
  body,
}: {
  method?: Method;
  id?: Task['id'];
  body?: ServerTask | Omit<ServerTask, 'id'>;
} = {}) {
  const endpoind = id ? `${TASKS_API}/${id}` : TASKS_API;

  return fetch(endpoind, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${API_TOKEN}`,
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { request };
