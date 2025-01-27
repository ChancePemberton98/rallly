import { test, expect } from '@playwright/test';
const Login = require("../pages/loginPage");
const NewPoll = require("../pages/newPollPage");
const Poll = require("../pages/pollPage");

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('Add and Delete Comment', async ({ page }) => {
    const login = new Login(page);
    const newPoll = new NewPoll(page);
    const poll = new Poll(page);
    const date = new Date();
    const title = "Poll Test " + date;
    const name = "Test Name";
    const comment = "Test Comment";


    await login.clickCreateGroupPoll();
    await newPoll.createPollOnlyTitle(title);
    await poll.clickCloseSharePrompt();
    await poll.addComment(comment, name);
    await poll.deleteComment();
    await poll.deletePoll();
});


test('Create Poll With Disabled Comments', async ({ page }) => {
    const login = new Login(page);
    const newPoll = new NewPoll(page);
    const poll = new Poll(page);
    const date = new Date();
    const title = "Poll Test " + date;
    const name = "Test Name";
    const comment = "Test Comment";


    await login.clickCreateGroupPoll();
    await newPoll.createPollDisableComments(title);
    await poll.clickCloseSharePrompt();
    await poll.validateCommentsDisabled();
    await poll.deletePoll();
});
