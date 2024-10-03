var Usuario = require('../models/usuarioModel');

module.exports = {
  list: function (req, res, next) {
    Usuario.find({}, (err, usuarios) =>{
      res.render('usuarios/index', {usuarios: usuarios });
    });        
},
create_get: function(req, res, next) {
  res.render('usuarios/create', {errors: {}, usuario: new Usuario()});
},
create: function(req, res, next) {
    if (req.body.password != req.body.confirm_password){
      res.render('usuarios/create', {errors: {confirm_password: {message: 'No coincide con el password ingresado'}}, usuario: new Usuario({nombre: req.body.nombre, email: req.body.email}) });
      return;
    }

    Usuario.create({
      nombre: req.body.nombre,
      email: req.body.email,
      password: req.body.password,
    },
    (err, nuevoUsuario) => {
      if(err){
        res.render('/usuarios/create', {
          errors: err.errors,
          usuario: new Usuario({
            nombre: req.body.nombre,
            email: req.body.email,
          })
        });
      }else {
        nuevoUsuario.enviar_email_bienvenida();
        res.redirect('/usuarios');
      }
    });
  },
}