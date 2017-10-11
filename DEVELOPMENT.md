# Development Environment Setup

* Install LTS version (4.2.4) of [node.js](https://nodejs.org/en/download/)
* Install Current Stable release (3.2.0) of 
[mongodb](https://www.mongodb.org/downloads#production)
* Open a new terminal and Clone the repository from Github
  - `git clone git@github.com:surajx/proof-assistant.git`
* Run the following commands in the terminal(command prompt)
  - `npm install -g gulp`
  - `npm install -g nodemon`
  - `npm install -g bower`
* Navigate into the cloned repository directory and run the following commands
  - `npm install`
  - `bower install`
* Make sure that you are in the repository root and run the following command
  - `gulp`
* Launch a browser and navigate to `localhost:3000` you should be 
seeing a login page.

# Development Work-Flow

> To minimize setup overhead and to still adhere to a fair amount of SCM 
etiquettes we'll have the following dev work-flow.

* Do NOT push code directly to `master` branch.
* Developers should checkout a new git branch for each feature implementation 
and push the branch to the repository
  - first make sure you're in master branch using this command: `git status`
  - create a new branch from the master branch using this command: 
  `git checkout -b <new-branch-name>`
  - push this new branch into the gitlab remote repository: 
  `git push -u origin <new-branch-name>`
  - Make sure that you do all your commits during your development 
  into this branch.
* Once you have completed a feature and unit-tested your code, create a 
merge-request in the GitLab repository and assign one of your 
peers for code-review.
* Once the code has been reviewed, it is merged into master and 
deployed to the staging server.
