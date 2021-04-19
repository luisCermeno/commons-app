# The Commons App

The Commons' mission is to build a platform that empowers college students' role in their institutions by providing them with the tools to improve their college life. The application strives to emulate a campus common area, where students can explore different communities founded in their schools.

<img src="/ss/loginpage.png" title="loginpage">

## Objectives

1. ***Help students to find like-minded peers and providing them with an easier way to establish contact.*** Not every student plans their college life the same way. Some may want to join the school football team, some others may be thinking about joining the school band. For this reason, the platform's objective is to be the bridge between each individual and their potential niches where they can take an active role.

2. ***Allow students to share and learn useful knowledge that could only be acquired through experience otherwise.*** College success is not always an easy formula. Learning from senior students is invaluable when it comes to determining the right decision. Whether it is choosing the right teacher or the right class for a specific major, The Commons solves the problem. By running through the chat history, new members of a group can find useful ideas previous students shared.

3. ***Promote collaboration and active school involvement.*** Team formation is difficult when an idea goes beyond a specific class. The Commons platform helps those who are looking to collaborate in group projects and those who are recruiting team members.

<img src="/ss/homepage.png" title="homepage">

## Requirements:
 - python 3.8.2 or higher
 - node 14.15.5 or higher

 ## How to run:
 
To run the app in development mode, we'll need **three** terminal windows
which will run three live servers: 

   ***Open a terminal window and cd into backend folder***
1. Install python requirements and run django server:
	`pip3 install -r requirements.txt`
    `python3 manage.py runserver`

***Open a new terminal and cd into frontend folder***

2. Install react-app
	`npm install`
	(or with yarn preinstalled)
	`yarn install`

3. Run the React development mode server:
	`npm start`
	(or with yarn preinstalled)
	`yarn start`
	
***Open a new terminal and cd into frontend folder***

4. Run the Peerjs server on port 3001:
	`peerjs --port 3001`


	
## How it is built:

The web application uses Django (Python) in the back-end and React (Javascript) in the front-end. The application uses
peer-to-peer real-time communication to hold chatrooms. The connections are established using: a live PeerJS which utilizes
webRTC to create peer connections and the django server to handle the peer "signaling" process. In total the application.

<img src="/ss/chatroom.png" title="chatroom">


### BACK-END:
The backend is used to handle authentication, manage databases, and listen for API calls. It does not render any static template and it runs independently to the frontend. Once it receives an API call from the frontend, it handles the incoming JSON and creates a response (also JSON) which is sent back to the client's end. In the peer-to-peer communication, the django server plays a major role because it takes care of the signaling process, keeps track of each room's active users, and stores the history of messages in the database.

#### Packages used:

 - **Django REST Framework:** Provides an easier way to handle API views through a user-friendly interface to test them. Also, provides a
   serializer tool that simplifies the work.
   
   Files using this technology: 
  /backend/commons/views.py : all views /backend/commons/    serializer
   : serializer for user model
   
 - **Django REST Framework JWT**: Provides functionalities to use JSON Web
   Token Authentication.

	Files using this technology:
	/backend/commons/urls.py : obtain_jwt_token decodes a token received from 			the front end
	/backend/commons/views.py: api_settings provides methods to encode a payload (credentials received from the front end) and send back a response
	/backend/project/utils.py : JWT configuration
	
 - **Django CORS Headers:**  Allows API requests from an external server, localhost:3000 (frontend) for development mode.

### FRONT-END:

The front-end renders the web application interface which is built based on material-UI's components. The peer-to-peer connection is established using the PeerJS library in Room.js.

(Details in the file)

#### Dependencies used:

 - **Material-UI:** Provides a extentful library of beautifully and mobile-responsive components.
   
   Files using this technology: /frontend/src/*
   
  - **PeerJS:** Provides a simplified library of methods to manage WebRTC peer-to-peer communication.
   
	   Files using this technology: /frontend/src/component/Room.js
   
   - **React Router DOM:** Provides components to easily manage browser history. Files using this technology:
   
	   /frontend/src/App.js /frontend/components/RoomList.js
	   /frontend/components/BottomNavigation.js
	   /frontend/components/CustomDrawer.js
