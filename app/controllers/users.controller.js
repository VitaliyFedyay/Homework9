var fs = require('fs')
var users = {}

//create a new user
exports.create = function(req, res) {
	var newUser = req.body
	users["user" + newUser.id] = newUser
	console.log("--->After Post, users:\n" + JSON.stringify(users, null, 4))
	fs.writeFile ("myjsonfile.json", JSON.stringify(users, null, 4), function(err) {
		if (err) throw err
		res.end(JSON.stringify(newUser, null, 4))
		console.log('complete create user')
		}
	)
}

//find all user
exports.findAll = function(req, res) {
	fs.readFile('myjsonfile.json', function(err,users) {
		if(err) throw err
		res.end(users)
	})
}

//find one user
exports.findOne = function(req, res) {
  fs.readFile('myjsonfile.json', function(err, users) {
		if(err) throw err
		var data = JSON.parse(users)
		var user = data["user" + req.params.id]
		console.log("--->Find user: \n" + JSON.stringify(user, null, 4))
		res.end(JSON.stringify(user, null, 4))
  })
}

//update user
exports.update = function(req, res) {
	fs.readFile('myjsonfile.json', function(err, users) {
    if(err) throw err
    var id = parseInt(req.params.id)
    var updatedUser = req.body
    var data = JSON.parse(users)
    if(data["user" + id] != null) {
      data["user" + id] = updatedUser
      console.log("--->Update Successfully, users: \n" + JSON.stringify(data, null, 4))
      fs.writeFile ("myjsonfile.json", JSON.stringify(data, null, 4), function(err) {
        if (err) throw err
        res.end("Update Successfully! \n" + JSON.stringify(updatedUser, null, 4))
        console.log('complete update user')
        })
    } else {
      res.end("Don't Exist User:\n:" + JSON.stringify(updatedUser, null, 4))
    }
})
}

//delete user
exports.delete = function(req, res) {
	fs.readFile('myjsonfile.json', function(err, users) {
    if(err) throw err
    var dataParse = JSON.parse(users)
    var deleteUser = dataParse["user" + req.params.id]
    delete dataParse["user" + req.params.id]
    console.log("--->After deletion, user list:\n" + JSON.stringify(dataParse, null, 4) )
    res.end( "Deleted user: \n" + JSON.stringify(deleteUser, null, 4))
    fs.writeFile ("myjsonfile.json", JSON.stringify(dataParse, null, 4), function(err) {
      if (err) throw err
      console.log('complete delete user')
      }
    )
	})
}