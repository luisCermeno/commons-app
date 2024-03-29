# The Commons App

The Commons App mission is to create a platform where students help each other to improve their college life. The application strives to emulate any campus common area, where students can explore different active communities in their schools.

<img src="/ss/loginpage.png" title="loginpage">

## Objectives

1. ***Help students to find like-minded peers and providing them with an easier way to establish contact.*** Not every student plans their college life the same way. Some may want to join the school football team, some others may be thinking about joining the school band. For this reason, the platform's objective is to be the bridge between each individual and their potential niches where they can take an active role.

2. ***Allow students to share and learn useful knowledge that could only be acquired through experience otherwise.*** College success is not always an easy formula. Learning from senior students is invaluable when it comes to determining the right decision. Whether it is choosing the right teacher or the right class for a specific major, The Commons solves the problem. By running through the chat history, new members of a group can find useful ideas previous students shared.

3. ***Promote collaboration and active school involvement.*** Team formation is difficult when an idea goes beyond a specific class. The Commons platform helps those who are looking to collaborate in group projects and those who are recruiting team members.

<img src="/ss/homepage.png" title="homepage">

## Requirements:
 - python 3.8.2 or higher
 - node 14.15.5 or higher

## How to run (dockerized package):

1. Install and sign in into docker using `docker login`.  
2. Run:  
`docker pull luiscermeno/commons-backend`  
`docker run -p 8000:8000 luiscermeno/commons-backend`
3. Open another terminal an run:  
`docker pull luiscermeno/commons-frontend`  
`docker run -p 3000:3000 luiscermeno/commons-frontend`  

4. Open localhost:3000 in your web browser.  

Superuser: admin Password: admin

## How to run (development mode):
 
To run the app in development mode, we'll need **2** terminal windows
running in parallel:

Terminal 1:
1. Cd into backend folder.  
	`cd backend/`
2. Install python requirements and run django server.    
	`pip3 install -r requirements.txt --user`   
	(if you don't want to install the python requirements at
	 user level, create a virtual enviroment)
3. Run django server.   
	`python3 manage.py runserver`

Terminal 2:
1. Cd into frontend folder.  
	`cd frontend/`
2. Install react-app:  
	`npm install`  
	(or with yarn preinstalled)  
	`yarn install`  

3. Run the React development mode server:  
	`npm start`  
	(or with yarn preinstalled)  
	`yarn start`  
	
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
		/backend/commons/views.py : used in all views.    
		/backend/commons/serializer: used to write the serializer for user model    
   
 - **Django REST Framework JWT**: Provides functionalities to use JSON Web
   Token Authentication.

		Files using this technology:   
		/backend/commons/urls.py : obtain_jwt_token decodes a token received from the front end. 
		/backend/commons/views.py: api_settings provides methods to encode a payload (credentials received from the front end) and send back a response.  
		/backend/project/utils.py : JWT configuration.  
	
 - **Django CORS Headers:**  Allows API requests from an external server, localhost:3000 (frontend) for development mode.

### FRONT-END:

The front-end renders the web application interface which is built based on material-UI's components. The peer-to-peer connection is established using the PeerJS library in Room.js.

(Details in the file)

#### Dependencies used:

 - **Material-UI:** Provides a extentful library of beautifully and mobile-responsive components.
  
		 Files using this technology:   
		 /frontend/src/*
   
  - **PeerJS:** Provides a simplified library of methods to manage WebRTC peer-to-peer communication.
   
		 Files using this technology:  
		 /frontend/src/component/Room.js
   
   - **React Router DOM:** Provides components to easily manage browser history. 
   
		 Files using this technology:  
		 /frontend/src/App.js /frontend/components/RoomList.js  
		 /frontend/components/BottomNavigation.js.   
		 /frontend/components/CustomDrawer.js.   
