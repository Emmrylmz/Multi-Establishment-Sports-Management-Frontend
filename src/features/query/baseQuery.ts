import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `http://192.168.209.139:8000/api`, // Adjust the base URL if needed
  prepareHeaders: async (headers) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error.status === 401) {
      // Handle token refresh logic here...
    } else if (result.error.status === 500) {
      // Log and handle server errors
      console.error('Internal Server Error:', result.error);
    } else if (result.error.status === 'PARSING_ERROR') {
      // Handle JSON parsing errors
      console.error('JSON Parse Error:', result.error);
    }
  }

  return result;
};

export { baseQuery, baseQueryWithReauth };
