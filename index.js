import express from 'express'
import { conectedDb } from './db/conected.js'
import { userRouter } from './src/modules/user/user.Router.js'
import { comRouter } from './src/modules/companey/companey.Router.js'
import { jobRouter } from './src/modules/Job/job.Router.js'
import { config } from 'dotenv'
import { applicationRouter } from './src/modules/application/application.Router.js'


config();

const app = express()
const port = process.env.port

conectedDb()




app.use(express.json())

app.use('/application', applicationRouter)

app.use('/user', userRouter)

app.use('/companey',comRouter)

app.use('/job',jobRouter)



app.use((err, req, res, next) => {
    res.status(err["cause"]).json({ "error": "global error handler", "err": err.message })
})


app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))



