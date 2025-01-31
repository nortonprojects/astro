// import { test as base } from '@playwright/test'
import { test as base } from "@astrouxds/stencil-playwright";
import { AstroComponentPage } from './AstroComponentPage'
import { AstroFormPage } from './AstroFormPage'
import { AstroVRTPage } from './AstroVRTPage'

type AstroFixtures = {
    astroPage: AstroComponentPage,
	astroFormPage: AstroFormPage,
    astroVRTPage: AstroVRTPage
}

export const test = base.extend<AstroFixtures>({
    astroVRTPage: async ({ page }, use) => {
        // Set up the fixture.
        const astroPage = new AstroVRTPage(page)
        // await astroPage.goto()

        // Use the fixture value in the test.
        await use(astroPage)

        // Clean up the fixture.
        //   await todoPage.removeAll();
    },
    astroPage: async ({ page }, use) => {
        // Set up the fixture.
        const astroPage = new AstroComponentPage(page)
        await astroPage.goto()

        // Use the fixture value in the test.
        await use(astroPage)

        // Clean up the fixture.
        //   await todoPage.removeAll();
    },
	astroFormPage: async ({ page }, use) => {
        // Set up the fixture.
        const astroPage = new AstroFormPage(page)
        await astroPage.goto()

        // Use the fixture value in the test.
        await use(astroPage)

        // Clean up the fixture.
        //   await todoPage.removeAll();
    }
})
export { expect } from '@playwright/test'
