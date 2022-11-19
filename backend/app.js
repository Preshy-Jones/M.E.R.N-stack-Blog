const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const app = express();
const passport = require("passport");
const methodOverride = require("method-override");
const db = require("./config").mongoURI;
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { logger, logEvents } = require("./middlewares/logger");

//passport config

const { errorHandler, notFoundHandler } = require("./middlewares");
const corsOptions = require("./config/corsOptions");

const port = process.env.PORT || 8008;

// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
//     console.log('mongoDB connected')
// })

dotenv.config({ path: path.join(__dirname, ".env") });
//body parser

app.use(logger);
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use(passport.initialize());
require("./middlewares/passport");

//ejs template engine
app.set("view engine", "ejs");

//Express session

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
    },
  })
);
// //passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//routes
app.use("/v1", require("./routes/v1/index"));
// app.use('/users', require('./controllers/users'))
// app.use('/articles', require('./controllers/articles'))

app.use(express.static("./public"));

app.use(notFoundHandler);
app.use(errorHandler);
mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => console.log("connected to mongodb")
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
