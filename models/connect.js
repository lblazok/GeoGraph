const mysqlx = require('@mysql/xdevapi')


const config = {
    password: 'admin',
    user: 'admin',
    host: 'localhost',
    port: 33060,
    schema: 'geograph'
}

mysqlx
    .getSession(config)
    .then(session => {
        console.log('connected')
        return session.sql('SELECT * FROM project WHERE name = "projekt2";')
            .execute(row => {
                console.log(row)
            })

    })

    .catch(err => {
        console.log(err)
    })



    