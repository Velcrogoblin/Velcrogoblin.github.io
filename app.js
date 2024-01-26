const express = require('express')
const path = require("path");
const app = express()
var logger = require('morgan');

const port = process.env.PORT || 3000;

const indexRouter = require('./src/routes/main-routes');

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use(logger('dev'));


require('dotenv/config')


// Add the following lines for CORS handling
app.use((req, res, next) => {

    const allowedOrigins = [
        'https://sheetscentraldemo2.mitiendanube.com',
        "https://sheetscentral.com",
        "https://www.maniacba.com.ar",
        "https://ecommitment.mitiendanube.com",
        "https://us-central1-ecommitment-qa.cloudfunctions.net"
        // Add more origins as needed
      ];
    
      const origin = req.headers.origin;
    
      if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
      }
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
  
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404 Not Found');
  });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

module.exports = app;