import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { useEffect, useRef } from "react";

export const useInterval = (callback: Function, delay: number) => {
    const savedCallback = useRef<Function>()
    useEffect(() => {
      savedCallback.current = callback
    }, [callback])
    useEffect(() => {
      const handler = (...args: any) => savedCallback.current?.(...args)
  
      if (delay !== null) {
        const id = setInterval(handler, delay)
        return () => clearInterval(id)
      }
    }, [delay])
  }

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
