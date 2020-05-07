# Goals-WWW
This is the front end React implementation of the goals project.

# Goals Overview
The goals game derives from a game my coworker plays with his friends. The idea is to have different goals/tasks for the players in the group to aspire to complete on a day to day basis.
There are 37 different goals that exist in the database, these are called 'default goals' The goals come in five separate categories, Physical, Nutrition, Mental, Emotional, and Spiritual.
Each category contains five to thirteen individual goals. Each goal has a different task such as hiking, running, having family time, reading, yoga, writing, etc. 
Each default goal has a points value of 1, meaning that if a user logs time on a default goal for 60 minutes they receive 1 point for that day, week, and month.
It is up to individual groups to determine if they are competing on a weekly or monthly basis.
Group creators/admins also have the option to add a 'custom goal'. A custom goal is a goal that only that given group can log time for.

# Getting Started
The goals project has two different databases, one for the PROD/Heroku build and one for the DEV/local build. Ideally it would be easiest for anyone interested in interacting with this API to use the PROD/Heroku build as attempting to run this locally will expose database credential issues. The PROD endpoint can be found here: https://goals-www.herokuapp.com/.

The user will be greeted with a Login/Register modal when they open the page. When the user completes authentication they will be brought to the Home page that contains the header and groups they are a part of. Users can now access your groups landing page where they can log goals, view their group's power rankings for both the current month as well all time, a goal report that details all goals placed by every member of the group. If the user is the creator of the group they will also see a button that takes the user to the admin settings where they will be able to add a new user to the group, update the group name, remove users from the group, and disable custom goals.
