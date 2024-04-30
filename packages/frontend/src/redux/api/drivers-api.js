import { commonApi, DELETE, GET, POST, PUT } from '.';
const DRIVERS_API = '/api/v1/driver';

export const adsApi = commonApi.injectEndpoints({
  endpoints: (build) => ({
    addAds: build.mutation({
      query: (data) => ({
        url: `${DRIVERS_API}`,
        method: POST,
        data: data,
      }),
      invalidatesTags: ['adsApi'],
    }),
    getAds: build.query({
      query: ({ id }) => ({
        url: `${DRIVERS_API}/${id}`,
        method: GET,
      }),
      providesTags: ['adsItem'],
    }),
    updateAds: build.mutation({
      query: ({ id, data }) => ({
        url: `${DRIVERS_API}/${id}`,
        method: PUT,
        data: data,
      }),
      invalidatesTags: ['adsUpdate', 'adsApi'],
    }),
    deleteAds: build.mutation({
      query: (id) => ({
        url: `${DRIVERS_API}/${id}`,
        method: DELETE,
      }),
      invalidatesTags: ['adsApi'],
    }),
    searchAds: build.query({
      query: () => ({
        url: `${DRIVERS_API}`,
        method: GET,
      }),
      providesTags: ['adsApi'],
    }),
  }),
});

export const {
  useAddAdsMutation,
  useGetAdsQuery,
  useUpdateAdsMutation,
  useDeleteAdsMutation,
  useSearchAdsQuery,
} = adsApi;
