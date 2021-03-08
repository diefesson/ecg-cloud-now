import api from './api'
// import SuperTokensRequest from 'supertokens-website';

// SuperTokensRequest.addAxiosInterceptors(api);

// SuperTokensRequest.init({
//     apiDomain: process.env.REACT_APP_BACKEND_ADRESS,
//     withCredentials: true
// });

export default {
    list: () => {
        return api.get(process.env.REACT_APP_ENDPOINT_LIST_APPOINTMENTS);
    },

    save: (appointment) => {
        return api.post(process.env.REACT_APP_ENDPOINT_CREATE_APPOINTMENT, appointment);
    },

    delete: (user_id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_DELETE_APPOINTMENT + user_id);
    },
}