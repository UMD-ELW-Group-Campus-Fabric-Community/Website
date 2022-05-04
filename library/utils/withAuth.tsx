import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserActions } from "../../app/_actions/user.actions";
import { revalidateTokenAsync } from "../../app/_reducers/user.thunk";

const withAuth = (WrappedComponent: any) => {
  const WithAuth = (props: any) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);
    const status = useAppSelector((state) => state.user.status);

    useEffect(() => {
      switch (status) {
        case "loading":
        case "idle":
          break;
        case "error":
          dispatch({
            type: UserActions.LOGOUT_REQUEST,
          });
          router.push("/signin?redirect=/manage");
          break;
        case "loaded":
          const te = user.token_expiry ? new Date(user.token_expiry) : null;
          if (te && te.getTime() < new Date().getTime()) {
            dispatch(
                revalidateTokenAsync({
                token: user.token ? user.token : "",
                id: user.id ? user.id : "",
                })
            );
          }
          break;
        default:
          break;
      }
    }, [status]);

    useEffect(() => {
      if (user.status === "idle") {
        dispatch({
          type: UserActions.LOAD_LOCAL_USER,
        });
      }
    }, []);

    return user.status === "loaded" ? <WrappedComponent {...props} /> : null;
  };
  return WithAuth;
};

export default withAuth;
