const express = require("express");
const costumerRoutes = require("./routes/customer.routes");

const PORT = 5000;
const api = express();

api.use(express.json());
api.use(express.static("public"));

api.use("/costumer", costumerRoutes);

api.listen(PORT, ()=>{
    console.log("Server running in http://localhost:5000")
});