module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5, // minimo de conexiones
    min: 0, //maximo de conexiones
    acquire: 30000, // maximo tiempo de espera antes de enviar error
    idle: 10000 // maximo tiempo de espera para la conexion de la db
  },
  logging:false
};