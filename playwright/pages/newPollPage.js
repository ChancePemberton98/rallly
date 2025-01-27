import { test, expect } from '@playwright/test';

class NewPollPage {

    constructor(page) {
        this._page = page;
        this._txtboxTitle = page.locator("input[id='title']");
        this._txtboxLocation = page.locator("input[id='location']");
        this._txtboxDescription = page.locator("textarea[id='description']");
        this._btnCreatePoll = "//button[text()='Create poll']";
        this._btnDate15 = "//span[text()='15']/parent::button";
        this._btnDate28 = "//span[text()='28']/parent::button";
        this._btnSpecifyTimes = "button[data-testid='specify-times-switch']";

        this._btnDisableComments = "button[id='disableComments']";

        this._txtTitleError = page.locator("//p[text()='“Title” is required']");
        this._txtDateError = page.locator("//p[contains(text(), 'Add at least one option to continue.')]");
    }


    //////////////////////////////////////////////////USER ACTIONS////////////////////////////////////////////////////////

    async setEventTitle(title) {
        await this._txtboxTitle.fill(title);
    }

    async setEventLocation(location) {
        await this._txtboxLocation.fill(location);
    }

    async setEventDescription(description) {
        await this._txtboxDescription.fill(description);
    }

    async specifyTime() {
        await this._page._btnSpecifyTimes.click();
    }

    async clickCreatePoll() {
        await this._page._btnCreatePoll.click();
    }

    async validateTitleError() {
        await expect(this._txtTitleError).toBeVisible();
    }

    async validateDateError() {
        await expect(this._txtDateError).toBeVisible();
    }

    async clickDate15() {
        await this._page.click(this._btnDate15);
    }

    async clickDate28() {
        await this._page.click(this._btnDate28);
    }

    async clickCreatePoll() {
        await this._page.click(this._btnCreatePoll);
    }

    async clickDisableCommentsButton() {
        await this._page.click(this._btnDisableComments);
    }


    //////////////////////////////////////////////////USER FLOWS////////////////////////////////////////////////////////


    async createPollNegative() {
        await this.clickCreatePoll();
        await this.validateTitleError();
        await this.validateDateError();
    }

    async createPollAllOptions(title, location, description) {
        await this.setEventTitle(title);
        await this.setEventLocation(location);
        await this.setEventDescription(description);
        await this.clickDate15();
        await this.clickCreatePoll();
    }

    async createPollWithoutLocation(title, description) {
        await this.setEventTitle(title);
        await this.setEventDescription(description);
        await this.clickDate15();
        await this.clickCreatePoll();
    }

    async createPollWithoutDescription(title, location) {
        await this.setEventTitle(title);
        await this.setEventLocation(location);
        await this.clickDate15();
        await this.clickCreatePoll();
    }

    async createPollOnlyTitle(title) {
        await this.setEventTitle(title);
        await this.clickDate15();
        await this.clickCreatePoll();
    }

    async createPollDisableComments(title) {
        await this.setEventTitle(title);
        await this.clickDate15();
        await this.clickDisableCommentsButton();
        await this.clickCreatePoll();
    }

    //Would implement in the future
    async createPollWithMultipleDates() {
        await this.setEventTitle();
        await this.setEventLocation();
        await this.setEventDescription();
        await this.clickDate15();
        await this.clickDate28();
        await this.clickCreatePoll();
    }

}
module.exports = NewPollPage