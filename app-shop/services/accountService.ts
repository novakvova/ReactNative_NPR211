import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import { ILogin, ILoginResponse, IRegister } from '@/interfaces/account'

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
    register: builder.mutation<ILoginResponse, IRegister>({
      query: (data : IRegister) => {
        const formData = new FormData();
        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('email', data.email);
        formData.append('password', data.password);
        //@ts-ignore
        formData.append('image', data.image);

        return {
          url: 'register',
          method: 'POST',
          body: formData
        }
      },
    }),
  })
})

export const { useLoginMutation, useRegisterMutation } = accountApi;