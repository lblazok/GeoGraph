const   express     = require('express'),
        router      = express.Router(),
        mysqlx      = require('@mysql/xdevapi'),
        bcrypt      = require('bcrypt')

const config = {
    password: 'admin',
    user: 'admin',
    host: 'localhost',
    port: 33060,
    schema: 'geograph'
}

const db = mysqlx.getSession(config)

router.post('/signup',  (req, res) => {
    const hashPassword =  bcrypt.hash(req.body.password, 10)
    .then(hashPassword => {
        db.then(session => {
            return session.getSchema('geograph')
            .getTable('user')
            .insert(['username', 'email', 'password'])
            .values([req.body.username, req.body.email, hashPassword])
            .execute()
    })   
    .then(() => {
        res.sendStatus(202)
 
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(402)
    })
   })
    
})


module.exports = router