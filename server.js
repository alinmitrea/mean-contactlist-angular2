var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var QUOTES_COLLECTION = "bigquotes";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

//TODO: for local development add here the direct link do mongo db on mlab fdf
// Connect to the database before starting the application server.
var os = require('os');
var hostname = os.hostname();

if(hostname.indexOf("X-Lenovo-PC") > -1) {
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/admin";
}

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// TODO: this works to redirect but it's not effiecient? how to do it using Angular? check app.module.ts
app.get('/categories', function (req, res) {
  res.sendFile(distDir + '/index.html')
});

app.get('/quote/:id', function (req, res) {
  res.sendFile(distDir + '/index.html')
});

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/quotes"
 *    GET: finds all quotes
 *    POST: creates a new quote
 */

app.get("/api/quotes", function (req, res) {
  db.collection(QUOTES_COLLECTION).find({}).limit(10).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get quotes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/quotes", function (req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(QUOTES_COLLECTION).insertOne(newContact, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new quote.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


app.get("/api/quotes/goto/:position/limit/:id", function (req, res) {
  db.collection(QUOTES_COLLECTION).find({}).skip(parseInt(req.params.position)).limit(parseInt(req.params.id)).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get quotes.");
    } else {
      res.status(200).json(docs);
    }
  });
});


app.get("/api/quotes/category/:categ/:limit", function (req, res) {
  var countResults = 10;
  var limitResults = parseInt(req.params.limit);
  db.collection(QUOTES_COLLECTION).find({category: new RegExp(req.params.categ, 'i')}).count(function (err, count) {
    if (err) {
      handleError(res, err.message, "Failed to count quotes.");
    }
    else {
      countResults = count;
      db.collection(QUOTES_COLLECTION).find({category: new RegExp(req.params.categ, 'i')}).skip(getRandomInt(1, countResults - limitResults)).limit(limitResults).toArray(function (err, docs) {
        if (err) {
          handleError(res, err.message, "Failed to get quotes.");
        } else {
          res.status(200).json(docs);
        }
      });
    }
  });
  //console.log("outer count: " + countResults);
});

app.get("/api/quotes/categories", function (req, res) {

  db.collection(QUOTES_COLLECTION).aggregate([{"$group": {_id:"$category", count:{$sum:1}}}, {"$sort":{"_id":1}}], function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get categories.");
    } else {
      res.status(200).json(docs);
    }
  });


  //console.log("outer count: " + countResults);
});

/*  "/api/quotes/:id"
 *    GET: find quote by id
 *    PUT: update quote by id
 *    DELETE: deletes quote by id
 */

app.get("/api/quotes/:id", function (req, res) {
  db.collection(QUOTES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get quote");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.get("/api/quotes/quote_id/:quote_id", function (req, res) {
  db.collection(QUOTES_COLLECTION).findOne({quote_id: req.params.quote_id}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get category");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/quotes/:id", function (req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(QUOTES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update quote");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/quotes/:id", function (req, res) {
  db.collection(QUOTES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete quote");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/quotes/:id", function (req, res) {
  db.collection(QUOTES_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get quote");
    } else {
      res.status(200).json(doc);
    }
  });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
