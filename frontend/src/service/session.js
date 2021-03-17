import axios from 'axios';
import SuperTokensRequest from 'supertokens-website';
import Redirect from './users'

SuperTokensRequest.addAxiosInterceptors(axios);

SuperTokensRequest.init({
    apiDomain: process.env.REACT_APP_BACKEND_ADRESS,
    withCredentials: true
});

export default{
    login : async (dados) => {
    try {
        let response = await axios({url: process.env.REACT_APP_BACKEND_ADRESS + 
            process.env.REACT_APP_ENDPOINT_CREATE_SESSION, 
            method: "post", data: dados });
            
        let data = await response.data;
        if(data.success == true){
            Redirect.redirect();            
            alert("Seja bem vindo!!");
            
        }
       else{
        }
    } catch (err) {
        if (err.response !== undefined && err.response.status === 401 || err.response.status === 403) {
            alert("Username ou senha incorretos!!")
        } 
    }
},
}
