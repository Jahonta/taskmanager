import { test, expect } from '@playwright/test';

import { mockAPI } from './mocks/api';

test.describe('Create task', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page);
    await page.goto('http://localhost:5173/');
  });

  test('create form is shown when add new task button is clicked', async ({
    page,
  }) => {
    const addNewTaskButton = page.getByRole('button', { name: 'ADD NEW TASK' });
    await addNewTaskButton.click();

    await expect(addNewTaskButton).toBeDisabled();

    const taskform = page.getByTestId('task-form');
    await expect(taskform).not.toHaveClass(/card--repeat/);
    await expect(taskform).toHaveClass(/card--black/);
    await expect(taskform).toBeVisible();
    await expect(
      taskform.getByPlaceholder('Start typing your text here...')
    ).toHaveValue('');
    await expect(
      taskform.getByRole('button', {
        name: 'repeat: no',
      })
    ).toBeVisible();
    await expect(
      taskform.getByRole('button', { name: 'date: no' })
    ).toBeVisible();
  });

  test('create form is hidden if the edit button was clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();
    await page
      .getByTestId('task-card')
      .first()
      .getByRole('button', { name: 'edit' })
      .click();

    const taskForm = page.getByTestId('task-form');
    await expect(taskForm).toHaveCount(1);
    await expect(taskForm).toHaveText(/Task 1/);
  });

  test('create form is hidden if ESC was pressed', async ({ page }) => {
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();
    await page.keyboard.press('Escape');

    await expect(page.getByTestId('task-form')).not.toBeVisible();
  });

  test('create form is hidden if cancel button was clicked', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();
    await page
      .getByTestId('task-form')
      .getByRole('button', { name: 'cancel' })
      .click();

    await expect(page.getByTestId('task-form')).not.toBeVisible();
  });

  test('new task can be created via form', async ({ page }) => {
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();

    const taskForm = page.getByTestId('task-form');

    await taskForm
      .getByPlaceholder('Start typing your text here...')
      .fill('New Task');
    await taskForm.getByRole('button', { name: 'repeat: no' }).click();
    await taskForm.getByText('we').click();
    await taskForm
      .locator('div')
      .filter({ hasText: /^Color$/ })
      .locator('label')
      .nth(2)
      .click();
    await taskForm.getByRole('button', { name: 'save' }).click();

    const firstTaskCard = page.getByTestId('task-card').first();
    await expect(firstTaskCard).toHaveText(/New Task/);
    await expect(firstTaskCard).toHaveClass(/card--repeat/);
    await expect(firstTaskCard).toHaveClass(/card--blue/);

    await page.getByText('repeating 3').click();
    await expect(firstTaskCard).toHaveText(/New Task/);
  });

  test("task can't be created with invalid data", async ({ page }) => {
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();

    const taskForm = page.getByTestId('task-form');
    const saveButton = taskForm.getByRole('button', { name: 'save' });
    const textarea = taskForm.getByPlaceholder(
      'Start typing your text here...'
    );

    await textarea.fill('');
    await expect(saveButton).toBeDisabled();
    await textarea.fill('test');
    await expect(saveButton).not.toBeDisabled();

    await taskForm.getByRole('button', { name: 'repeat: no' }).click();
    await expect(saveButton).toBeDisabled();
    await taskForm.getByRole('button', { name: 'repeat: yes' }).click();
    await expect(saveButton).not.toBeDisabled();

    await taskForm.getByRole('button', { name: 'date: no' }).click();
    await expect(saveButton).toBeDisabled();
    await taskForm.getByRole('button', { name: 'date: yes' }).click();
    await expect(saveButton).not.toBeDisabled();
  });

  test("task isn't created if creation was canceled", async ({ page }) => {
    const addNewTaskButton = page.getByRole('button', {
      name: 'ADD NEW TASK',
    });
    await addNewTaskButton.click();

    const taskForm = page.getByTestId('task-form');
    const repeatingButton = taskForm.getByRole('button', {
      name: 'repeat: no',
    });

    await taskForm
      .getByPlaceholder('Start typing your text here...')
      .fill('New Task');
    await repeatingButton.click();
    await taskForm.getByText('we').click();
    await taskForm
      .locator('div')
      .filter({ hasText: /^Color$/ })
      .locator('label')
      .nth(2)
      .click();
    await page.keyboard.press('Escape');

    await expect(page.getByTestId('task-card').first()).not.toHaveText(
      /New Task/
    );

    await addNewTaskButton.click();

    await expect(taskForm).not.toHaveText(/New Task/);
    await expect(repeatingButton).toBeVisible();
    await expect(taskForm).not.toHaveClass(/card--repeat/);
    await expect(taskForm).not.toHaveClass(/card--blue/);
  });
});

test.describe('Create task (empty)', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page, true);
    await page.goto('http://localhost:5173/');
  });

  test('message is shown again if creation was canceled', async ({ page }) => {
    const addNewTaskButton = page.getByRole('button', { name: 'ADD NEW TASK' });
    await addNewTaskButton.click();

    const taskForm = page.getByTestId('task-form');
    const sortingButton = page.getByRole('link', { name: 'SORT BY DEFAULT' });
    await expect(taskForm).toBeVisible();
    await expect(sortingButton).toBeVisible();
    await expect(
      page.getByText('Click «ADD NEW TASK» in menu to create your first task')
    ).not.toBeVisible();

    await page.keyboard.press('Escape');

    await expect(taskForm).not.toBeVisible();
    await expect(
      page.getByText('Click «ADD NEW TASK» in menu to create your first task')
    ).toBeVisible();
    await expect(sortingButton).not.toBeVisible();
  });
});
