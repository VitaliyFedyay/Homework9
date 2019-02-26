module.exports = function(app) {

  var users = require('../controllers/users.controller.js');
  // Create a new Customer
  app.post('/api/users', users.create);
  // Retrieve all Customer
  app.get('/api/users', users.findAll);
  // Retrieve a single Customer by Id
  app.get('/api/users/:id', users.findOne);
  // Update a Customer with Id
  app.put('/api/users/:id', users.update);
  // Delete a Customer with Id
  app.delete('/api/users/:id', users.delete);
}