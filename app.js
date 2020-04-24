const   express = require('express'),
        app     = express(),
        PORT    = process.env.PORT || 4000,
        cors    = require('cors'),
        bodyParser = require('body-parser'),
        projectRoute = require('./routes/project')

const mysqlx = require('@mysql/xdevapi')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(projectRoute)




app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT)
})