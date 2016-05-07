> ANU CECS GitLab specific README

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
merge-request in the GitLab repository and assign one of your 
peers for code-review.
* Once the code has been reviewed, it is merged into master and 
deployed to the staging server.

# Deployment Notes
```bash
#Package Installation.
sudo apt-get install git curl xclip build-essential nginx libkrb5-dev mongodb
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v #v4.2.4
npm -v #2.14.12
git --version #git version 2.1.4
mongod --version
  #db version v2.4.10
  #Fri Jan 15 13:11:20.583 git version: nogitversion
sudo npm install -g bower
sudo npm install -g forever
bower --version #1.7.2
forever --version #v0.15.1

#Configure nginx
sudo rm /etc/nginx/sites-enabled/default
sudo touch /etc/nginx/sites-available/proof-assistant
sudo vi /etc/nginx/sites-available/proof-assistant
```
Add the below configuration to `/etc/nginx/sites-available/proof-assistant`
```
server {
  listen 80;
  server_name proof_assitant.dev;
  location / {
    proxy_set_header   X-Real-IP $remote_addr;
    proxy_set_header   Host      $http_host;
    proxy_pass         http://127.0.0.1:8998;
  }
}
```
```bash
#Create a symlink into sites-enabled
sudo ln -s /etc/nginx/sites-available/proof-assistant /etc/nginx/sites-enabled/proof-assistant

#Restart nginx
sudo service nginx restart

#start mongodb service.
sudo service mongodb start

#Proof Assistant app configuration
sudo mkdir -p /var/www/proof-assistant

#create a new user called: proofusr
sudo adduser --shell /bin/bash --gecos 'Proof Assistant application' proofusr
#<enter-password>

#Give /var/www/proof-assistant ownership to proofusr
sudo chown -R proofusr:proofusr /var/www/proof-assistant/

#Login as proofusr
su - proofusr
#Configure Git for proofusr
git config --global user.name "proofusr"
git config --global user.email "proofusr@proofserver.com"

#create deploy key (empty passphrase)
ssh-keygen -q -N "" -f ~/.ssh/id_rsa -t rsa -b 4096 -C "proofusr@proofserver.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa

#On you local terminal
#get ssh pub key to local clipboard <execute on a local terminal>
ssh proofusr@150.203.186.140 "cat ~/.ssh/id_rsa.pub" | xclip -sel clip
```
Add the deploy key currently in you clipboard to the GitLab repository deploy-key section.
```bash
#On 150.203.186.140 as proofusr
#get source code from GitLab
cd /var/www/proof-assistant

#Clone only master
git clone -b master --single-branch git@gitlab.cecs.anu.edu.au:surajx/proof-assistant.git .

#install production node modules.
#WARN is okay
npm install --production 

#install browser components.
bower install

#start proof-assistant using forever.
#Change the value of PROOF_SESSION_SECRET env variable.
export PROOF_NODE_ENV=staging && export PROOF_PORT=8998 && export PROOF_SESSION_SECRET=w9875hfswfslsfw49w48u && forever start -w bin/www
```
