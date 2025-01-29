import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UpdateValuePayload {
  name: string;
  val: string | null;
}

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    selectedPostId: null,
    selectedCommentId: null,
    replyInput: '',
    replyComment: ''
  },
  reducers: {
    updateValue: (state: any, action: PayloadAction<UpdateValuePayload>) => {
      const { name, val } = action.payload;
      (state as any)[name] = val;
    },
  },
});

export const { updateValue } = commentSlice.actions;

export default commentSlice.reducer;
