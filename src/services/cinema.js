import axiosInstance from './axios';

const cinemaService = {
  today: async (page = 0) => {
    try {
      const today = await axiosInstance.get(`cinema/today?page=${page}`);
      const res = today.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },

  todayId: async (id) => {
    try {
      const today = await axiosInstance.get(`cinema/today/${id}`);
      const res = today.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },

  movies: async (page = 0) => {
    try {
      const movies = await axiosInstance.get(
        `cinema/movies?page=${page}&limit=${4}`
      );
      const res = movies.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },

  booking: async (page = 0) => {
    try {
      const booking = await axiosInstance.get(
        `cinema/booking?page=${page}&limit=${4}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const res = booking.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },

  categories: async () => {
    try {
      const categories = await axiosInstance.get(`cinema/categories`);
      const res = categories.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },

  moviesByCategory: async (category, page) => {
    try {
      const movies = await axiosInstance.get(
        `cinema/movies/${category}?page=${page}&limit=${4}`
      );
      const res = movies.data;
      if (res.code !== 200) throw new Error('Something went wrong');
      return res.data;
    } catch (e) {
      throw e;
    }
  },
  reserve: async (schedule, quantity) => {
    try {
      const bodyFormData = new FormData();
      bodyFormData.append('scheduleId', schedule);
      bodyFormData.append('quantity', quantity);

      const reserve = await axiosInstance.post(`cinema/reserve`, bodyFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const response = reserve.data;
      if (response.code !== 200) throw new Error(response.message);
      return response.data;
    } catch (e) {
      throw e.response.data;
    }
  },
  deleteReserve: async (schedule) => {
    try {
      const reserve = await axiosInstance.delete(`cinema/reserve/${schedule}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const response = reserve.data;
      console.log(response);
      if (response.code !== 200) throw new Error(response.message);
      return response.data;
    } catch (e) {
      throw e;
    }
  },
};

export default cinemaService;
