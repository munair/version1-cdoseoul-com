#!/bin/bash
# script name : engineering.bash
# script args : $1 -- file to be edited
#       $2 -- comments for git
#       $3 -- remove interactivity if parameter equals "noprompting"
#
# Make certain that you are only editing the engineering branch.
# Edit the file supplied as an argument to this script.
#
# The script ensures that edits are pushed to the development 
# branch at the origin after changes on the local engineering repository
# have been vetted and merged back into the development repository.
#
# 
git checkout engineering || git checkout -b engineering
git branch
sleep 5
vi $1
git add $1
git commit -m "$2"
[ $3 == "noprompting" ] || while true; do
    read -p "shall we push changes to the engineering GitHub repository and the engineering instance on Heroku? " yn
    case $yn in
        [Yy]* ) echo "proceeding..."; break;;
        [Nn]* ) exit;;
        * ) echo "please answer yes or no.";;
    esac
done
git push origin engineering
cat ~/.netrc | grep heroku || heroku login && heroku keys:add ~/.ssh/id_rsa.pub
heroku git:remote -a engineering-cdoseoul-com -r engineering-heroku
git push engineering-heroku engineering:master
git checkout development || git checkout -b development
git branch
sleep 5
git merge engineering
git push engineering-heroku engineering:master
[ $3 == "noprompting" ] || while true; do
    read -p "was the merge successful? should we push the changes back into the development GitHub repository? " yn
    case $yn in
        [Yy]* ) echo "proceeding..."; break;;
        [Nn]* ) exit;;
        * ) echo "please answer yes or no.";;
    esac
done
git push origin development
git checkout development
