This project was created as part of my Web Application Design course. It consists of two seperate projects acting as a client "front-end" and server "back-end" respectively.
The server is coded in Java using the Springboot framework, and the client is coded in TypeScript inside the React NextJS framework. Developed in the Intellij Ultimate IDE for both
the server and client. 

As a whole, this project follows CORS (Cross Origin Resource Sharing) to allow the server to act as a RESTful API for the client to use. The client uses
HTTP methods (eg. GET POST PUT DELETE) to display, add, edit, and delete books respectively. Additionally, its also worth noting that the server uses SwaggerUI
to generate clean looking API documentation for descriptions about what HTTP methods are available, what they do, and what endpoints/links they use!

To run this project, get Intellij and open the two seperate server and client folders. Ensure the server runs on port 8080 ([http://localhost:8080/](http://localhost:8080/)),
and the client should run on port 3000 ([http://localhost:3000/](http://localhost:3000/)).
