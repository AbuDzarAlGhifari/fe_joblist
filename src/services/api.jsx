import axios from 'axios';
import config from '@/config';

export const fetchJobs = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const response = await axios.get(`${config.BASE_URL_API}/job`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data;
};
