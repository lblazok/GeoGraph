if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const   express = require('express'),
        app     = express(),
        PORT    = process.env.PORT || 4000,
        cors    = require('cors'),
        bodyParser = require('body-parser'),
        projectRoute = require('./routes/project'),
        authRoute   = require('./routes/auth'),
        passport    = require('passport'),
        session     =require('express-session')

const initialzePassport = require('./passport-config')

const config = {
    password: 'admin',
    user: 'admin',
    host: 'localhost',
    port: 33060,
    schema: 'geograph'
}

//functions for passport userByEmail and userByID
const getUserByID = id => {
    return new Promise ((resolve, reject) => {
    db.then(session => {
        return session.getSchema('geograph')
            .getTable('user')
            .select('id', 'username', 'email', 'password')
            .where('id = :id')
            .bind('id', id)
            .execute(row => {
                let user = {
                id: row[0],
                username: row[1],
                email: row[2],
                password: row[3]
                }
                resolve(user)
            })
        })
        
        .catch(err => {
            console.log(err)
        })
    })

}

initialzePassport(passport)
    
const mysqlx = require('@mysql/xdevapi')
const db = mysqlx.getSession(config)
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(projectRoute)
app.use(authRoute)

app.get('/user', async (req, res) => {
    const ans = await getUserByID(req.body.id)
    console.log(ans)
    res.json(ans)
})



app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})