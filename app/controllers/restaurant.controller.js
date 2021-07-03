const db = require("../models");
const Restaurant = db.restaurantes;
const Op = db.Sequelize.Op;

//para paginar las búsquedas
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: tutorials } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, tutorials, totalPages, currentPage };
};

// crear y guardar nuevo restaurante
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "No puede ser vacío!"
    });
    return;
  }

  // Create restartante
  const restaurant = {
    name: req.body.name,
    logo: req.body.logo,
    date: req.body.date,
    ownerName: req.body.ownerName,
    address: req.body.address,
    restaurantType: req.body.restaurantType,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Restaurant.create(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hemos experimentado un error al momento de crear el restaurante."
      });
    });
};

// listar los restaurantes.
exports.findAll = (req, res) => {
  const name = req.query.name;

  const { page, size, name } = req.query;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  const { limit, offset } = getPagination(page, size);


  Restaurant.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Hemos experimentado un error al listar los restaurantes."
      });
    });
};

// buscar por id un restaurante
exports.findOne = (req, res) => {
  const id = req.params.id;

  Restaurant.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error trayendo el restaurante con id=" + id
      });
    });
};

// actualizar restaurante pasando el id
exports.update = (req, res) => {
  const id = req.params.id;

  Restaurant.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restaurante exitosamente modificado."
        });
      } else {
        res.send({
          message: `No se pudo modificar el restaurante con id=${id}. Intente de nuevo!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el restaurante con id=" + id
      });
    });
};

// borrar un restaurante pasando el id
exports.delete = (req, res) => {
  const id = req.params.id;

  Restaurant.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Restaurante eliminado correctamente!"
        });
      } else {
        res.send({
          message: `No se pudo borrar el restaurante con id=${id}. Intente de nuevo!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error! no se puede borrar este restaurante con id=" + id
      });
    });
};

// borrar todos los restaurantes
exports.deleteAll = (req, res) => {
  Restaurant.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Restaurantes borrados exitosamente!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error mientras se intentaba eliminar todos los restaurantes."
      });
    });
};

// buscar todos los restaurantes publicados
exports.findAllPublished = (req, res) => {
  Restaurant.findAndCountAll({ where: { published: true }, limit, offset })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al momento de listar todos los restaurantes."
      });
    });
};