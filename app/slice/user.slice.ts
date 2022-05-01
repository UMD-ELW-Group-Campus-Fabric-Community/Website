import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils/localStrg";
import { UserActions } from "../_actions/user.actions";
import { ErrorResponse } from "../_constants/response.types";

import { UserState, initialUserState, User } from "../_constants/user.types";

import {
  loginAsync,
  registerAsync,
  updateUserAsync,
  revalidateTokenAsync
} from "../_reducers/user.thunk";

export const UserSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        console.log("HYDRATE", state, action);
        const data =
          typeof window !== "undefined"
            ? // @ts-ignore
              getLocalStorageWithExpire("user")
            : null;
        if (data === null) {
          return state;
        }
        return {
          ...state,
          ...data,
        };
      });

      // Logout
      builder
        .addCase(UserActions.LOGOUT_REQUEST, (state) => {
          removeLocalStorage("user");
          return {
            ...initialUserState,
          };
        })


      // Local storage
      builder
        .addCase(UserActions.LOAD_LOCAL_USER, (state) => {
          const data = getLocalStorage("user") as UserState;
          if (data === null) {
            return {
              ...state,
              status: "error"
            }
          }
          return {
            ...state,
            token: data.token,
            token_expiry: data.token_expiry,
            id: data.id,
            status: "loaded"
          }
        })

      // Login
      builder
        .addCase(loginAsync.fulfilled, (state, action) => {
          const { token, token_expiry, id } = action.payload.payload as UserState;
          setLocalStorage("user", { token, token_expiry, id });
          return {
            ...state,
            status: "loaded",
            token: token,
            token_expiry: token_expiry,
            id: id
          };
        })
        .addCase(loginAsync.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;
          return {
            ...state,
            status: "error",
            error: error.payload.message,
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
          const error = action.payload as ErrorResponse;
          return {
            ...state,
            status: "error",
            error: error.payload.message,
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
          const error = action.payload as ErrorResponse;
          return {
            ...state,
            status: "error",
            error: error.payload.message,
          }
        })
        .addCase(updateUserAsync.pending, (state) => {
          return {
            ...state,
            status: "loading",
          }
        });
      
      // Revalidate Token
      builder
        .addCase(revalidateTokenAsync.fulfilled, (state, action) => {
          const { token, token_expiry, id } = action.payload.payload as UserState;
          setLocalStorage("user", { token, token_expiry, id });
          return {
            ...state,
            status: "loaded",            
            token: token,
            tokenExpiration: token_expiry,
            id: id
          };
        })
        .addCase(revalidateTokenAsync.rejected, (state, action) => {
          const error = action.payload as ErrorResponse;
          return {
            ...state,
            status: "error",
          }
        })
        .addCase(revalidateTokenAsync.pending, (state) => {
          return {
            ...state,
            status: "loading",
          }
        });
  },
});

export default UserSlice.reducer;
