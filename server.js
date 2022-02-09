const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

//Middlewares
app.use(morgan('dev'))
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
    //server can understand json format
app.use(bodyParser.json())

//array de objetos (criptomonedas)
var criptomonedas = [
    { id: 1, nombre: "Bitcoin", usd: 43272.48 },
    { id: 2, nombre: "Ethereum", usd: 3054.65 },
    { id: 3, nombre: "Binance Coin", usd: 418.84 }
];

app.get('/crypto', (req, res) => {
    res.json(criptomonedas);
})

app.post('/crypto', (req, res) => {
    let { nombre, usd } = req.body;
    //console.log(typeof(usd));
    usd = Number(usd);
    //console.log(typeof(usd));
    console.log(isNaN(usd));
    //control tipo de dato (number) en variable usd
    if (isNaN(usd)) {
        //res.status(400).json({
        res.json({
            ok: false,
            message: 'Error tipo de dato',
        })
    } else {
        let err = 0;
        for (let i = 0; i < criptomonedas.length; i++) {
            //console.log(nombre.toUpperCase(), "-----", criptomonedas[i].nombre.toUpperCase());
            if (nombre.toUpperCase() == criptomonedas[i].nombre.toUpperCase()) {
                err = 1
                break
            }
        }
        if (err == 1) {
            //res.status(400).json({
            res.json({
                ok: false,
                message: 'La criptomoneda ya está en la lista',
            })
        } else {
            //id autoincrement
            //añadir nuevos datos al array
            criptomonedas.push({ id: (criptomonedas.length) + 1, nombre, usd: usd.toFixed(2) })
                //response
            res.json({
                ok: true,
                message: "Criptomoneda Registrada",
                nombre
            })
        }
    }
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server on port ${port}`));