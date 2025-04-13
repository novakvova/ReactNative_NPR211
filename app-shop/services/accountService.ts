import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import { ILogin, ILoginResponse } from '@/interfaces/account'

export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: createBaseQuery('account'),
  tagTypes: ['Account'],

  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILogin>({
      query: (data : ILogin) => {
        return {
          url: 'login',
          method: 'POST',
          body: data
        }
      },
    }),
  })
})

export const { useLoginMutation } = accountApi;