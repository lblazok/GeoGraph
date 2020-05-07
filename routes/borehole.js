const   express     = require('express'),
        router      = express.Router(),
        mysqlx      = require('@mysql/xdevapi') 

const config = {
    password: 'admin',
    user: 'admin',
    host: 'localhost',
    port: 33060,
    schema: 'geograph'
}

const db = mysqlx.getSession(config)

//CREATE ROUTE
router.post('/projects/:id/boreholes', (req, res) => {
    
})

module.exports = router