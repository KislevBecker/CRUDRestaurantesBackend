const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// rutas
app.get("/", (req, res) => {
  res.json({ message: "CRUD Restaurantes." });
});


require("./app/routes/turorial.routes")(app);


// fijar el puerto en el que se escuchan los request, si está en local va a ser 8080 y si se hace deploy toma
//el puerto que se le asigne
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

//sync para usar lo que esté en models
const db = require("./app/models");
db.sequelize.sync();

//por si se necesita tirar tablar y resync db
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });