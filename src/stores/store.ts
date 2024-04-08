import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import authApi from "../api/auth";
import employeeApi from "../api/employee";
import { employeeSlice } from "../slices/employe";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Chỉ lưu trữ thông tin của user
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    empployee: employeeSlice.reducer
});

const middleware = [
    authApi.middleware,
    employeeApi.middleware,
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(middleware),
});

const persistor = persistStore(store);
export { store, persistor };
