const express = require("express");
const costumerRoutes = require("./routes/customer.routes");

const PORT = 5000;
const api = express();

api.use("/customer", costumerRoutes);
api.use(express.static("public"));
api.use(express.json());

api.listen(PORT, ()=>{
    console.log("Server running in http://localhost:5000")
});