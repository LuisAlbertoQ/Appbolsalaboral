var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  dbConn.query('SELECT * FROM egresado',function(err,rows){
    if(err) {
        req.flash('error', err);
        res.render('index',{data:''});   
    }else {
        res.render('index',{data:rows});
    }
  });
});

router.post('/search', function(req, res, next) {
  let name=req.body.search;
  dbConn.query("SELECT * FROM egresado WHERE egs_nombres LIKE ?", ['%' + name + '%'], function(err, rows) {
    if(err) {
        req.flash('error', err);
        res.render('index',{data:''});   
    }else {
        res.render('index',{data:rows});
    }
  });
});

router.get('/admin/login', function(req, res, next) {
  res.render('login');
});

router.post('/admin/login',function(req, res,next){
  us_nombre=req.body.us_nombre;
  us_password=req.body.us_password;
  dbConn.query("SELECT * FROM usuario WHERE us_nombre='"+us_nombre+"' AND us_password='"+us_password+"'",function(err,rows)     {
    if(err) {
        //req.flash('error', err);  
        console.log(err);
    } else {
        console.log(rows);
        if(rows.length){
          req.session.idu=rows[0]["id"];
          req.session.us_nombre=rows[0]["us_nombre"];
          req.session.us_password=rows[0]["us_password"];
          
          req.session.admin=true;
          res.redirect("/admin/dashboard");
        }else{
          //req.flash('success', 'El usuario no existe'); 
          res.redirect("/");
        }
    }
  }) 
});

router.get('/admin/dashboard', function(req, res, next) {
  if(req.session.admin){
    res.render('admin/index');
  }
  else{
    res.redirect("login");
  }
});

router.get('/admin/logout',function(req, res){
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
