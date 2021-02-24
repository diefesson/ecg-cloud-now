import api from './api'

export default {
    list: () => {
        return api.get(process.env.REACT_APP_ENDPOINT_TODOS_PACIENTES)
    },

    save: (user) => {
        return api.post('COLOCAR END POINT', user)
    }
}