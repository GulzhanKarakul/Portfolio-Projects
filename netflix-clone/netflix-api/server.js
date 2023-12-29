const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/UserRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@atlascluster.qweme2u.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB Connected");
}).catch((error) => {
    console.error("Error connecting to the database:", error);
});

app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("server started"));
