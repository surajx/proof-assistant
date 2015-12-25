# Development Environment Setup

> I wanted to do a cross-platform work-flow with docker or vagrant, but that takes some setting up, especially since we have windows involved as a development platform. Let's first get the ball rolling and then worry about optimizations.

* Install LTS version (4.2.4) of [node.js](https://nodejs.org/en/download/)
* Install Current Stable release (3.2.0) of [mongodb](https://www.mongodb.org/downloads#production)
* Open a new terminal and Clone the repository from CECS GitLab
  - `git@gitlab.cecs.anu.edu.au:surajx/proof-assistant.git`
* The following commands in the terminal(command prompt)
  - `npm install -g gulp`
  - `npm install -g nodemon`
* Navigate into the cloned repository and run the following command
  - `npm install`
* Make sure that you are in the repository root and run the following command
  - `gulp`
* Launch a browser and navigate to `localhost:3000` you should be seeing a login page.

# Development Work-Flow

> To minimize setup overhead and to still adhere to a fair amount of SCM etiquettes, I propose the following dev work-flow.

* No pushing code to master branch.
* Developers are to checkout a new git branch code in that branch and push the branch to the repository
* Once you have completed a feature and unit-tested your code, create a pull-request in the GitLab repository and tag one of your peers for code-review. 
* Once the code has been reviewed, the code is merged into master and deployed to the staging server( which is yet to be setup ).
