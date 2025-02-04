import { test, expect } from '../../../../tests/utils/_astro-fixtures'

test.describe('Textarea', () => {
    test('it renders error text', async ({ page }) => {
        const template = `<rux-textarea error-text="Error Text"></rux-textarea>`
        await page.setContent(template)
        const el = await page.locator('rux-textarea')
        await expect(el).toHaveAttribute('error-text', 'Error Text')
    })
    test('it renders help text', async ({ page }) => {
        const template = `<rux-textarea help-text="Help Text"></rux-textarea>`
        await page.setContent(template)
        const el = await page.locator('rux-textarea')
        await expect(el).toHaveAttribute('help-text', 'Help Text')
    })
    test('it renders error text over help text if both are provided', async ({
        page,
    }) => {
        const template = `<rux-textarea help-text="Help Text" error-text="Error Text"></rux-textarea>`
        await page.setContent(template)
        const el = await page.locator('rux-textarea')
        await expect(el.locator('.rux-error-text')).toHaveText('Error Text')
    })
})
test.describe('Textarea in a form', () => {
    test.beforeEach(async ({ page }) => {
        const template = `
            <div>
                <form id="form">
                    <rux-textarea
                        id="textarea1"
                        name="test1"
                        value=""
                    ></rux-textarea>
                    <br />
                    <rux-textarea
                        id="disTextArea"
                        name="disTextArea"
                        value="Disabled"
                        disabled
                    ></rux-textarea>
                    <button id="formSubmitBtn" type="submit">submit</button>
                </form>
                <ul id="log"></ul>
            </div>
        `
        await page.setContent(template)
        await page.addScriptTag({ path: './tests/utils/formScript.js' })
    })
    test('it submits the correct value', async ({ page }) => {
        const el = page.locator('form > #textarea1')
        const submit = page.locator('form > #formSubmitBtn')
        const log = page.locator('#log')
        await el
            .locator('textarea')
            .type('TextArea Testing Time', { delay: 50 })
        await submit.click()

        await expect(log).toContainText('test1:TextArea Testing Time')
    })
    test('it does not submit a value if disabled', async ({ page }) => {
        const submit = page.locator('form > #formSubmitBtn')
        const log = page.locator('#log')
        await submit.click()
        await expect(log).not.toContainText('Disabled')
    })
    test('it renders label prop', async ({ page }) => {
        const template = `
            <rux-textarea label="hello"></rux-textarea>
        `
        await page.setContent(template)
        const el = await page.locator('rux-textarea')
        const label = el.locator('label')

        await expect(label).toHaveClass('rux-textarea-label')
    })
    test('it renders label slot', async ({ page }) => {
        const template = `
            <rux-textarea><div slot="label">hello</div></rux-textarea>
        `
        await page.setContent(template)
        const el = await page.locator('rux-textarea')
        const label = el.locator('label')

        await expect(label).toHaveClass('rux-textarea-label')
    })
})
test.describe('Textarea events', () => {
    test.beforeEach(async ({ page }) => {
        const template = `
            <rux-textarea></rux-textarea>
            <div id="blur" style="width: 100px height: 100px;">Blur</div>
        `
        await page.setContent(template)
    })
    test('it emits ruxinput event', async ({ page }) => {
        const textarea = page
            .locator('rux-textarea')
            .locator('textarea')
            .first()
        const inputEvent = await page.spyOnEvent('ruxinput')
        await textarea.type('Hello', { delay: 100 })
        expect(inputEvent).toHaveReceivedEventTimes(5)
    })
    test('it emits ruxchange event', async ({ page }) => {
        const textarea = page
            .locator('rux-textarea')
            .locator('textarea')
            .first()
        const changeEvent = await page.spyOnEvent('ruxchange')
        const div = page.locator('#blur')
        await textarea.type('Hello')
        await div.click()
        expect(changeEvent).toHaveReceivedEventTimes(1)
    })
    test('it emits ruxblur event', async ({ page }) => {
        const textarea = page
            .locator('rux-textarea')
            .locator('textarea')
            .first()
        const blurEvent = await page.spyOnEvent('ruxblur')
        const div = page.locator('#blur')
        await textarea.click()
        await div.click()
        expect(blurEvent).toHaveReceivedEventTimes(1)
    })
})
