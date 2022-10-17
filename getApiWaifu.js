const fs = require("fs").promises;
const path = require("path");
const axios = require("axios").default;


const data = axios.get("https://api.waifu.im/random");

data
.then((res) =>{
    // writeFile(res.data);
    // console.log(res.data);
});

const writeFile = async (data)=>{
    try {
        // await fs.writeFile('/data.txt);
        const dataJSON = JSON.stringify(data)
        await fs.writeFile(`${__dirname}/data.json`, dataJSON, 'utf-8');
    } catch (error) {
        console.log(error);
    }
}

const readFile = async()=>{
    try {
        const data = JSON.parse(await fs.readFile(path.resolve('data.json'), {
            encoding: 'utf-8'
        }));

        const viewData = data.images[0].url ? data.images[0].url : "Something wrong with JSON";

        console.log(viewData);  

    
    } catch (error) {
      console.log(error);  
    }
}

// readFile();
