# DemoQA Project

## Description
This is a demo project that automates testing for the [DemoQA](https://demoqa.com) website using Playwright with TypeScript. 

Built with https://playwright.dev/docs/intro

## Cloning git repository

`git clone https://github.com/Anjic93/DemoQA-Playwright.git`

## Updating node dependencies and playwright after cloning

`npm i --save-dev @types/node`

`npm install -D @playwright/test@latest`

`npx playwright install --with-deps`

## Run tests

`npm run test1` for a headed view of the tests

`npm run test2` for a headless view of the tests

### Commit to 'master' branch

To initiate the CI/CD pipeline and deploy changes to the server, simply commit your changes to the `master` branch. The pipeline will be automatically triggered, and your updates will be deployed to our development (currently the only one) environment.