import axios from "axios";

export const list = () => {
    axios.get("https://randomuser.me/api/?results=1").then(res=>{
        console.log("res--",res);
        return {
            type : 'List',
            payload : res.data.results
        }
    }).catch(err=>{
        console.log("error",err);
    });
}