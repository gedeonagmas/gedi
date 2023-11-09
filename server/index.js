const express = require("express");
require("dotenv").config();
const path = require("path");
const cors = require("cors");
const app = express();
const router = require("./routes/routes");
const { errorController } = require("./controller/errorController");
const mongodb = require("./config/db");

// process.on("uncaughtException", (err) => {
//   console.log("SHUTTING DOWN"); 
//   console.log(err.name, err.message);
//   process.exit(1);
// });

app.use(cors(
    {
        origin: ["https://gedi-client.vercel.app"],
        methods: ["POST", "GET","PATCH","DELETE","PUT"],
        credentials: true
    }
));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/gym/app/v1",router);
app.get("/", (req, res) => {
    res.json("Hello");
})
app.all("*", (req, res, next) => {
  res.status(200).json({ message: `${req.originalUrl} is invalid url` });
  next();
});

app.use(errorController);



mongodb()
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      if (err) console.log(err);
      console.log("gym server connected on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// process.on("unhandledRejection", (err) => {
//   console.log("SHUTTING DOWN");
//   console.log(err.message, err.name);
//   server.close(() => {
//     process.exit(1);
//   });
// });
