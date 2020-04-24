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

let myTable = []
//INDEX ROUTE FOR PROJECTS
router.get('/projects', (req, res) => {
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

//CREATE ROUTE
router.post('/projects', (req, res) => {
    
    mysqlx.getSession(config)
        .then(session => {
            return session.getSchema('geograph').getTable('project')
                .insert(['name', 'client', 'location', 'start_date', 'end_date'])
                .values([req.body.name, req.body.client, req.body.location, req.body.start_date, req.body.end_date])
                .execute()
        })
        .catch(err => {
            console.log(err)
        })
})

//SHOW ROUTE FOR PROJECT - NEEDS TO SHOW ALL BOREHOLES FOR THAT PROJECT AND ALL INFORMATION FOR THAT PROJECT
router.get('/projects/:id', (req, res) => {
   mysqlx
    .getSession(config)
    .then(session => {
       return session.getSchema('geograph').getTable('project').select('name', 'client', 'location', 'start_date', 'end_date', 'project_id')
            .where('project_id = :id')
            .bind('id', req.params.id)
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
        .then(() => {
            return session.getSchema('geograph').getTable('borehole').select('borehole_id',  'borehole_type', 'start_date', 'end_date', 'coo_x', 'coo_y', 'coo_z', 'borehole_name', 'project_id')
                .where('project_id = :id')
                .bind('id', req.params.id)
                .execute(row => {
                    let data = {
                        borehole_id: row[0],
                        borehole_type: row[1],
                        start_date: row[2],
                        end_date: row[3],
                        coo_x: row[4],
                        coo_y: row[5],
                        coo_z: row[6],
                        borehole_name: row[7],
                        project_id: row[8]
                    }
                    myTable.push(data)
                })
        })
    }) 
    
    .then(() => {
        res.json(myTable)
       myTable = [] 
    })
    .catch(err => {
        console.log(err)
    })
})

//EDIT ROUTE 
router.get('/projects/:id/edit', (req, res) => {
    mysqlx.getSession(config)
        .then(session => {
            return session.getSchema('geograph').getTable('project').select('project_id', 'name', 'client', 'location', 'start_date', 'end_date')
            .where('project_id = :id')
            .bind('id', req.params.id)
            .execute(row => {
                let data = {
                    project_id: row[0],
                    name: row[1],
                    client: row[2],
                    location: row[3],
                    start_date: row[4],
                    end_date: row[5]
                }
                res.json(data)
            })
 
        })
       
})


//UPDATE ROUTE 
router.put('/projects/:id', (req, res) => {
    db.then(session => {
        session.getSchema('geograph')
        .getTable('project')
        .update()
        .where('project_id = ' + req.params.id)
        .set('name', req.body.name)
        .set('client', req.body.client)
        .set('location', req.body.location)
        .set('start_date', req.body.start_date)
        .set('end_date', req.body.end_date)
        .execute()
    })
    .catch(err => {
        console.log(err)
    })
})

//DELETE ROUTE - Need to delete all boreholes and data for that boreholes connected to projct
router.delete('/projects/:id', (req, res) => {
    db.then(session => {
        session.getSchema('geograph')
        .getTable('project')
        .delete()
        .where('project_id = ' + req.params.id)
        .execute()
    }) 
    .catch(err => {
        console.log(err)
    })
})

module.exports = router