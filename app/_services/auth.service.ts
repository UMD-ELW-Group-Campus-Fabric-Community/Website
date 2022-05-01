import { UserState } from "../_constants/user.types";
import { Response, ErrorResponse } from "../_constants/response.types";

const fetchLogin = async (email: string, password: string) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };
  return await fetch(`${process.env.AUTH_URL}/login`, request)
    .then(_handleResponse)
    .then((response) => {
      return {
        status: response.status,
        payload: {
          id : response.payload.body.user_id,
          token: response.payload.body.token,
          token_expiry: response.payload.body.token_expiry
        }
      } as Response;
    })
    .catch((error: ErrorResponse) => {
      return {
        status: error.status,
        payload: { message: error.payload.message },
      } as ErrorResponse;
    });
};

const fetchRegister = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  organizationId: number,
  privilegeId: number

) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password, 
      organizationId: organizationId,
      privilegeId: privilegeId ? privilegeId : 2,
    }),
  };
  return await fetch(`${process.env.AUTH_URL}/register`, request)
    .then(_handleResponse)
    .then((response) => {
      return {
        status: response.status,
        payload: response.payload,
      } as Response;
    })
    .catch((error: ErrorResponse) => {
      return {
        status: error.status,
        payload: { message: error.payload.message },
      } as ErrorResponse;
    });
};

const fetchUpdateUser = async (
  user: UserState,
  password?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
  organizationId?: number,
  privilegeId?: number
) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      userId: user.id,
      password,
      email,
      firstName,
      lastName,
      organizationId,
      privilegeId,
    }),
  };
  return await fetch(`${process.env.AUTH_URL}/update`, request)
    .then(_handleResponse)
    .then((response) => {
      return {
        status: response.status,
        payload: response.payload,
      } as Response;
    })
    .catch((error: ErrorResponse) => {
      return {
        status: error.status,
        payload: { message: error.payload.message },
      } as ErrorResponse;
    });
};

const fetchRevalidateToken = async (token: string, id: string) => {
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  };
  return await fetch(`${process.env.AUTH_URL}/revalidate`, request)
    .then(_handleResponse)
    .then((response) => {
      return {
        status: response.status,
        payload: response.payload.data.body,
      } as Response;
    })
    .catch((error: ErrorResponse) => {
      return {
        status: error.status,
        payload: { message: error.payload.message },
      } as ErrorResponse;
    });
}

const _handleResponse = (response: any): Promise<Response> => {
  return response
    .text()
    .then((text: string) => {
      const data = text && JSON.parse(text);
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve({
          status: response.status,
          payload: { ...data },
        } as Response);
      }
      return Promise.reject({
        status: response.status,
        payload: { message: "Something went wrong" },
      } as ErrorResponse);
    })
    .catch((error: Error) => {
      return Promise.reject({
        status: 500,
        payload: { message: error.message },
      } as ErrorResponse);
    });
};



const AuthService = {
  fetchLogin,
  fetchRegister,
  fetchUpdateUser,
  fetchRevalidateToken,
};

export default AuthService;
