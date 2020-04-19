const   express = require('express'),
        app     = express(),
        PORT    = process.env.PORT || 4000,
        cors    = require('cors'),
        bodyParser = require('body-parser')

const mysqlx = require('@mysql/xdevapi')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const config = {
    password: 'admin',
    user: 'admin',
    host: 'localhost',
    port: 33060,
    schema: 'geograph'
}








let myTable = []
//INDEX ROUTE FOR PROJECTS
app.get('/projects', (req, res) => {
    const conn = mysqlx.getSession(config)

    conn.then((session) => {
        return session.getSchema('geograph').getTable('project').select('name', 'client', 'location', 'start_date', 'end_date', 'project_id')
            .execute(row => {
                let data = {
                    name: row[0],
                    client: row[1],
                    location: row[2],
                    start_date: row[3],
                    end_date: row[4],
                    project_id: row[5]
                }
                myTable.push(data)
            })
        .then(() =>{
            res.json(myTable)
            myTable = []
        })          
    })
    .catch(err => {
        console.log(err)
    })
})

//SHOW ROUTE FOR PROJECT - NEEDS TO SHOW ALL BOREHOLES FOR THAT PROJECT AND ALL INFORMATION FOR THAT PROJECT
app.get('/projects/:id', (req, res) => {
   mysqlx
    .getSession(config)
    .then(session => {
        myTable = session.getSchema('geograph').getTable('project')
        return myTable
    }) 
    .then((myTable) => {
        return myTable.select('name', 'client', 'location', 'start_date', 'end_date')
                .where('project_id = :id')
                .bind('id', req.params.id)
                .execute()
    })
    .then(results => {
        let rezultat = results.fetchAll()
        res.json(rezultat)
        
    })
})

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})