const Express = require('express')
const BodyParser= require('body-parser')
const serv = Express();
serv.use(Express.static('dist'))
serv.use(BodyParser.json({ extended: true }))

const moongoclient = require('mongodb').MongoClient;
const mongoCLI = new moongoclient('mongodb+srv://stasikpersh:10987654321fF@cluster0.wbv9b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

async function server(){
    try{
        await mongoCLI.connect()
        const dataBase = mongoCLI.db('hair_saloon_data')
        const s_list = JSON.stringify((await dataBase.collection('s_list').find().toArray())[0])
        serv.get('/s', (req,res) => {
            res.send(s_list)
        })
        serv.get('/r', async(req,res)=>{
            const r_list = JSON.stringify((await dataBase.collection('r_list').find().toArray())[0])
            console.log(r_list)
            res.send(r_list)
        })
        serv.post('/r',(req,res)=>{
            if(!req.body)res.sendStatus(400)
            dataBase.collection('r_list').updateOne({},{$push:{records: req.body}})
            res.sendStatus(200)
        })
        serv.listen(3000, () =>{
            console.log('everythings fine we are on different levels', 3000)
        })
    }catch(err){
        console.log(err)
    }
}

server()