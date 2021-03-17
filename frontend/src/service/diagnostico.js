import api from './api'

export default {
    list: () => {
        return api.get(process.env.REACT_APP_ENDPOINT_TODOS_PACIENTES)
    },

    listAppointmentPatient: (id) => {
        return api.get(process.env.REACT_APP_ENDPOINT_LIST_APPOINTMENTS_PATIENT + id).then().catch()
    }
}