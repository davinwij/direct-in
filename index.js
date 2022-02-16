const express = require('express')
const { Client } = require('pg')
const { redirect } = require('statuses')
const swal = require('sweetalert')
const exphbs=require('express-handlebars');


const app = express()

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))

const port = 5000

const db = require('./connection/db');
const { link } = require('fs');

app.set('view engine', 'hbs')

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})

app.get('/', function(req, res){
    res.render('index')
})

app.get('/done', function(req, res){
    res.render('done')
})

app.post('/short', function(req, res){
    let {url, alias} = req.body

    let query = `INSERT INTO tb_link (full_link, alias) VALUES ('${url}', '${alias}')`



    db.connect((err, client, done) =>{
        if(err) throw err

        client.query(query, (err, result)=>{
            done()
            if(err) throw err           
            res.render('done', {
                alias: alias,
                
            })
        })
    })
})
