var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Conexión a la base de datos
 */
require('./lib/connectMongoose')
require('./models/Anuncio')


// request se suele escribir req y response res
app.use((req, res, next) => {
  // tengo que responder o llamar a next
  console.log('Recibimos una petición inicial')
  next();
} )

// Variables globales de la página
app.locals.titulo = 'LEGOPOP'

/**
 * rutas de nuestro API
*/
app.use('/legopop/api/anuncios', require('./routes/api/anuncios'));


/**
 * rutas de nuestra aplicación web
*/
app.use('/legopop/anuncios', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {

  //errores de validación
  if (err.array) {
    err.status = 422
    const errInfo = err.array({ onlyFirstError: true })[0]
    
    //err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`
    err.message = isAPIRequest(req) ? 
      { message: 'Not valid', errors: err.mapped() } : 
      `Not valid - ${errInfo.param} ${errInfo.msg}`
    console.log(err.mapped())
  }

  
  // render the error page
  res.status(err.status || 500);

// si es una petición a la API respondo con json
  if (isAPIRequest(req)){
    res.json({ success: false, error: err.message })
    return
  }
  // es una petición a la web
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.render('error');
});

function isAPIRequest(req){
   return req.originalUrl.indexOf('/api') === 0
}
module.exports = app;
