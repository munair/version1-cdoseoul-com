www-cdoseoul-com
================

Repository for the cdoseoul.com domain.

To clone this repository on a new AWS EC2 instance --

Copy the contents of this README.md, dump a copy into machine-setup.bash just as you log in as ubuntu for the first time,
and run this on a new EC2 instance running Ubuntu 12.04.2 LTS to configure both the machine and the environment for 
developing the CDO Seoul app:

```

#!/bin/bash
cd $HOME
sudo apt-get install -y git-core
git clone https://github.com/munair/aws_ec2_no_emacs_setup.git
./aws_ec2_no_emacs_setup/setup.sh   

# Next, create an SSH key and (by copy/pasting with the mouse)
# add it to Github at https://github.com/settings/ssh
ssh-keygen -t rsa
cat ~/.ssh/id_rsa.pub

# Now you can clone via SSH from github.
# Cloning over SSH allows you to push/pull changes.
# Use the credential helper with caching set to 1 hour to avoid
# having to repeatedly enter your username and password.
git clone https://github.com/munair/www-cdoseoul-kr.git
git config --global user.name "Munair Simpson"
git config --global user.email "munair@gmail.com"
git config --global credential.helper 'cache --timeout=3600'

# Next change into the app directory and get all
# npm dependencies.
cd www-cdoseoul-com
npm install express
npm install postmark

# Login and add the SSH key created previously to Heroku
# Then create Heroku apps if they don't already exit.
# Add all necessary add-ons if creating Heroku apps.
heroku login
heroku keys:add

exit
# We need to logout and log back in to enable node

```

See also http://www.cdoseoul.com and [Heroku](https://www.heroku.com) for more details.

