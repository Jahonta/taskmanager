import { Page } from '@playwright/test';

import { mockTasks } from './tasks';

export async function mockAPI(page: Page, isEmpty: boolean = false) {
  const tasks = isEmpty ? [] : mockTasks;
  await page.route('*/**/task-manager/tasks', async (route) => {
    if (route.request().method() === 'GET') {
      await route.fulfill({ json: tasks });
      return;
    }
  });
}
