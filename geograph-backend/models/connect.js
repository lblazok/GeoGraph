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
    .then((session) => {
        return console.log(session.getTable('project'))
    })