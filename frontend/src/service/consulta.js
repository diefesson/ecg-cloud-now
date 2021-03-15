import api from './api'

export default {
    list: () => {
        return api.get(process.env.REACT_APP_ENDPOINT_LIST_APPOINTMENTS);
    },
    
    listByTime: (id, date) => {
        return api.get(process.env.REACT_APP_ENDPOINT_LIST_TIMES_APPOINTMENTS + id +"&date=" + date);
    },

    byId: (id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_BY_ID_APPOINTMENT + id);
    },

    save: (medicId,patientId, time) => {
        return api.post(process.env.REACT_APP_ENDPOINT_CREATE_APPOINTMENT, {medicId, patientId, time}).
        then().catch();
    },

    delete: (id) => {
        return api.delete(process.env.REACT_APP_ENDPOINT_DELETE_APPOINTMENT + id);
    },
}