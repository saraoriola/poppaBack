require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

const PORT = process.env.PORT || 3001;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://eventum-front.vercel.app"];
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not " + "allow access from the specified Origin.";
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
};

app.use(cors()); // Usar corsOptions para configurar CORS
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

app.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports = app;
