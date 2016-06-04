var express = require('express')  
var body_parser = require('body-parser')
var app = express()

app.use(express.static('public'))  

app.set('view engine', 'pug')

app.use(body_parser.urlencoded({extended: false}))  
app.use(body_parser.json())

app.get('/', function (req, res) {  
    res.render('index')
})

app.get('/ajax', function (req, res) {  
    res.json({
        message: 'This comes from an AJAX call!'
    })
})

app.post('/ajax', function (req, res) {  
    var data = JSON.parse(req.body.data)
    res.json({
        message:
            `This comes from an AJAJ call! The message sent to the server was ${data.message}! `
            + `The banana was ${data.banana}.`
    })
})

app.put('/ajax', function (req, res) {  
    var data = JSON.parse(req.body.data)
    res.json({
        message:
            `This comes from an an AJAX PUT call! The message sent to the server was ${data.message}! `
            + `The banana was ${data.banana}.`
    })
})

app.listen(3000, function () {  
    console.log('Example app listening on port 3000!')
})
