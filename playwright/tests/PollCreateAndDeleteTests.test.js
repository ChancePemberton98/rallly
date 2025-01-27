import { test, expect } from '@playwright/test';
const Login = require("../pages/loginPage");
const NewPoll = require("../pages/newPollPage");
const Poll = require("../pages/pollPage");

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test('Create and Delete Poll with Location & Description', async ({ page }) => {
  const login = new Login(page);
  const newPoll = new NewPoll(page);
  const poll = new Poll(page);
  const date = new Date();
  const title = "Title Test " + date;
  const location = "Location Test";
  const description = "Description Test";

  await login.clickCreateGroupPoll();
  await newPoll.createPollNegative();
  await newPoll.createPollAllOptions(title, location, description);
  await poll.clickCloseSharePrompt()
  await poll.deletePoll();
  await login.verifyCreateGroupPollExists();
});

test('Create and Delete Poll with Location', async ({ page }) => {
  const login = new Login(page);
  const newPoll = new NewPoll(page);
  const poll = new Poll(page);
  const date = new Date();
  const title = "Title Test " + date;
  const description = "Description Test";

  await login.clickCreateGroupPoll();
  await newPoll.createPollNegative();
  await newPoll.createPollWithoutLocation(title, description);
  await poll.clickCloseSharePrompt()
  await poll.deletePoll();
  await login.verifyCreateGroupPollExists();
});

test('Create and Delete Poll with Description', async ({ page }) => {
  const login = new Login(page);
  const newPoll = new NewPoll(page);
  const poll = new Poll(page);
  const date = new Date();
  const title = "Title Test " + date;
  const description = "Description Test";

  await login.clickCreateGroupPoll();
  await newPoll.createPollNegative();
  await newPoll.createPollWithoutLocation(title, description);
  await poll.clickCloseSharePrompt()
  await poll.deletePoll();
  await login.verifyCreateGroupPollExists();
});

test('Create and Delete Poll with Only Title', async ({ page }) => {
  const login = new Login(page);
  const newPoll = new NewPoll(page);
  const poll = new Poll(page);
  const date = new Date();
  const title = "Title Test " + date;

  await login.clickCreateGroupPoll();
  await newPoll.createPollOnlyTitle(title);
  await poll.clickCloseSharePrompt()
  await poll.deletePoll();
  await login.verifyCreateGroupPollExists();
});
