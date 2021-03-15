import api from './api'
import SuperTokensRequest from 'supertokens-website';

SuperTokensRequest.addAxiosInterceptors(api);

SuperTokensRequest.init({
    apiDomain: process.env.REACT_APP_BACKEND_ADRESS,
    withCredentials: true
});

const findById = async (id) => {
    const response = await api.get(process.env.REACT_APP_ENDPOINT_USER_BY_ID + id).
then().catch();

localStorage.setItem('username', response.data.user.username)
localStorage.setItem('id', response.data.user.userId)
localStorage.setItem('session', true)

 const type = response.data.user.type;

 if(type===0){
    localStorage.setItem('type', 0)
    window.location.replace("/home-paciente");
 }
 if(type===1){
    localStorage.setItem('type', 1)
    window.location.replace("/home-medico");
 }
}

const componentDidMount = async function () {
    const response = await api.get(process.env.REACT_APP_ENDPOINT_TEST_SESSION,
        {withCrendentials: true}).
    then(
    ).catch();
    
    findById(response.data.session.userId);
}

export default {
    list: () => {
        return api.get('COLOCAR END POINT')
    },

    save: (user) => {
        return api.post('COLOCAR END POINT', user)
    },

    logout: () => {
        return api.delete(process.env.REACT_APP_ENDPOINT_USER_LOGOUT)
    },

    redirect: () => {
       componentDidMount();
    },

    hasUser: (username,email) => {
        return api.get(process.env.REACT_APP_ENDPOINT_HAS_USER + username + '/' + email);
    },

    byId: (id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_USER_BY_ID + id)
    }
}