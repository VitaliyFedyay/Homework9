var fs = require('fs');
var customers = {}

//create new user
exports.create = function(req, res) {
	var newCustomer = req.body;
	customers["customer" + newCustomer.id] = newCustomer;
	console.log("--->After Post, customers:\n" + JSON.stringify(customers, null, 4));
	fs.writeFile ("myjsonfile.json", JSON.stringify(customers, null, 4), function(err) {
		if (err) throw err;
		res.end(JSON.stringify(newCustomer, null, 4));
		console.log('complete create user');
		}
	)
};

//find all user
exports.findAll = function(req, res) {
	fs.readFile('myjsonfile.json',	function(err,customers){
		if(err) throw err;
		res.end(customers);  
	})
};

//find one user
exports.findOne = function(req, res) {
  fs.readFile('myjsonfile.json',	function(err,customers){
		if(err) throw err;
		var data = JSON.parse(customers)
		var customer = data["customer" + req.params.id];
		console.log("--->Find customer: \n" + JSON.stringify(customer, null, 4));
		res.end(JSON.stringify(customer, null, 4));
  })
};

//update user
exports.update = function(req, res) {
	fs.readFile('myjsonfile.json',function(err,customers){
  if(err) throw err;
	var id = parseInt(req.params.id);
	var updatedCustomer = req.body; 
	var data = JSON.parse(customers)
	if(data["customer" + id] != null){
		// update data
		data["customer" + id] = updatedCustomer;
		console.log("--->Update Successfully, customers: \n" + JSON.stringify(data, null, 4))
    fs.writeFile ("myjsonfile.json", JSON.stringify(data, null, 4), function(err) {
      if (err) throw err;
      res.end("Update Successfully! \n" + JSON.stringify(updatedCustomer, null, 4));
      console.log('complete update user');
      })
	} else {
		res.end("Don't Exist Customer:\n:" + JSON.stringify(updatedCustomer, null, 4));
	}
})};

//delete user
exports.delete = function(req, res) {
	fs.readFile('myjsonfile.json',function(err,customers) {
	if(err) throw err;
	var dataParse = JSON.parse(customers)
	var deleteCustomer = dataParse["customer" + req.params.id];
	delete dataParse["customer" + req.params.id];
	console.log("--->After deletion, customer list:\n" + JSON.stringify(dataParse, null, 4) );
	res.end( "Deleted customer: \n" + JSON.stringify(deleteCustomer, null, 4));
	})
	fs.writeFile ("myjsonfile.json", JSON.stringify(dataParse), function(err) {
	if (err) throw err;
	console.log('complete delete user');
  }
);
}