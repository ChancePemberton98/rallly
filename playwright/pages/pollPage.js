import { test, expect } from '@playwright/test';

class PollPage {

    constructor(page) {
        this._page = page;
        this._btnCloseSharePrompt = "//span[text()='Close']/parent::button";
        this._btnManage = "//button[text()='Manage']";
        this._btnDelete = "//div[text()='Delete']";
        this._btnDeletePoll = "//button[text()='Delete']";
        this._btnAddParticipant = "button[data-testid='add-participant-button']";
        this._btnContinueParticipant = "//button[text()='Continue']";
        this._txtboxNameParticipant = page.locator("input[name='name']");
        this._txtboxEmailParticipant = page.locator("input[name='email']"); //Not using this to prevent email spam
        this._btnSubmitParticipant = "//button[text()='Submit']";
        this._btnOpenParticipantOption = "button[data-testid='participant-menu']";
        this._btnDeleteParticipant = "//div[text()='Delete']";
        this._btnDeleteParticipantConfirm = "//button[text()='Delete']";
        this._txtPollTitle = "h1[data-testid='poll-title']";
        this._txtParticipantName = "div[text()='{name}']";
        this._btnComment = "//button[text()='Leave a comment on this poll (visible to everyone)']";
        this._txtboxComment = page.locator("textarea[id='comment']");
        this._txtboxName = page.locator("input[name='authorName']");
        this._btnAddComment = "//button[text()='Add Comment']";
        this._btnExpandComment = "//div[@data-testid='comment']//button";
        this._btnDeleteComment = "//div[text()='Delete']";
        this._txtComment = page.locator("div[data-testid='comment']");
        this._txtCommentsDisabled = page.locator("//p[text()='Comments have been disabled']");
    }

    //////////////////////////////////////////////////USER ACTIONS////////////////////////////////////////////////////////

    async clickCloseSharePrompt(username, password) {
        await this._page.click(this._btnCloseSharePrompt);
    }

    async clickManageButton() {
        await this._page.click(this._btnManage);
    }

    async clickDeleteButton() {
        await this._page.click(this._btnDelete);
    }

    async clickDeletePollButton() {
        await this._page.click(this._btnDeletePoll);
    }

    async clickAddParticipantButton() {
        await this._page.click(this._btnAddParticipant);
    }

    async clickContinueParticipantButton() {
        await this._page.click(this._btnContinueParticipant);
    }

    async setNameParticipantTextbox(name) {
        await this._txtboxNameParticipant.fill(name);

    }

    async setEmailParticipantTextbox(email) {
        //Not creating this to avoid spam emails
    }

    async clickSubmitParticipantButton() {
        await this._page.click(this._btnSubmitParticipant);
    }

    async clickOpenParticipantOptions() {
        await this._page.click(this._btnOpenParticipantOption);
    }

    async clickDeleteParticipant() {
        await this._page.click(this._btnDeleteParticipant);
    }

    async clickDeleteParticipantConfirm() {
        await this._page.click(this._btnDeleteParticipantConfirm);
    }

    async clickCommentButton() {
        await this._page.click(this._btnComment);
    }

    async setComment(comment) {
        await this._txtboxComment.fill(comment);

    }

    async setCommentName(name) {
        await this._txtboxName.fill(name);
    }

    async verifyPollTitle(title) {
        await expect(this._txtPollTitle).toHaveText(title)
    }

    async verifyPollLocation(location) {
        //No good element to validate this
    }

    async verifyPollDescription(description) {
        //No good element to validate this
    }

    //Would implement this later
    async verifyParticipant(name) {
        //await expect(this.locator(_txtParticipantName.replace("{name}", name))).toHaveCount(0)
    }

    async verifyComment() {
        //Would implement this in the future
    }

    async clickAddCommentButton() {
        await this._page.click(this._btnAddComment);
    }

    async clickExpandComment() {
        await this._page.click(this._btnExpandComment);
    }

    async clickDeleteComment() {
        await this._page.click(this._btnDeleteComment);
    }

    async validateCommentExists() {
        await expect(this._txtComment).toBeVisible();
    }

    async validateCommentDoesntExist() {
        await expect(this._txtComment).toHaveCount(0);
    }

    async validateCommentsDisabled() {
        await expect(this._txtCommentsDisabled).toBeVisible();
    }

    //////////////////////////////////////////////////USER FLOWS////////////////////////////////////////////////////////

    //Deletes an existing poll
    async deletePoll() {
        await this.clickManageButton();
        await this.clickDeleteButton();
        await this.clickDeletePollButton();
    }

    //Adds a participant to an existing poll
    async addParticipant(name) {
        await this.clickAddParticipantButton();
        await this.clickContinueParticipantButton();
        await this.setNameParticipantTextbox(name);
        await this.clickSubmitParticipantButton();
        //await this.verifyParticipant(name);
    }

    //Would love to build this out more to be able to delete a participant based on their name
    async deleteParticipant() {
        await this.clickOpenParticipantOptions();
        await this.clickDeleteParticipant();
        await this.clickDeleteParticipantConfirm();
    }

    async addComment(comment, name) {
        await this.clickCommentButton();
        await this.setComment(comment);
        await this.setCommentName(name);
        await this.clickAddCommentButton();
        await this.verifyComment();
        await this.validateCommentExists();
    }

    async deleteComment() {
        await this.clickExpandComment();
        await this.clickDeleteComment();
        await this.validateCommentDoesntExist();
    }

}
module.exports = PollPage