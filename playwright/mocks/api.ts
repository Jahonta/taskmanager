import crypto from 'node:crypto';
import { Page } from '@playwright/test';

import { mockTasks } from './tasks';

export async function mockAPI(page: Page, isEmpty: boolean = false) {
  let tasks = isEmpty ? [] : [...mockTasks];
  await page.route(/task-manager\/tasks/, async (route) => {
    if (!route.request().headers().authorization?.startsWith('Basic ')) {
      await route.fulfill({ status: 401 });
      return;
    }

    switch (route.request().method()) {
      case 'GET': {
        await route.fulfill({ json: tasks });
        return;
      }
      case 'POST': {
        const newTask = {
          ...route.request().postDataJSON(),
          id: crypto.randomUUID(),
        };
        tasks.unshift(newTask);
        await route.fulfill({ json: newTask });
        return;
      }
      case 'DELETE': {
        tasks = tasks.filter(
          (task) => task.id !== route.request().url().split('/').pop()
        );
        await route.fulfill({ status: 204 });
        return;
      }
      case 'PUT': {
        const updatedTask = {
          ...route.request().postDataJSON(),
          id: route.request().url().split('/').pop(),
        };
        tasks = tasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        );
        await route.fulfill({ json: updatedTask });
        return;
      }
    }
  });
}
