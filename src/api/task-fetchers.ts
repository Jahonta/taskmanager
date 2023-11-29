import { Task } from '@taskmanager/types';

import { adaptToServer } from './adapters/client-to-server';
import { adaptToClient } from './adapters/server-to-client';
import { request } from './helpers/request';

function getTasks(): Promise<Task[]> {
  return request().then((tasks) => {
    return tasks.map(adaptToClient);
  });
}

function addTask(task: Omit<Task, 'id'>): Promise<Task> {
  return request({ method: 'POST', body: adaptToServer(task) }).then((task) => {
    return adaptToClient(task);
  });
}

function updateTask(task: Task): Promise<Task> {
  return request({
    method: 'PUT',
    id: task.id,
    body: adaptToServer(task),
  }).then((task) => {
    return adaptToClient(task);
  });
}

function deleteTask(task: Task): Promise<void> {
  return request({ method: 'DELETE', id: task.id });
}

export { getTasks, addTask, updateTask, deleteTask };
