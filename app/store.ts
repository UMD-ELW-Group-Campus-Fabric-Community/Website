import { configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { Action } from "redux";

import userReducer from "./slice/user.slice";

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

const makeStore = () => store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export const wrapper = createWrapper(makeStore);
