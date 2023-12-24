import { test, expect } from '@playwright/test';

import { mockAPI } from './mocks/api';
import { deleteCards } from './helpers/card';

test.describe('Filter', () => {
  test.beforeEach(async ({ page }) => {
    mockAPI(page);
    await page.goto('http://localhost:5173/');
  });

  test('default filter works correctly', async ({ page }) => {
    await expect(page.getByLabel('all 9')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(8);
    await expect(
      page.getByText('Click «ADD NEW TASK» in menu to create your first task')
    ).not.toBeVisible();
    await expect(page.getByText(/Task 2/)).not.toBeVisible();
  });

  test('overdue filter works correctly', async ({ page }) => {
    await page.getByText('overdue 2').click();

    await expect(page.getByLabel('overdue 2')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(2);
    await expect(page.getByText(/Task 6/)).toBeVisible();
    await expect(page.getByText(/Task 8/)).toBeVisible();
    await expect(
      page.getByText('There are no overdue tasks now')
    ).not.toBeVisible();
  });

  test('today filter works correctly', async ({ page }) => {
    await page.getByText('today 1').click();

    await expect(page.getByLabel('today 1')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(1);
    await expect(page.getByText(/Task 5/)).toBeVisible();
    await expect(page.getByText('There are no tasks today')).not.toBeVisible();
  });

  test('repeating filter works correctly', async ({ page }) => {
    await page.getByText('repeating 2').click();

    await expect(page.getByLabel('repeating 2')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(2);
    await expect(page.getByText(/Task 4/)).toBeVisible();
    await expect(page.getByText(/Task 9/)).toBeVisible();
    await expect(
      page.getByText('There are no repeating tasks now')
    ).not.toBeVisible();
  });

  test('favorites filter works correctly', async ({ page }) => {
    await page.getByText('favorites 1').click();

    await expect(page.getByLabel('favorites 1')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(1);
    await expect(page.getByText(/Task 3/)).toBeVisible();
    await expect(
      page.getByText('There are no favorite tasks now')
    ).not.toBeVisible();
  });

  test('archive filter works correctly', async ({ page }) => {
    await page.getByText('archive 1').click();

    await expect(page.getByLabel('archive 1')).toBeChecked;
    await expect(page.getByTestId('task-card')).toHaveCount(1);
    await expect(page.getByText(/Task 2/)).toBeVisible();
    await expect(
      page.getByText('There are no archived tasks now')
    ).not.toBeVisible();
  });

  test('filter is dropped if the add new task button was clicked', async ({
    page,
  }) => {
    await page.getByText('repeating 2').click();
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();

    await expect(page.getByLabel('all 9')).toBeChecked;
  });

  test('filter is not dropped if the sorting was changed', async ({ page }) => {
    await page.getByText('repeating 2').click();
    await page.getByText('SORT BY DATE down').click();

    await expect(page.getByLabel('all 9')).not.toBeChecked;
  });

  test('message is shown if there are no archive tasks', async ({ page }) => {
    await page.getByText('archive 1').click();
    await deleteCards(page);

    await expect(
      page.getByText('There are no archived tasks now')
    ).toBeVisible();
    await expect(page.getByLabel('archive 0')).toBeDisabled();
  });

  test('message is shown if there are no favorite tasks', async ({ page }) => {
    await page.getByText('favorites 1').click();
    await deleteCards(page);

    await expect(
      page.getByText('There are no favorite tasks now')
    ).toBeVisible();
    await expect(page.getByLabel('favorites 0')).toBeDisabled();
  });

  test('message is shown if there are no repeating tasks', async ({ page }) => {
    await page.getByText('repeating 2').click();
    await deleteCards(page);

    await expect(
      page.getByText('There are no repeating tasks now')
    ).toBeVisible();
    await expect(page.getByLabel('repeating 0')).toBeDisabled();
  });

  test('message is shown if there are no today tasks', async ({ page }) => {
    await page.getByText('today 1').click();
    await deleteCards(page);

    await expect(page.getByText('There are no tasks today')).toBeVisible();
    await expect(page.getByLabel('today 0')).toBeDisabled();
  });

  test('message is shown if there are no overdue tasks', async ({ page }) => {
    await page.getByText('overdue 2').click();
    await deleteCards(page);

    await expect(
      page.getByText('There are no overdue tasks now')
    ).toBeVisible();
    await expect(page.getByLabel('overdue 0')).toBeDisabled();
  });

  test('message is shown if there are no tasks', async ({ page }) => {
    await deleteCards(page);

    await expect(
      page.getByText('Click «ADD NEW TASK» in menu to create your first task')
    ).toBeVisible();
    await expect(page.getByLabel('all 0')).toBeDisabled();
  });
});

test.describe('Filter empty tasks', () => {
  test.beforeEach(async ({ page }) => {
    mockAPI(page, true);
    await page.goto('http://localhost:5173/');
  });

  test('filter is disabled if there are no tasks', async ({ page }) => {
    await expect(page.getByLabel('all 0')).toBeDisabled();
    await expect(page.getByLabel('overdue 0')).toBeDisabled();
    await expect(page.getByLabel('today 0')).toBeDisabled();
    await expect(page.getByLabel('repeating 0')).toBeDisabled();
    await expect(page.getByLabel('favorites 0')).toBeDisabled();
    await expect(page.getByLabel('archive 0')).toBeDisabled();
  });
});
