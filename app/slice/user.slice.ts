import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { UserState, initialUserState } from "../_constants/user.types";

import {
  loginAsync,
  registerAsync,
  updateUserAsync,
} from "../_reducers/user.thunk";

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        // const data =
        //   typeof window !== "undefined"
        //     ? // @ts-ignore
        //       JSON.parse(localStorage.getItem("user"))
        //     : null;
        return {
          ...state,
          // // @ts-ignore
          // token: data?.token,
          // // @ts-ignore
          // user_name: data?.user_name,
          // // @ts-ignore
          // user_id: data?.user_id,
        };
      });

      // Login
      builder
        .addCase(loginAsync.fulfilled, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "loaded",
          };
        })
        .addCase(loginAsync.rejected, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "error",
          }
        })
        .addCase(loginAsync.pending, (state) => {
          return {
            ...state,
            status: "loading",
          }
        });

      // Register
      builder
        .addCase(registerAsync.fulfilled, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "loaded",
          };
        })
        .addCase(registerAsync.rejected, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "error",
          }
        })
        .addCase(registerAsync.pending, (state) => {
          return {
            ...state,
            status: "loading",
          }
        });
      
      // Update User
      builder
        .addCase(updateUserAsync.fulfilled, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "loaded",
          };
        })
        .addCase(updateUserAsync.rejected, (state, action) => {
          const { payload } = action;
          return {
            ...state,
            status: "error",
          }
        })
        .addCase(updateUserAsync.pending, (state) => {
          return {
            ...state,
            status: "loading",
          }
        });
        
  },
});

export default UserSlice.reducer;
