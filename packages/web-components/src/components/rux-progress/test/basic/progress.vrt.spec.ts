import { test, expect } from '../../../../../tests/utils/_astro-fixtures'

test.describe('Progress', () => {
    test('has no visual regression @vrt', async ({ page }) => {
        await page.goto(`/src/components/rux-progress/test/basic/index.html`)
        await expect(page).toHaveScreenshot()
    })
})
