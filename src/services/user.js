import axiosInstance from './axios';

const userService = {
  logIn: async (email, password) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      bodyFormData.append('password', password);

      const login = await axiosInstance.post(`auth/login`, bodyFormData);
      const res = login.data;
      if (res.code !== 201) throw new Error('Credenciales incorrectas!');
      localStorage.clear();
      localStorage.setItem('token', res.data.token);
      return res;
    } catch (e) {
      throw e;
    }
  },

  signUp: async (email, password, username) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('email', email);
      bodyFormData.append('username', username);
      bodyFormData.append('password', password);

      const signup = await axiosInstance.post(`auth/signup`, bodyFormData);
      const response = signup.data;
      if (response.code !== 201) throw new Error(response.message);
      return response.data.data;
    } catch (e) {
      throw e.response.data;
    }
  },
};

export default userService;
