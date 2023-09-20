const express = require("express");
const cors = require("cors");

const app = express();
const jwt = require("jsonwebtoken");

const swaggerUI = require("swagger-ui-express");
const docs = require("./docs/index");

const PORT = process.env.PORT || 3001;

require("dotenv").config();

//NOTE: middleware
app.use(cors());
app.use(express.json());

//NOTE: url fixed
app.use("/users", require("./routes/users"));
app.use("/events", require("./routes/events"));
app.use("/organizations", require("./routes/organizations"));
app.use("/serviceprovisions", require("./routes/serviceProvisions"));
app.use("/contractedservices", require("./routes/contractedServices"));
app.use("/servicecompanies", require("./routes/serviceCompanies"));
app.use("/location", require("./routes/location"));
app.use("/roles", require("./routes/roles"));


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(docs));

app.listen(PORT, () => console.log(`Server created successfully ${PORT}`));

module.exports = app;
