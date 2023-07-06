var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/categorias', function(req, res, next) {
    dbConn.query('SELECT * FROM categorias ORDER BY id desc',function(err,rows){
        if(err) {
            req.flash('error', err);
            res.render('admin/categorias',{data:''});   
        }else {
            res.render('admin/categorias',{data:rows});
        }
    });
});

router.get('/categorias-add', function(req, res, next) {
    res.render('admin/categorias-add');
});

router.post('/categorias-add', function(req, res, next) {
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;
    //console.log(nombre);

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }
    dbConn.query('INSERT INTO categorias SET ?', form_data, function(err, result) {
        if (err) {
            req.flash('error', err);
        }else {                
            req.flash('success', 'Categoria registrada satisfactoriamente');
            res.redirect('../admin/categorias');
        }
    })
    
});

router.get('/categorias-edit/(:id)', function(req, res, next) {
    let id = req.params.id;
    //console.log(id);
    dbConn.query('SELECT * FROM categorias WHERE id='+id,function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna categoria tiene el id = '+id)
            res.redirect('admin/categorias')
        }
        else {
            res.render('admin/categorias-edit', {
                id: rows[0].id,
                nombre: rows[0].nombre,
                descripcion: rows[0].descripcion
            })
        }
    })
});

router.post('/categorias-edit/:id', function(req, res, next) {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let descripcion = req.body.descripcion;

    var form_data = {
        nombre: nombre,
        descripcion: descripcion
    }
    dbConn.query('UPDATE categorias SET ? WHERE id='+id,form_data,function(err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Categoria actualizada correctamente');
            res.redirect('../categorias');
        }
    })
    
});

router.get('/categorias-del/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM categorias WHERE id='+id,function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('../categorias')
        } else {
            req.flash('success', 'Registro eliminado con ID = ' + id)
            res.redirect('../categorias')
        }
    })
})




router.get('/oferta_laboral', function(req, res, next) {
    dbConn.query('SELECT * FROM oferta_laboral ORDER BY id desc',function(err,rows){
        if(err) {
            req.flash('error', err);
            res.render('admin/oferta_laboral',{data:''});   
        }else {
            res.render('admin/oferta_laboral',{data:rows});
        }
    });
});

router.get('/oferta_laboral-add', function(req, res, next) {
    res.render('admin/oferta_laboral-add');
});

router.post('/oferta_laboral-add', function(req, res, next) {
    let descripcion = req.body.descripcion;
    let empresa = req.body.empresa;
    //console.log(nombre);

    var form_data = {
        descripcion: descripcion,
        empresa: empresa
    }
    dbConn.query('INSERT INTO oferta_laboral SET ?', form_data, function(err, result) {
        if (err) {
            req.flash('error', err);
        }else {                
            req.flash('success', 'Categoria registrada satisfactoriamente');
            res.redirect('../admin/oferta_laboral');
        }
    })
    
});

router.get('/oferta_laboral-edit/(:id)', function(req, res, next) {
    let id = req.params.id;
    //console.log(id);
    dbConn.query('SELECT * FROM oferta_laboral WHERE id='+id,function(err, rows, fields) {
        if(err) throw err
        if (rows.length <= 0) {
            req.flash('error', 'Ninguna categoria tiene el id = '+id)
            res.redirect('admin/oferta_laboral')
        }
        else {
            res.render('admin/oferta_laboral-edit', {
                id: rows[0].id,
                descripcion: rows[0].descripcion,
                empresa: rows[0].empresa
            })
        }
    })
});

router.post('/oferta_laboral-edit/:id', function(req, res, next) {
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let empresa = req.body.empresa;

    var form_data = {
        descripcion: descripcion,
        empresa: empresa
    }
    dbConn.query('UPDATE oferta_laboral SET ? WHERE id='+id,form_data,function(err, result) {
        if (err) {
            req.flash('error', err);
        } else {
            req.flash('success', 'Categoria actualizada correctamente');
            res.redirect('../oferta_laboral');
        }
    })
    
});

router.get('/oferta_laboral-del/(:id)', function(req, res, next) {
    let id = req.params.id;
    dbConn.query('DELETE FROM oferta_laboral WHERE id='+id,function(err, result) {
        if (err) {
            req.flash('error', err)
            res.redirect('../oferta_laboral')
        } else {
            req.flash('success', 'Registro eliminado con ID = ' + id)
            res.redirect('../oferta_laboral')
        }
    })
})
module.exports = router;