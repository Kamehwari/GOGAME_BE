const express =           require('express');
const cors   =            require('cors');
const mongoose =          require('mongoose');

const app = express();

app.set('port',process.env.PORT || 3000);
let conn_str = process.env.DATABASE_URL || "mongodb://localhost/gogame"
let baseUrl = process.env.BASE_URL || "api/v1"
mongoose.connect(conn_str);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


// Use middleware
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// Allow CORS
app.use(cors());
app.get('/', function(req, res){
    let greeting = 'Welcome to GoGame platform'
    console.log(greeting);
    res.status(200);
    res.json(greeting);
  });
allowCrossDomain = function(req, res, next) {

    res.header('Access-Control-Allow-Credentials', false);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Allow', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
    res.header('Accept','application/json');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT');
    //res.header('Access-Control-Allow-preflightContinue','false');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Access-Control-Allow-Origin, filters,eventid');
    if ('OPTIONS' === req.method) {
      res.send(200);
    } else {
      next();
    }
  };
  
app.use(allowCrossDomain);
app.use(express.static('public'))
app.use( '/user',    require('./controllers/usersCtrl'));
app.use(require('./controllers/gameCtrl'))
/**
 * Start Express server.
 */
app.listen(app.get('port'), function(){
	console.log('Server running on port ' + app.get('port'));
});

