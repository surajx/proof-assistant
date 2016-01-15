# Development Environment Setup

> I wanted to do a cross-platform work-flow with docker or vagrant, but that 
takes some setting up, especially since we have windows involved as a 
development platform. Let's first get the ball rolling and then worry 
about optimizations.

* Install LTS version (4.2.4) of [node.js](https://nodejs.org/en/download/)
* Install Current Stable release (3.2.0) of 
[mongodb](https://www.mongodb.org/downloads#production)
* Open a new terminal and Clone the repository from CECS GitLab
  - `git@gitlab.cecs.anu.edu.au:surajx/proof-assistant.git`
* The following commands in the terminal(command prompt)
  - `npm install -g gulp`
  - `npm install -g nodemon`
  - `npm install -g bower
* Navigate into the cloned repository and run the following command
  - `npm install`
  - `bower install`
* Make sure that you are in the repository root and run the following command
  - `gulp`
* Launch a browser and navigate to `localhost:3000` you should be 
seeing a login page.

# Development Work-Flow

> To minimize setup overhead and to still adhere to a fair amount of SCM 
etiquettes, I propose the following dev work-flow.

* Do Not push code directly to master branch.
* Developers should checkout a new git branch for each feature implmentation 
and push the branch to the repository
  - first make sure youre in master branch using this command: `git status`
  - create a new branch from the master branch using this command: 
  `git checkout -b <new-branch-name>`
  - push this new branch into the gitlab remote repository: 
  `git push -u origin <new-branch-name>`
  - Make sure that you do all your commits during your development 
  into this branch.
* Once you have completed a feature and unit-tested your code, create a 
[merge-request](https://gitlab.cecs.anu.edu.au/surajx/
proof-assistant/merge_requests) in the GitLab repository and assign one of your 
peers for code-review.
* Once the code has been reviewed, the code is merged into master and 
deployed to the staging server(which is yet to be setup).

