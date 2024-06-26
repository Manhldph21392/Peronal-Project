import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import authApi from "../api/auth";
import employeeApi from "../api/employee";
import { employeeSlice } from "../slices/employe";
import { useDispatch, useSelector } from "react-redux";
import uploadApi from "../api/upload";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // Chỉ lưu trữ thông tin của user
};

const rootReducer = combineReducers({
    [authApi.reducerPath]: authApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    employee: employeeSlice.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer
});

const middleware = [
    authApi.middleware,
    employeeApi.middleware,
    uploadApi.middleware
];

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(middleware),
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const persistor = persistStore(store);
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export { store, persistor };
