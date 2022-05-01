import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { UserActions } from "../../app/_actions/user.actions";

const withAuth = (WrappedComponent: any) => {
    const WithAuth = (props: any) => {
        const router = useRouter();
        const dispatch = useAppDispatch();
        const user = useAppSelector((state) => state.user);

        useEffect(() => {
            switch (user.status) {
                case "loading":
                    break;
                case "idle":        
                    dispatch({
                        type: UserActions.LOAD_LOCAL_USER
                    });
                    break;
                case "error":
                    router.push("/signin?redirect=/manage");
                    break;      
                case "loaded":
                    const te = user.token_expiry ? new Date(user.token_expiry) : null;
                    if (te && te.getTime() < new Date().getTime()) {
                        dispatch({
                            type: UserActions.LOGOUT_REQUEST
                        });
                    }
                    break;
                default:
                    break;
            }
        }, [user]);

        return user.status==='loaded' ? <WrappedComponent {...props} /> : null;
    }
    return WithAuth;
}

export default withAuth;