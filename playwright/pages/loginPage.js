import { test, expect } from '@playwright/test';

class LoginPage {

    constructor(page) {
        this._page = page;
        this._btnCreatePoll = page.locator("a[href='/new']");
    }

    //////////////////////////////////////////////////USER ACTIONS////////////////////////////////////////////////////////


    async clickCreateGroupPoll(username, password) {
        await this._btnCreatePoll.click();
    }

    //////////////////////////////////////////////////USER FLOWS////////////////////////////////////////////////////////

    async verifyCreateGroupPollExists() {
        await expect(this._btnCreatePoll).toBeVisible();;
    }

}
module.exports = LoginPage