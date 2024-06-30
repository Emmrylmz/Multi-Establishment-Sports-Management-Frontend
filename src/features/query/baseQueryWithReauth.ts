import { handleLogout } from '../auth/auth.actions';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';
import { getToken, setToken } from '../../utils/tokenManager';
import { baseQuery } from './baseQuery';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);
  
    if (result.error && result.error.status === 401) {
      // Token might be expired, try refreshing it
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshToken = await getToken('refresh_token');
          if (refreshToken) {
            const refreshResult = await baseQuery({
              url: '/auth/refresh_token',
              method: 'POST',
              body: { refresh_token: refreshToken },
            }, api, extraOptions);
  
            if (refreshResult.data) {
              const newAccessToken = refreshResult.data.access_token;
              await setToken('access_token', newAccessToken);
              // Retry the original query with new access token
              result = await baseQuery(args, api, extraOptions);
            } else {
              await handleLogout(api);
            }
          } else {
            await handleLogout(api);
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    }
  
    return result;
  };
  

  export { baseQueryWithReauth }