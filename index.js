const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

const PORT = process.env.PORT || 3001;

require("dotenv").config();

//NOTE: middleware
const whitelist = ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://eventum-front.vercel.app"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error());
        }
    },
};

app.use(cors(corsOptions));
app.use(express.json());

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

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports = app; // NOTE: Corregida esta línea
