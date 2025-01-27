import { test, expect } from '@playwright/test';
const Login = require("../pages/loginPage");
const NewPoll = require("../pages/newPollPage");
const Poll = require("../pages/pollPage");

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
});

test('Add and Delete Participant', async ({ page }) => {
    const login = new Login(page);
    const newPoll = new NewPoll(page);
    const poll = new Poll(page);
    const date = new Date();
    const title = "Poll Test " + date;
    const name = "Test Name";


    await login.clickCreateGroupPoll();
    await newPoll.createPollOnlyTitle(title);
    await poll.clickCloseSharePrompt();
    await poll.addParticipant(name);
    await poll.deleteParticipant();
    await poll.deletePoll();
});
