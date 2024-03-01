var { Userdb /*, login*/ } = require('../model/model');
global.chk=0;
//create and save new user
exports.createUser = (req,res)=>{
   //validate request
   if (!req.body){
    res.status(400).send({message:"Content can not be empty"});
    return;
   }

   //new user
   const user = new Userdb({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
   })

   //save user in the database
   user
    .save(user)
    .then(data =>{
        //res.send(data)
        res.redirect('/login-user')
    })
    .catch(err =>{
        res.status(500).send({
           message:err.message || "Some error occured while creating a create operation"
        });
    });
}
exports.createLogin = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    const enteredEmail = req.body.email;
    const enteredPassword = req.body.password;
    // Find a user with the entered email and password
    Userdb.findOne({ email: enteredEmail, password: enteredPassword })
        .then(user => {
            if (user) {
                // Login successful, redirect or do other actions
                chk =1;
                res.redirect('/movie-user');
                setTimeout(() => {
                    chk = 0;
                }, 2000); // 2000 milliseconds = 2 seconds
            } else {
                // No matching user found
                //res.status(401).send({ message: "Invalid login credentials" });
                res.redirect('/login-user');

            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while processing the login operation"
            });
        });
};

//retrieve and return all users/retrieve and return a single user
exports.find = (req,res)=>{

    if(req.query.id){
         const id = req.query.id;
         Userdb.findById(id)
         .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id "+id})
            }else{
                res.send(data)
            }
         })
         .catch(err =>{
            res.status(500).send({message:"Error retrieving user with id"+id})
         })
    }else{
        Userdb.find()
    .then(user =>{
        res.send(user)
    })
    .catch(err=>{
        res.status(500).send({message:err.message || "Error occured whie retrieving user information"})
    })
    }

    
}

//upadte a new identified user by user id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message: "Data to update cant be empty"})
    }
    const id =req.params.id;
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message: `Cannot update user with ${id},Maybe User not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Updating User information"})
    })
}

//delete a user with specified user id in request
exports.delete = (req,res)=>{
   const id = req.params.id;
   Userdb.findByIdAndDelete(id)
   .then(data=>{
    if(!data){
        res.status(404).send({message: `cannot delete with id ${id}..maybe id is wrong`})
    }else{
        res.send({
            message:"User was deleted successfully!"
        })
    }
   })
   .catch(err =>{
      res.status(500).send({
        message:"Could not delete user with id="+id
      });
   });
}