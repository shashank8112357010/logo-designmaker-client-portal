import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountReducer from './accountSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedAccountReducer = persistReducer(persistConfig, accountReducer);

const store = configureStore({
    reducer: {
        account: persistedAccountReducer,
    },
});

const persistor = persistStore(store);

// persistor.purge()

export { store, persistor };
