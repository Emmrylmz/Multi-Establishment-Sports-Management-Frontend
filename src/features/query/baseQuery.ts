import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '../../utils/tokenManager';


const baseQuery = fetchBaseQuery({

baseUrl: `http://48.216.140.36/api`, // Adjust the base URL if needed

  prepareHeaders: async (headers) => {
    const token = await getToken('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});


export { baseQuery };
