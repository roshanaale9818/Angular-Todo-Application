# ToDoApp

 This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.
 It is a simple todo application where you can create your todo item or task. You can login and signup for saving up your tasks and mark the done ones and delete the     tasks.
 You can translate your item to different languages (options are in application) (this feature utilizes the google translate apis Google cloud services)
 It is integrated with the help of node js backend application. (source code and repo link - https://github.com/roshanaale9818/TodoAppBackend
 It uses jsonwebtoken (JWT) authentication and authorization sending the token each time it makes requests to server via headers (x-access-token) properties.

This application uses google cloud, firebase services.

This todo application is hosted at https://angulartodofrontend.web.app/ with the help of firebase hosting.

Prerequisite
 1. Node js 
 2. Angular version 15.1.3
 3. NPM
  

## How to run todo app at local?
  1. Clone this repo or download src code and go to the directory and type
  2. npm i
  3. ng s (default port is 4200)
  


## Cors error 
  This application will face cors error on API calls. (as for security purpose done at server side config).
  1. You can download node js backend application and run it on your local machine and change the apiUrl string in environment file to run.


## Users
This app has two different user roles and logins.
1. user -> default role (all signed up user has user roles)
2. Admin -> Admin can view the users of system and view the users translation history made by that user.






