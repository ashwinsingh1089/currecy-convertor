import axios from "axios";

const baseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/";

export function request(endpoint){
   
    return new Promise((resolve, reject)=>{
        const url = `${baseUrl}${endpoint}`;
        axios.get(url).then(response =>resolve(response.data)).catch(err => {
            console.log(err);
            reject(err);
        })
    })
}