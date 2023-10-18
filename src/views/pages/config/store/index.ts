import { createStore, Store } from "redux";
import rootReducer from "./rootReducer";
import { ConfigState } from "../store/configurations/types";

export interface AppState {
  configurations: ConfigState;
}

const store: Store<AppState> = createStore(rootReducer);

export default store;
