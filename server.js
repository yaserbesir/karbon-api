const express = require("express")
const cors = require("cors")

const factors = require("./factors")
const elecFactors = require("./elecFactors")

const app = express()

app.use(cors())
app.use(express.json())

app.post("/calculate", (req, res) => {

const { values, country } = req.body

if(!values || typeof values !== "object"){
 return res.status(400).json({ error:"Invalid data" })
}

let total = 0
let results = {}

for(const key in values){

let factor

// electricity için ülke bazlı factor
if(key === "electricity"){

const countryCode = country || "TR"

if(!elecFactors[countryCode]){
 return res.status(400).json({ error:"Invalid country code" })
}

factor = elecFactors[countryCode].factor

}else{

factor = factors[key]

}

if(!factor) continue

const emission = values[key] * factor

results[key] = emission

total += emission

}

res.json({
success:true,
totalEmission: total,
breakdown: results
})

})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
console.log("API running on port", PORT)
})
