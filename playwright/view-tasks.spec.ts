import { test, expect } from '@playwright/test';

import { mockAPI } from './mocks/api';

test.describe('View tasks', () => {
  test.beforeEach(async ({ page }) => {
    mockAPI(page);
    await page.goto('http://localhost:5173/');
  });

  test('only 8 tasks are displayed', async ({ page }) => {
    await expect(page.getByTestId('task-card')).toHaveCount(8);
  });

  test('remaining tasks are shown after Load more button is clicked', async ({
    page,
  }) => {
    await page.getByText('load more').click();
    await expect(page.getByTestId('task-card')).toHaveCount(9);
  });

  test('displayed tasks count is dropped if the filter was changed', async ({
    page,
  }) => {
    await page.getByText('load more').click();
    await page.getByText('Repeating').click();
    await page.getByText('All').click();

    await expect(page.getByTestId('task-card')).toHaveCount(8);
  });

  test('displayed tasks count is not dropped if the sorting was changed', async ({
    page,
  }) => {
    await page.getByText('load more').click();
    await page.getByText('SORT BY DATE up').click();

    await expect(page.getByTestId('task-card')).toHaveCount(9);
  });

  test('Load more button is removed when all tasks are shown', async ({
    page,
  }) => {
    const loadMoreButton = page.getByText('load more');

    await expect(loadMoreButton).toBeVisible();

    await loadMoreButton.click();

    await expect(loadMoreButton).not.toBeAttached();

    await page.getByText('Repeating').click();
    await page.getByText('All').click();

    await expect(loadMoreButton).toBeVisible();
  });

  test('tasks are rendered properly', async ({ page }) => {
    const taskElements = page.getByTestId('task-card');
    await expect(taskElements.nth(0)).toHaveText(/Task 1/);
    await expect(taskElements.nth(1)).toHaveText(/Task 3/);
    await expect(taskElements.nth(1).getByText('Favorites')).toHaveClass(
      /card__btn--disabled/
    );
    await expect(taskElements.nth(2)).toHaveClass(/card--repeat/);
    await expect(taskElements.nth(3)).toHaveClass(/card--pink/);
    await expect(taskElements.nth(4)).toHaveClass(/card--deadline/);
  });
});

test.describe('View empty tasks', () => {
  test.beforeEach(async ({ page }) => {
    mockAPI(page, true);
    await page.goto('http://localhost:5173/');
  });

  test('the message is shown if there are no tasks', async ({ page }) => {
    await expect(page.getByText('SORT BY DEFAULT')).not.toBeAttached();
    await expect(page.getByTestId('task-card')).not.toBeAttached();
    await expect(page.getByText('load more')).not.toBeAttached();
    await expect(
      page.getByText('Click «ADD NEW TASK» in menu to create your first task')
    ).toBeVisible();
  });

  test('the message hides if the add new task button was clicked', async ({
    page,
  }) => {
    const messageElement = page.getByText(
      'Click «ADD NEW TASK» in menu to create your first task'
    );

    await expect(messageElement).toBeVisible();

    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();
    await expect(messageElement).not.toBeAttached();
  });
});
