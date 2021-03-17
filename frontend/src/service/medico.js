import api from './api'

export default {

    list: () => {
       return api.get(process.env.REACT_APP_ENDPOINT_LIST_DOCTORS).then().catch();
    },

    byId: (id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_USER_BY_ID + id)
    },

    listAppointmentMedic: (id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_LIST_APPOINTMENTS_MEDIC + id)
    }
}