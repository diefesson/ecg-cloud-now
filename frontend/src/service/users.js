import api from './api'

export default {
    list: () => {
        return api.get('COLOCAR END POINT')
    },

    save: (user) => {
        return api.post('COLOCAR END POINT', user)
    }
}