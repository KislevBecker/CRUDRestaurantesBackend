module.exports = app => {
  const restauants = require("../controllers/restaurant.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", restaurants.create);

  // Retrieve all Tutorials
  router.get("/", restaurants.findAll);

  // Retrieve all published Tutorials
  router.get("/published", restaurants.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", restaurants.findOne);

  // Update a Tutorial with id
  router.put("/:id", restaurants.update);

  // Delete a Tutorial with id
  router.delete("/:id", restaurants.delete);

  // Create a new Tutorial
  router.delete("/", restaurants.deleteAll);

  app.use('/api/restaurants', router);
};