import { test, expect } from '../../../../../tests/utils/_astro-fixtures'

test.describe('Table', () => {
    test('has no visual regression @vrt', async ({ page }) => {
        await page.goto(`/src/components/rux-table/test/basic/index.html`)
        await expect(page).toHaveScreenshot()
    })
})
