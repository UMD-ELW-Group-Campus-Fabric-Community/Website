import { createAsyncThunk } from "@reduxjs/toolkit";

import { UserState } from "../_constants/user.types";
import { Response, ErrorResponse } from "../_constants/response.types";
import { UserActions } from "../_actions/user.actions";
import AuthService from "../_services/auth.service";


export const loginAsync = createAsyncThunk<
  Response,
  {
    email: string,
    password: string
  },
  { rejectValue: ErrorResponse }
>(
  UserActions.LOGIN_REQUEST,
  async ({ email, password }, { rejectWithValue }) => {
    const response = await AuthService.fetchLogin(email, password);
    if (response.status >= 200 && response.status < 300) {
      return response as Response;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  }
);

export const revalidateTokenAsync = createAsyncThunk<
  Response,
  {
    token: string;
    id: string;
  },
  { rejectValue: ErrorResponse }
>(
  UserActions.REVALIDATE_TOKEN_REQUEST,
  async ({ token, id }, { rejectWithValue }) => {
    const response = await AuthService.fetchRevalidateToken(token, id);
    if (response.status >= 200 && response.status < 300) {
      return response as Response;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  }
);

export const registerAsync = createAsyncThunk<
  Response,
  {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationId: number,
    privilegeId: number
  },
  { rejectValue: ErrorResponse }
>(
  UserActions.REGISTER_REQUEST,
  async ({ email, password, firstName, lastName, organizationId, privilegeId }, { rejectWithValue }) => {
    const response = await AuthService.fetchRegister(
      email,
      password,
      firstName,
      lastName,
      organizationId,
      privilegeId
    );
    if (response.status >= 200 && response.status < 300) {
      return response as Response;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  }
);

export const updateUserAsync = createAsyncThunk<
  Response,
  {
    user: UserState;
    password?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
  },
  { rejectValue: ErrorResponse }
>(
  UserActions.UPDATE_USER_REQUEST,
  async (
    { user, password, email, firstName, lastName },
    { rejectWithValue }
  ) => {
    const response = await AuthService.fetchUpdateUser(
      user,
      password,
      email,
      firstName,
      lastName
    );
    if (response.status >= 200 && response.status < 300) {
      return response as Response;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  }
);

export const getStatus = (state: UserState) => state.status;
