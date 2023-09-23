function errorConfig (app) {
    // ANULO ERROR FLAVICON
    app.get('/favicon.ico', (req, res) => res.status(204));
    // ERROR CAST OBJET NO PUEDO ENTENDER A QUE SE DEBE ESTE ERROR DE ID
    app.use((err, req, res, next) => {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({ status: "error", message: "ID de usuario no válido" });
      }
      console.error(err);
      res.status(500).json({ status: "error", message: "Error interno del servidor" });
    });
  };

export default errorConfig
  