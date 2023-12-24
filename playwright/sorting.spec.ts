import { test, expect } from '@playwright/test';

import { mockAPI } from './mocks/api';

test.describe('Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page);
    await page.goto('http://localhost:5173/');
  });

  test('sorting by default works correctly', async ({ page }) => {
    await expect(page.getByText('SORT BY DEFAULT')).toHaveClass(
      /board__sort-item--active/
    );
    await expect(page.getByText('SORT BY DATE up')).not.toHaveClass(
      /board__sort-item--active/
    );
    await expect(page.getByText('SORT BY DATE down')).not.toHaveClass(
      /board__sort-item--active/
    );
    const taskElements = page.getByTestId('task-card');
    await expect(taskElements.nth(0)).toHaveText(/Task 1/);
    await expect(taskElements.nth(1)).toHaveText(/Task 3/);
    await expect(taskElements.nth(2)).toHaveText(/Task 4/);
    await expect(taskElements.nth(3)).toHaveText(/Task 5/);
    await expect(taskElements.nth(4)).toHaveText(/Task 6/);
    await expect(taskElements.nth(5)).toHaveText(/Task 7/);
    await expect(taskElements.nth(6)).toHaveText(/Task 8/);
    await expect(taskElements.nth(7)).toHaveText(/Task 9/);
  });

  test('sorting by date up works correctly', async ({ page }) => {
    const sortingElement = page.getByText('SORT BY DATE up');
    await sortingElement.click();

    await expect(sortingElement).toHaveClass(/board__sort-item--active/);
    await expect(page.getByText('SORT BY DEFAULT')).not.toHaveClass(
      /board__sort-item--active/
    );
    const taskElements = page.getByTestId('task-card');
    await expect(taskElements.nth(0)).toHaveText(/Task 6/);
    await expect(taskElements.nth(1)).toHaveText(/Task 8/);
    await expect(taskElements.nth(2)).toHaveText(/Task 5/);
    await expect(taskElements.nth(3)).toHaveText(/Task 7/);
  });

  test('sorting by date down works correctly', async ({ page }) => {
    const sortingElement = page.getByText('SORT BY DATE down');
    await sortingElement.click();

    await expect(sortingElement).toHaveClass(/board__sort-item--active/);
    await expect(page.getByText('SORT BY DEFAULT')).not.toHaveClass(
      /board__sort-item--active/
    );
    const taskElements = page.getByTestId('task-card');
    await expect(taskElements.nth(0)).toHaveText(/Task 7/);
    await expect(taskElements.nth(1)).toHaveText(/Task 5/);
    await expect(taskElements.nth(2)).toHaveText(/Task 8/);
    await expect(taskElements.nth(3)).toHaveText(/Task 6/);
  });

  test('sorting is dropped if the add new task button was clicked', async ({
    page,
  }) => {
    const sortingElement = page.getByText('SORT BY DATE down');
    await sortingElement.click();

    await expect(sortingElement).toHaveClass(/board__sort-item--active/);

    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();

    await expect(sortingElement).not.toHaveClass(/board__sort-item--active/);
    await expect(page.getByText('SORT BY DEFAULT')).toHaveClass(
      /board__sort-item--active/
    );
  });

  test('sorting is dropped if filter was changed', async ({ page }) => {
    const sortingElement = page.getByText('SORT BY DATE down');
    await sortingElement.click();

    await expect(sortingElement).toHaveClass(/board__sort-item--active/);

    await page.getByText('repeating 2').click();

    await expect(sortingElement).not.toHaveClass(/board__sort-item--active/);
    await expect(page.getByText('SORT BY DEFAULT')).toHaveClass(
      /board__sort-item--active/
    );
  });
});
