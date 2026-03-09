const express = require("express")
const cors = require("cors")
const factors = require("./factors")

const app = express()

app.use(cors())
app.use(express.json())

const API_KEY = "AGROFIELD_SECURE_KEY_2024"

app.post("/calculate",(req,res)=>{

const apiKey = req.headers["x-api-key"]

if(apiKey !== API_KEY){
return res.status(403).json({
error:"Unauthorized"
})
}

const {values}=req.body

let results={}
let total=0

for(const key in values){

const factor = factors[key]

if(!factor) continue

const emission = values[key]*factor

results[key]=emission

total+=emission

}

res.json({
results,
total
})

})

const PORT = process.env.PORT || 10000

app.listen(PORT,()=>{
console.log("API running")
})

app.get("/",(req,res)=>{
res.send("Karbon API çalışıyor")
})
