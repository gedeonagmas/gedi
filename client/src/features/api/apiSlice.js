import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gedi.vercel.app/gym/app/v1", //this will be render api url + /gym/app/v1
  }),
  tagTypes: [
    "profile-info",
    "my-data",
    "get-history",
    "factory",
    "gallery",
    "class",
    "schedule",
    "blog",
    "price",
    "get-all-user",
    "notification",
    "trainer",
    "trainer-user-class-transaction",
    "all-groups",
    "all-users",
  ],
  endpoints: (builder) => ({
    //signup
    signup: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-user"],
    }),

    //login
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["get-all-users"],
    }),

    //forget password
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forgetPassword",
        method: "POST",
        body: data,
      }),
    }),

    //reset password
    resetPassword: builder.mutation({
      query: (data) => ({
        url: `/resetPassword?resetToken=${data.resetToken}`,
        method: "POST",
        body: data,
      }),
    }),

    //read profile info
    readProfileInfo: builder.query({
      query: () => ({
        url: "/readProfileInfo",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["profile-info"],
    }),

    readMyData: builder.query({
      query: (arg) => ({
        url: `/readMyData?id=${arg.id}`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["my-data"],
    }),

    updateProfileInfo: builder.mutation({
      query: (data) => ({
        url: `/updateProfileInfo?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    updateProfilePicture: builder.mutation({
      query: (data) => ({
        url: `/updateProfilePicture?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: `/changePassword?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["profile-info"],
    }),

    //create gallery
    createGallery: builder.mutation({
      query: (data) => ({
        url: `/gallery`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
          // "Content-Type": "multipart/form-data",
        },
      }),
      invalidatesTags: ["factory", "gallery"],
    }),

    //create class
    createClass: builder.mutation({
      query: (data) => ({
        url: `/class`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["factory", "class", "trainer-user-class-transaction"],
    }),

    //create blog
    createBlog: builder.mutation({
      query: (data) => ({
        url: `/blog`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["factory", "blog"],
    }),

    //create schedule
    createSchedule: builder.mutation({
      query: (data) => ({
        url: `/schedule`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["factory", "schedule"],
    }),

    //create price
    createPrice: builder.mutation({
      query: (data) => ({
        url: `/price`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["factory", "price"],
    }),

    //read gallery
    readFactory: builder.query({
      query: (arg) => ({
        url:
          arg.type === "gallery"
            ? `/gallery?${arg.query}`
            : arg.type === "blog"
            ? `/blog?${arg.query}`
            : arg.type === "schedule"
            ? `/schedule?${arg.query}`
            : arg.type === "class"
            ? `/class?${arg.query}`
            : arg.type === "price"
            ? `/price?${arg.query}`
            : null,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: [
        "factory",
        "gallery",
        "blog",
        "class",
        "schedule",
        "price",
      ],
    }),

    //read gallery
    updateFactory: builder.mutation({
      query: (data) => ({
        url:
          data.type === "gallery"
            ? `/gallery?id=${data.id}`
            : data.type === "blog"
            ? `/blog?id=${data.id}`
            : data.type === "schedule"
            ? `/schedule?id=${data.id}`
            : data.type === "class"
            ? `/class?id=${data.id}`
            : data.type === "price"
            ? `/price?id=${data.id}`
            : null,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: [
        "factory",
        "gallery",
        "blog",
        "class",
        "schedule",
        "price",
        "trainer-user-class-transaction",
      ],
    }),

    //delete factory
    deleteFactory: builder.mutation({
      query: (data) => ({
        url:
          data.type === "gallery"
            ? `/gallery?id=${data.id}`
            : data.type === "blog"
            ? `/blog?id=${data.id}`
            : data.type === "schedule"
            ? `/schedule?id=${data.id}`
            : data.type === "class"
            ? `/class?id=${data.id}`
            : data.type === "price"
            ? `/price?id=${data.id}`
            : null,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: [
        "factory",
        "gallery",
        "blog",
        "class",
        "schedule",
        "price",
        "trainer-user-class-transaction",
      ],
    }),

    //get all users
    getAllUser: builder.query({
      query: () => ({
        url: "/getAllUsers",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["get-all-user"],
    }),

    //delete user
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/user?id=${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["get-all-user", "trainer-user-class-transaction"],
    }),

    //create transaction
    createTransaction: builder.mutation({
      query: (data) => ({
        url: "/transaction",
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["transaction", "trainer-user-class-transaction"],
    }),

    //read transaction
    readTransaction: builder.query({
      query: () => ({
        url: "/transaction",
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["transaction"],
    }),

    //update transaction
    updateTransaction: builder.mutation({
      query: (data) => ({
        url: `/transaction?id=${data.id}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["transaction", "trainer-user-class-transaction"],
    }),

    //delete transaction
    deleteTransaction: builder.mutation({
      query: (data) => ({
        url: `/transaction?id=${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["transaction", "trainer-user-class-transaction"],
    }),

    //create notification
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notification",
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["notification"],
    }),

    //read notification
    readNotification: builder.query({
      query: (arg) => ({
        url: `/notification?type=${arg.type}`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["notification"],
    }),

    //update notification
    updateNotification: builder.mutation({
      query: (data) => ({
        url: `/notification?id=${data.id}&userId=${data.userId}`,
        method: "PATCH",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["notification"],
    }),

    //delete notification
    deleteNotification: builder.mutation({
      query: (data) => ({
        url: `/notification?id=${data.id}`,
        method: "DELETE",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["notification"],
    }),

    //delete notification
    joinClass: builder.mutation({
      query: (data) => ({
        url: `/join?id=${data.id}`,
        method: "POST",
        body: data,
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      invalidatesTags: ["class", "factory", "my-data"],
    }),

    //read trainer
    readTrainer: builder.query({
      query: (arg) => ({
        url: `/trainer`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["trainer"],
    }),

    //create transaction
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/sendEmail",
        method: "POST",
        body: data,
      }),
      providesTags: ["send-email"],
    }),

    //read class-users-transaction
    readClassTransactionUsers: builder.query({
      query: (arg) => ({
        url: `/class-transaction-user`,
        method: "GET",
        headers: {
          authorization: localStorage.getItem("gymate-jwt-data-gedeon"),
        },
      }),
      providesTags: ["trainer-user-class-transaction"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useReadProfileInfoQuery,
  useReadMyDataQuery,
  useUpdateProfileInfoMutation,
  useUpdateProfilePictureMutation,
  useChangePasswordMutation,

  useReadFactoryQuery,
  useUpdateFactoryMutation,
  useDeleteFactoryMutation,

  useCreateBlogMutation,
  useCreateClassMutation,
  useCreateGalleryMutation,
  useCreateScheduleMutation,
  useCreatePriceMutation,

  useGetAllUserQuery,
  useDeleteUserMutation,

  useCreateTransactionMutation,
  useReadTransactionQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,

  useCreateNotificationMutation,
  useReadNotificationQuery,
  useUpdateNotificationMutation,
  useDeleteNotificationMutation,
  useJoinClassMutation,

  useReadTrainerQuery,
  useSendEmailMutation,
  useReadClassTransactionUsersQuery,
} = apiSlice;
