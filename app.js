const express = require(`express`);
const app = express();
const path = require(`path`);
const server = require(`http`).Server(app);
const io = require(`socket.io`)(server);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const session = require(`express-session`);
const dbInfos = require(`./db_informations`);

const port = process.env.PORT || 3000;

mongoose.connect(dbInfos.db_string, {}, (err)=>{
    if(err){
        console.log(err);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, `public`)));
app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `ejs`);
app.use(session({secret: `user`}));
require(`./config/passport`)(app);

const userRoutes = require(`./routes/userRoutes`)();
app.use(userRoutes);

require(`./socket.io_services/io.js`)(io);

server.listen(port, ()=>{
    console.log(`Services is running on port ${port}`);
});