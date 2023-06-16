const FinalUpdate = require('./FinalUpdates.json')
const axios = require('axios')
const SkipIdx = new Set();
SkipIdx.add(80);
SkipIdx.add(123);
SkipIdx.add(155);

const insertDataIntoCollegeCrud = async(idx) => {
    try{
        await axios.post("http://localhost:3000/college", FinalUpdate[idx]);
    } catch (e) {
        console.log(FinalUpdate[idx].college_name)
    }
}

// insert all one by one
const makeApiCalls = async () => {
    for(let i = 0; i < FinalUpdate.length; i++){
        if(SkipIdx.has(i)) {
            console.log(`Skiped ${i} index`);
            continue;
        }
        await insertDataIntoCollegeCrud(i);
        console.log("Data Insertion Completed for index "+i)
    }
}

// makeApiCalls()

insertDataIntoCollegeCrud(82)