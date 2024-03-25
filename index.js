import cookie from "cookie";
import http from "http";

// My Imports
import { SignUp, VerifyEmail, Login } from "./Control/ModelManager.js";


const server = http.createServer((req, res) => {
  const method = req.method;
  const request = req.url; // use custome method here for separating the url
  console.log(request);
  if (method == "GET") {
    switch (request) {
      case "/":
        res.write("LoginPage");
        break;
    }
  } else if (method == "POST") {
    switch (request) {
      case "/login":
        break;
      case "/signUp": // Functionality then verify email
        break;
      case "/signUp/Verify": // Verify user's email then render main
        break;
      case "/forgotPassword": // Make functionality
        break;
      default: // do something for this but end connection
    }
  }
});

server.listen(3000, "127.0.0.1", () => console.log("Listening..."));

// Make a method that will separate the route from the parameter
