/* eslint-disable no-console */
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");
const process = require("process");
const http = require("http");
const uuidv4 = require("uuid").v4;
const { WebSocket } = require("ws");

const app = express();
const server = http.createServer(app);
const ws = new WebSocket.Server({ server: server });

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://eventum.dreamteam7.com",
    "https://eventum-front.vercel.app",
    "https://vercel.live/link/eventum-front-git-develop-patrigarcia.vercel.app?via=deployment-domains-list-branch",
    "https://eventum-front-git-develop-patrigarcia.vercel.app/",
    "https://vercel.live/link/eventum-front-a1dhu6lii-patrigarcia.vercel.app?via=deployment-domains-list-commit",
    "https://eventum-front-a1dhu6lii-patrigarcia.vercel.app/",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server UP");
});

app.get("/ping", (req, res) => {
    res.send("pong 🏓");
});

app.use("/users", require("./routes/users"));
app.use("/events", require("./routes/events"));
app.use("/organizations", require("./routes/organizations"));
app.use("/serviceprovisions", require("./routes/serviceProvisions"));
app.use("/contractedservices", require("./routes/contractedServices"));
app.use("/servicecompanies", require("./routes/serviceCompanies"));
app.use("/locations", require("./routes/locations"));
app.use("/roles", require("./routes/roles"));
app.use("/feedbacks", require("./routes/feedbacks"));
app.use("/facilities", require("./routes/facilities"));
app.use("/eventuser", require("./routes/eventUsers"));
app.use("/educationalcenter", require("./routes/educationalCenter"));
app.use("/eventusers", require("./routes/eventUsers"));
app.use("/types", require("./routes/types"));
app.use("/dashboards", require("./routes/dashboards"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

const typesDef = {
    USER_EVENT: "userevent",
    CHECK_IN: "CHECK-IN",
    CHECK_OUT: "CHECK-OUT",
};

const clients = {};
const users = {};
const userActivity = [];

function broadcastMessage(json) {
    const data = JSON.stringify(json);
    for (let userId in clients) {
        let client = clients[userId];
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    }
}

function handleMessage(message, userId) {
    (`Message received from user(${userId}): ${message}`);
    const dataFromClient = JSON.parse(message.toString());
    const json = { type: dataFromClient.type, payload: dataFromClient.payload };
    if (dataFromClient.type === typesDef.USER_EVENT) {
        users[userId] = dataFromClient;
        userActivity.push(`${dataFromClient.username} joined`);
        json.data = { users, userActivity };
    }
    broadcastMessage(json);
}

function handleDisconnect(userId) {
    const json = { type: typesDef.USER_EVENT };
    const username = users[userId]?.username || userId;
    userActivity.push(`${username} left`);
    json.data = { users, userActivity };
    delete clients[userId];
    delete users[userId];
    broadcastMessage(json);
    (`${userId} disconnected.`);
}

ws.on("connection", function (connection) {
    const userId = uuidv4();
    clients[userId] = connection;
    (`${userId} connected.`);
    connection.on("message", (message) => handleMessage(message, userId));
    connection.on("close", () => handleDisconnect(userId));
});

server.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports.app = app;
module.exports.broadcastMessage = broadcastMessage;
