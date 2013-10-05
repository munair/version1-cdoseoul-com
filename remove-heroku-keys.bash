#!/bin/bash
#
# remove heroku keys
#

heroku keys | grep ssh-rsa | awk '{ print $3 }' | sed 's/ubuntu/heroku keys:remove &/' | grep heroku > executable.bash && echo "bash file created."
bash -x executable.bash && echo "bash file executed."
rm -rf executable.bash && echo "bash file removed."
exit 0
