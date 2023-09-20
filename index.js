const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

const PORT = process.env.PORT || 3001;

require("dotenv").config();

//NOTE: middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"];

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Origin not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


app.use(express.json());

app.use("/users", require("./routes/users"));
app.use("/events", require("./routes/events"));
app.use("/organizations", require("./routes/organizations"));
app.use("/serviceprovisions", require("./routes/serviceProvisions"));
app.use("/contractedservices", require("./routes/contractedServices"));
app.use("/servicecompanies", require("./routes/serviceCompanies"));
app.use("/location", require("./routes/location"));
app.use("/roles", require("./routes/roles"));
app.use("/feedback", require("./routes/feedback"));
app.use("/facilities", require("./routes/facilities"));
app.use("/eventuser", require("./routes/eventUsers"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports = app; // NOTE: Corregida esta línea
