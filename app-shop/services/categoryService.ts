import { createApi } from '@reduxjs/toolkit/query/react'
import { createBaseQuery } from '@/utils/createBaseQuery'
import { ICategoryCreate, ICategoryItem, ICategoryMutResult } from '@/interfaces/category'
import { serialize } from 'object-to-formdata';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: createBaseQuery('categories'),
  tagTypes: ['Categories'],

  endpoints: (builder) => ({

    getCategories: builder.query<ICategoryItem[], string | null>({
      query: (token: string | null) => {
        console.log('token', token)
        return {
          url: 'GetList',
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: ['Categories'],
    }),

    createCategory: builder.mutation<ICategoryMutResult, ICategoryCreate>({
      query: (model) => {
        console.log("Model", model);
        const formData = serialize(model);
        return {
          url: 'create',
          method: 'POST',
          headers: {
            Authorization: `Bearer ${model.token}`,
          },
          body: formData,
        }
      },
      invalidatesTags: ['Categories'],
    }),


  }),
})

export const { useGetCategoriesQuery, useCreateCategoryMutation } = categoryApi
