const https = require('https')
const fs = require('fs');
const express = require("express");
const app = express();

const options = {
  key: fs.readFileSync('./client/certs/localhost-key.pem'), 
  cert: fs.readFileSync('./client/certs/localhost.pem') 
}

const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const path = require('path')

const cors = require('cors')
app.use(
  cors({
    origin: "https://localhost:3000",
    credentials: true,
  })
);

app.enable('trust proxy', 1)

//Routes
const mainRoutes = require("./routes/main");
const postRoutes = require("./routes/posts");
const playerRoutes = require("./routes/player");
const encounterRoutes = require("./routes/encounters");
const roundRoutes = require("./routes/rounds");
const characterRoutes = require("./routes/characters");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require("body-parser").json())

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

const inProd = process.env.NODE_ENV === "production";

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
      sameSite: `none`, // cross site // set lax while working with http:localhost, but none when in prod
      secure: `${inProd ? "true" : "auto"}`, // only https // auto when in development, true when in prod
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/api/", mainRoutes);
app.use("/api/post", postRoutes);
app.use("/api/player", playerRoutes);
app.use("/api/encounter", encounterRoutes);
app.use("/api/round", roundRoutes);
app.use("/api/character", characterRoutes);

// Heroku to serve build / static assets for production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  //serve the html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  }) 
}

//Socket.io 
const { Server } = require('socket.io')


const server = https.createServer(options, app)
const io = new Server(server, {
  cors: {
    //URL for the front end
    origin: `${process.env.CLIENT_ADDRESS}`,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})

io.on("connection", (socket) => {
  console.log(`Socket user Connected: ${socket.id}`)

  socket.on("join_room", (data) => {
    socket.join(data);
  })
  
  socket.on("send_roundRefresh", (data) => {
    socket.to(data.room).emit("receive_roundRefresh", data)
  })

  socket.on("send_controlRefresh", (data) => {
    socket.to(data.room).emit("receive_controlRefresh", data)
  })
})

//Server Running
const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log(`Server running on ${port}`);
  console.log(`https://localhost:${port}/`);
});
