"use strict";

const fs = require("fs").promises;
const path = require("path");
const axios = require("axios").default;
const FormData = require('form-data');


const form = new FormData();


const uploadFile = async ()=>{
    await file();
    await postFileToAnonFile();
}


const file = async ()=>{
    const dataRead = await fs.readFile('./data.json');

    form.append('file', dataRead, 'data.json');

}

const postFileToAnonFile = async ()=>{

    try {
        const postData = await axios.post('https://api.anonfiles.com/upload', form, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    
        console.log(postData.data);
    
        await writeMetadataFile(postData.data);

    } catch (error) {
        if (error.response) { // get response with a status code not in range 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) { // no response
            console.log(error.request);
            // instance of XMLHttpRequest in the browser
            // instance ofhttp.ClientRequest in node.js
          } else { // Something wrong in setting up the request
            console.log('Error', error.message);
          }
          console.log(error.config);
    }
}


const writeMetadataFile = async (data)=>{
    const dataJSON = JSON.stringify(data);
    try {
        await fs.writeFile(`${__dirname}/pathForData.json`, dataJSON, 'utf-8')
    } catch (error) {
        console.log(error);
    }
}






// Execute post request
uploadFile()
.then(res=>{
    console.log(res);
})
.catch(err=>{
    console.log(err);
})
