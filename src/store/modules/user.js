import axios from 'axios';
import routes from '../../constants/routes';

export default {
  state: {
    username: 'Abbas',
    password: 'Abbas1234...',
    token: '',
  },

  actions: {
    async getToken(context) {
      const { username, password } = context.state;
      axios({
        method: 'post',
        url: routes.log_in,
        data: {
          username,
          password,
        },
        contentType: 'application/json',
        dataType: 'json',
      })
        .then(responce => {
          context.commit('login', responce.data.token);
        })
        .catch(err => console.log(err));
    },
  },

  mutations: {
    login(state, payload) {
      state.token = payload;
    },
  },

  getters: {
    token(state) {
      return state.token;
    },
  },
};
