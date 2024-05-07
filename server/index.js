const express = require('express');
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const ParseServer = require('parse-server').ParseServer;
const wompi = require("./cloud/wompiCtrl");
const app = express();

dotenv.config();

const server = new ParseServer({
    databaseURI: process.env.DATABASE,
    cloud: './cloud/main.js',
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    serverURL: process.env.SERVER
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/', (req, res) => {
    res.send('Store API')
});
app.post('/paymentUpdate', (req, res) => {
    wompi.handleUpdate(req.body);
    res.send("ok")
});
(async () => {
    await server.start();
    app.use('/parse', server.app);
    app.listen(process.env.PORT, () => {
        console.log(`Server running on ${process.env.PORT}`);
    });
})();
