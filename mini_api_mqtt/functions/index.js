const functions = require('firebase-functions');
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();
const dbTodos = admin.firestore().collection("todos");
const dbSensors = admin.firestore().collection("sensores");

app.get("/", function (request, response) {
 
  response. json(todos);
  response.set('Content-Type', 'text/html');
  response.send(Buffer.from('<h2>API Simples!</h2>'));

})


app.get("/todos", function (request, response) {
  dbTodos.get()
    .then(function (docs) {
      let todos = [];
      docs.forEach(function (doc) {
        todos.push({
          id: doc.id,
          description: doc.data().description
        })
      })
      response.json(todos);
    });
})

app.get("/sensores", function (request, response) {
  dbSensors.get()
    .then(function (docs) {
      let todos = [];
      docs.forEach(function (doc) {
        todos.push({
          id: doc.id,
          code: doc.data().code,
          value: doc.data().value,
          date: doc.data().date, 
          name: doc.data().name 
        })
      })
      response.json(todos);
    });
})

app.post("/todos", function (request, response) {
  dbTodos.add({ description: request.body.description })
    .then(function () {
      response.json({ general: "Ok" });
    })
})

app.post("/sensores", function (request, response) {
  dbSensors.add({ code: request.body.code, value: request.body.value, name : request.body.name})
    .then(function () {
      response.json({ general: "Ok" });
    })
})

exports.api = functions.https.onRequest(app)