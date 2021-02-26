import http from "http";
import express from "express";

// mongo connection
import "./config/mongo.js";

// Controllers
import activityController from "./controllers/activity-controller.js";

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT;
app.set("port", port);

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use("/activity", activityController);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint doesn\'t exist'
    })
});

/** Create HTTP server. */
const server = http.createServer(app);

/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
    console.log(`Listening on port:: http://localhost:${port}/`)
});