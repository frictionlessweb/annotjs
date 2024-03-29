import React from "react";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  Provider,
  useSelector as useSelectorRedux,
  useDispatch as useDispatchRedux,
  TypedUseSelectorHook,
} from "react-redux";
import produce from "immer";
import { ApiResponse } from "../util/askChatGPT";

export interface UserResponse {
  type: "user";
  payload: string;
}

export interface SystemResponse {
  type: "system";
  payload: ApiResponse;
}

export type Message = UserResponse | SystemResponse;

type Action =
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "TOGGLE_PDF" }
  | { type: "SET_HTML" };

interface AppState {
  isLoading: boolean;
  isPDF: boolean;
  messages: Message[];
}

export const DEFAULT_APP_STATE: AppState = {
  isLoading: false,
  messages: [],
  isPDF: true,
};

export const reduce = (
  prev: AppState | undefined,
  action: Action
): AppState => {
  if (prev === undefined) return DEFAULT_APP_STATE;
  switch (action.type) {
    case "START_LOADING": {
      return produce(prev, (draft) => {
        draft.isLoading = true;
      });
    }
    case "TOGGLE_PDF": {
      return produce(prev, (draft) => {
        draft.isPDF = !draft.isPDF;
      });
    }
    case "SET_HTML": {
      return produce(prev, (draft) => {
        draft.isPDF = false;
      });
    }
    case "STOP_LOADING": {
      return produce(prev, (draft) => {
        draft.isLoading = false;
      });
    }
    case "ADD_MESSAGE": {
      return produce(prev, (draft) => {
        draft.messages.push(action.payload);
        switch (action.payload.type) {
          case "user": {
            draft.isLoading = true;
            break;
          }
          case "system": {
            draft.isLoading = false;
            draft.isPDF = false;
            break;
          }
        }
      });
    }
  }
};

const logger = createLogger({ collapsed: true });

const store =
  process.env.NODE_ENV === "production"
    ? createStore(reduce)
    : createStore(reduce, composeWithDevTools(applyMiddleware(logger)));

// See https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
export const useSelector: TypedUseSelectorHook<AppState> = useSelectorRedux;

export const useDispatch = () => useDispatchRedux<typeof store.dispatch>();

interface StateProviderProps {
  children: React.ReactNode;
}

export const StateProvider = (props: StateProviderProps) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};
