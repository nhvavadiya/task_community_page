import { configureStore } from '@reduxjs/toolkit';
import postCommentReducer from './postCommentSlice'

const store = configureStore({
    reducer: {
        postComment: postCommentReducer,
    },
});

export default store;
