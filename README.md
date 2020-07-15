This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Grid Task Project
This Grid Task Project was created as a technical task.  
Author: Tamas Hortobagyi  
URL: https://gridtask.imfast.io/  
Github: https://github.com/hortom/grid-task  

## Description
Create a grid of 50x50. When you click on a cell, all values in the cells in the same row and column are increased by 1 or, if a cell was empty, it will get a value of 1. After each change a cell will briefly turn yellow. If 5 consecutive numbers in the Fibonacci sequence are next to each other, these cells will briefly turn green and will be cleared.

## Implementation details
For the implementation, I used [TypeScript](https://www.typescriptlang.org/) and [React](https://reactjs.org).

To Install all dependency, please run `npm install` or `yarn install`.

There is a config.ts file to configure the grid size and the behavior:
* `GRID_SIZE`: The size of the grid.
* `CONSECUTIVE_COUNT`: How many consecutive numbers should be found.
* `ONLY_SORTED_NUMBERS`: Only consecutive AND sorted numbers are allowed. If this is `false` then the numbers shouldn't be in order. E.g. [3, 5, 2, 1, 8] will be accepted too.

During the implementation, I tried to avoid unnecessary re-rendering and using CSS animation, that is why `shouldComponentUpdate()` and `key` property are used. 
In React, to restart a CSS animation can be achieved with using different `key` property per animation. In this way, the animation is triggered every time a user clicks on a cell regardless of the frequency of the clicks - all click will initiate a flashing animation.

The main Cell component and `.ts` files with logic have tests. For the "how to run the tests", please see blow.

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br />

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
