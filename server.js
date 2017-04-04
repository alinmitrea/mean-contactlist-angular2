var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";
var BIG_QUOTES_COLLECTION = "bigquotes";
var QUOTES_COLLECTION = "quotes";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

//TODO: for local development add here the direct link do mongo db on mlab

// Connect to the database before starting the application server.
//process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/admin";
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

// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/contacts/:id", function(req, res) {
  db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/api/quotes"
 *    GET: finds all quotes
 *    POST: creates a new quote
 */

app.get("/api/quotes", function(req, res) {
  db.collection(QUOTES_COLLECTION).find({}).limit(2).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get quotes.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/quotes", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }

  db.collection(QUOTES_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new quote.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});


/*  "/api/quotes/:id"
 *    GET: find quote by id
 *    PUT: update quote by id
 *    DELETE: deletes quote by id
 */

app.get("/api/quotes/:id", function(req, res) {
  db.collection(QUOTES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get quote");
    } else {
      res.status(200).json(doc);
    }
  });
});

//TODO: change here BIG_QUOTES_COLLECTION with QUOTES_COLLECTION
app.get("/api/quotes/quote_id/:quote_id", function(req, res) {
  db.collection(BIG_QUOTES_COLLECTION).findOne({ quote_id: req.params.quote_id}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get category");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/quotes/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(QUOTES_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update quote");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/quotes/:id", function(req, res) {
  db.collection(QUOTES_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete quote");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

app.get("/api/quotes/:id", function(req, res) {
  db.collection(QUOTES_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get quote");
    } else {
      res.status(200).json(doc);
    }
  });
});
