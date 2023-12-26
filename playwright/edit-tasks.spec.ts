import { test, expect } from '@playwright/test';

import { mockAPI } from './mocks/api';

test.describe('Edit tasks', () => {
  test.beforeEach(async ({ page }) => {
    await mockAPI(page);
    await page.goto('http://localhost:5173/');
  });

  test('edit form is shown when edit button is clicked', async ({ page }) => {
    const firstTaskCard = page.getByTestId('task-card').first();

    await firstTaskCard.getByRole('button', { name: 'edit' }).click();

    const taskform = page.getByTestId('task-form');
    await expect(taskform).toBeVisible();
    await expect(taskform).toHaveText(/Task 1/);
    await expect(firstTaskCard).not.toHaveText(/Task 1/);
  });

  test('only one form is shown at the same time', async ({ page }) => {
    await page
      .getByTestId('task-card')
      .first()
      .getByRole('button', { name: 'edit' })
      .click();
    await page
      .getByTestId('task-card')
      .last()
      .getByRole('button', { name: 'edit' })
      .click();

    const taskForm = page.getByTestId('task-form');
    await expect(taskForm).toHaveCount(1);
    await expect(taskForm).toHaveText(/Task 9/);
  });

  test('edit form is hidden when ESC is pressed', async ({ page }) => {
    await page
      .getByTestId('task-card')
      .first()
      .getByRole('button', { name: 'edit' })
      .click();
    await page.keyboard.press('Escape');

    await expect(page.getByTestId('task-form')).not.toBeVisible();
  });

  test('edit form is hidden when Add new task button is clicked', async ({
    page,
  }) => {
    const firstTaskCard = page.getByTestId('task-card').first();

    await firstTaskCard.getByRole('button', { name: 'edit' }).click();
    await page.getByRole('button', { name: 'ADD NEW TASK' }).click();

    await expect(firstTaskCard).toHaveText(/Task 1/);
    await expect(page.getByTestId('task-form')).not.toHaveText(/Task 1/);
  });

  test("shown tasks count isn't dropped if task is being edited", async ({
    page,
  }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    await page.getByText('load more').click();
    firstTaskCard
      .getByRole('button', {
        name: 'favorites',
      })
      .click();
    await firstTaskCard.getByRole('button', { name: 'edit' }).click();

    await expect(page.getByTestId('task-form')).toHaveCount(1);
    await expect(page.getByTestId('task-card')).toHaveCount(8);
  });

  test('task is added and removed from favorites when favorites button is clicked', async ({
    page,
  }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    const favoritesButton = await firstTaskCard.getByRole('button', {
      name: 'favorites',
    });

    await favoritesButton.click();
    await expect(favoritesButton).toHaveClass(/card__btn--disabled/);

    await page.getByText('favorites 2').click();
    await expect(firstTaskCard).toHaveText(/Task 1/);

    await favoritesButton.click();
    await page.getByText('all 9').click();
    await expect(firstTaskCard).toHaveText(/Task 1/);
    await expect(favoritesButton).not.toHaveClass(/card__btn--disabled/);
  });

  test('task is added and removed from archive when archive button is clicked', async ({
    page,
  }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    const archiveButton = await firstTaskCard.getByRole('button', {
      name: 'archive',
    });

    await archiveButton.click();
    await expect(firstTaskCard).not.toHaveText(/Task 1/);

    await page.getByText('archive 2').click();
    await expect(firstTaskCard).toHaveText(/Task 1/);
    await expect(archiveButton).toHaveClass(/card__btn--disabled/);

    await archiveButton.click();
    await page.getByText('all 9').click();
    await expect(firstTaskCard).toHaveText(/Task 1/);
    await expect(archiveButton).not.toHaveClass(/card__btn--disabled/);
  });

  test('task can be edited via form', async ({ page }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    await firstTaskCard
      .getByRole('button', {
        name: 'edit',
      })
      .click();

    const editForm = page.getByTestId('task-form');

    await editForm
      .getByPlaceholder('Start typing your text here...')
      .fill('Task 1 edited');
    await editForm.getByRole('button', { name: 'repeat: no' }).click();
    await editForm.getByText('we').click();
    await editForm
      .locator('div')
      .filter({ hasText: /^Color$/ })
      .locator('label')
      .nth(2)
      .click();
    await editForm.getByRole('button', { name: 'save' }).click();

    await expect(firstTaskCard).toHaveText(/Task 1 edited/);
    await expect(firstTaskCard).toHaveClass(/card--repeat/);
    await expect(firstTaskCard).toHaveClass(/card--blue/);

    await page.getByText('repeating 3').click();
    await expect(firstTaskCard).toHaveText(/Task 1 edited/);
  });

  test("task can't be submitted with invalid data", async ({ page }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    await firstTaskCard
      .getByRole('button', {
        name: 'edit',
      })
      .click();

    const editForm = page.getByTestId('task-form');
    const saveButton = editForm.getByRole('button', { name: 'save' });
    const textarea = editForm.getByPlaceholder(
      'Start typing your text here...'
    );

    await textarea.fill('');
    await expect(saveButton).toBeDisabled();
    await textarea.fill('test');
    await expect(saveButton).not.toBeDisabled();

    await editForm.getByRole('button', { name: 'repeat: no' }).click();
    await expect(saveButton).toBeDisabled();
    await editForm.getByRole('button', { name: 'repeat: yes' }).click();
    await expect(saveButton).not.toBeDisabled();

    await editForm.getByRole('button', { name: 'date: no' }).click();
    await expect(saveButton).toBeDisabled();
    await editForm.getByRole('button', { name: 'date: yes' }).click();
    await expect(saveButton).not.toBeDisabled();
  });

  test("data isn't changed if editing was canceled", async ({ page }) => {
    const firstTaskCard = page.getByTestId('task-card').first();
    const editButton = await firstTaskCard.getByRole('button', {
      name: 'edit',
    });

    await editButton.click();

    const editForm = page.getByTestId('task-form');
    const repeatingButton = editForm.getByRole('button', {
      name: 'repeat: no',
    });

    await editForm
      .getByPlaceholder('Start typing your text here...')
      .fill('Task 1 edited');
    await repeatingButton.click();
    await editForm.getByText('we').click();
    await editForm
      .locator('div')
      .filter({ hasText: /^Color$/ })
      .locator('label')
      .nth(2)
      .click();
    await page.keyboard.press('Escape');

    await expect(firstTaskCard).toHaveText(/Task 1/);
    await expect(firstTaskCard).not.toHaveClass(/card--repeat/);
    await expect(firstTaskCard).not.toHaveClass(/card--blue/);
    await expect(firstTaskCard).toHaveClass(/card--yellow/);

    await editButton.click();

    await expect(editForm).not.toHaveText(/Task 1 edited/);
    await expect(repeatingButton).toBeVisible();
    await expect(editForm).not.toHaveClass(/card--repeat/);
    await expect(editForm).not.toHaveClass(/card--blue/);
    await expect(editForm).toHaveClass(/card--yellow/);
  });
});
