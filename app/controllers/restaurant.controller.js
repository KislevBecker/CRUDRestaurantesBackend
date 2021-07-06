const db = require("../models");
const Restaurant = db.restaurants;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: restaurants } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, restaurants, totalPages, currentPage };
};

// Crear y guardar restaurante
exports.create = (req, res) => {
  // Validate request
  debugger;
  if (!req.body.name) {
    res.status(400).send({
      message: "El contenido no puede ser vacío!"
    });
    return;
  }

  // Crear el restaurante
  debugger;
  const restaurant = {
    name: req.body.name,
    logo: req.body.logo,
    date: req.body.date,
    ownerName: req.body.ownerName,
    address: req.body.address,
    restaurantType: req.body.restaurantType,
    published: req.body.published ? req.body.published : false
  };

  // Guardar en ls db
  Restaurant.create(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hemos experimentado un error al guardar el restaurante."
      });
    });
};

// traer todos los rest de la bd.
exports.findAll = (req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Tutorial.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha ocurrido un error y no se pudieron listar los restaurantes."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Restaurant.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error, no se encontró el restaurante con id=" + id
      });
    });
};

// actualizar un restaurante
exports.update = (req, res) => {
  const id = req.params.id;

  Restaurant.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restaurante actualizado exitosamente."
        });
      } else {
        res.send({
          message: `No se pudo actualizar el restaurante con id=${id}. Intente de nuevo!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el restaurante con id=" + id
      });
    });
};

// Borrar un solo restaurante
exports.delete = (req, res) => {
  const id = req.params.id;

  Restaurant.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial eliminado exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el restaurante con id=${id}. Intente de nuevo!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al intentar eliminar el restaurante con id=" + id
      });
    });
};

// Borrar todos los restaurantes
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Restaurantes fueron eliminados exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al momento de eliminar los restaurantes."
      });
    });
};

// Listar todos los restaurantes
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Restaurant.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al listar los restaurantes."
      });
    });
};