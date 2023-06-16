const axios = require('axios');
const { sleep } = require('sleep');
const DataFrom  = require("./output.js") 
const DataFromJson  = require("./FinalUpdates.json") 
const fs = require("fs")

async function addLocation(colleges) {
  const api_key = "AIzaSyCtAtFTYTpduPIXVcR4eMAnkSI_6hTnc7M";
  const result = [];
  
  for (const college of colleges) {
    const college_name = college.college_name;
    console.log(college_name)
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${college_name}&key=${api_key}`);
    const data = response.data;
    
    if (data.status === "OK") {
      const lat = data.results[0].geometry.location.lat;
      const lng = data.results[0].geometry.location.lng;
      college.Cordinate = {lat: lat, lng: lng};
      result.push(college);
      console.log(`${college_name}: (${lat}, ${lng})`);
    } else {
      college.Cordinate = {lat: 0, lng: 0};
      result.push(college);
      console.log(`${college_name}: Unable to obtain location.`);
    }
  }
  
  console.log(result);
  const dataC = JSON.stringify(result);
  await fs.writeFileSync("./FinalUpdates.json", dataC)

}

// Example usage:
// const colleges = [{college_name: "Harvard University"}, {college_name: "MIT"}];
for (const dataW of DataFromJson) {
  console.log(dataW)
}
