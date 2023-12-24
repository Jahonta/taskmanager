import { type Page } from '@playwright/test';

export async function deleteCards(page: Page) {
  // Without timeout load more button can be not visible =(
  // TODO: find better solution
  await page.waitForTimeout(100);

  while (await page.getByText('load more').isVisible()) {
    await page.getByText('load more').click();
  }

  let cardCount = await page.getByTestId('task-card').count();
  while (cardCount > 0) {
    await page
      .getByTestId('task-card')
      .first()
      .getByRole('button', { name: 'edit' })
      .click();
    await page.getByRole('button', { name: 'delete' }).click();
    cardCount--;
  }
}
