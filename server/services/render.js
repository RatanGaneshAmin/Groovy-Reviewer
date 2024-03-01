const axios = require ('axios');

exports.homeRoutes = (req,res) =>{
    //make a get request to /api/users
    axios.get('http://localhost:3000/api/users')
    .then(function(response){
        //console.log(response)
        res.render('index',{users:response.data})
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.login =(req,res) =>{
    res.render('login');
}

exports.signup =(req,res) =>{
    res.render('signup');
}

exports.movie =(req,res) =>{
    axios.get('http://localhost:3000/api/users')
    res.render('movie');
}

exports.update_user =(req,res) =>{
    axios.get('http://localhost:3000/api/users',{params : {id : req.query.id}})
    res.render('update_user');
}