import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import userSlice from './userSlice'
import themeSlice from './themeSlice'
import tokenSlice from './tokenSlice'

const reducers = combineReducers({
  user: userSlice.reducer,
  theme: themeSlice.reducer,
  token: tokenSlice.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
})

export default store

// 아래는 redux-persist 적용 전 코드

// import { configureStore } from '@reduxjs/toolkit'
// import userSlice from './userSlice'

// const store = configureStore({
//   reducer: {
//     // 실제 store에 저장되는 이름
//     user: userSlice.reducer,
//   },
// })
// export default store