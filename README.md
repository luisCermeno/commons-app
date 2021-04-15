# The Commons App

The Commons' mission is to build a platform that empowers college students's role in their institutions by
providing them with the tools to improve their college life. The application strives to emulate a campus 
common area, where students can explore different communities founded in their schools. 

The first step towards this vision is the implementation of a web-application which main objectives are:

1. Helping students to find like-minded peers and providing them with an easier way to establish contact.
Not every student plans their college life the same way. Some may want to join the school football
team, some others may be thinking on joining the school band. For this reason, The Commons objective is to
be the bridge between each individual and their potential niches where they can take an active role.

2. Learning and sharing useful knowledge that is only learned through experience.
College success is not always an easy formula. Learning from senior students is unvaluable when it comes
to determining the right decision. Whether it is choosing the right teacher or the right class for a specic
major, The Commons solves the problem. Each commuunity in the platform is provided with a message and file
history allowing newly joined members to grasp on the knowledge and ideas previous students shared.

3. Encouraging collaboration and active school involvement.
Team formation is difficult when an idea goes beyond an specific class. The Commons platform helps those
who are looking to collaborate in group projects and those who are recruiting team members.

How it is built:

The web application uses Django (Python) in the back-end and React (Javascript) in the front-end

### BACKEND:

The backend is only used to handle authentication and databases. It does not render any
static templates and it is completely independent from the frontend. It's main purposes
is to listen from API calls, validate them and send back useful data.

#### Packages used:

-Django REST Framework: Provides an easier way to handle API views through a user friendly
interface to test them. Also, provides a serializer tool that simplifies the work.
Files using this technology:
/backend/commons/views.py : all views
/backend/commons/ serializer : serializer for user model

-Django REST framork JWT: Provides functionalities to use JSON Web Token Authentication.
Files using this technology:
/backend/commons/urls.py : obtain_jwt_token decodes a token received from the front end
/backend/commons/views.py: api_settings provides methods to encode a payload (credentials received from the front end) and send back a response
/backend/project/utils.py : JWT configuration

-Django CORS headers: allows API request from external server, for developent mode from localhost:300 (frontend)






How to run:

(....)