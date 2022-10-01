import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Post } from "../../types/blog";
import blogService from "./blogService";

export interface BlogState {
  post: Post | null;
  posts: Post[];
  isLoading: boolean;
}

const initialState: BlogState = {
  post: null,
  posts: [],
  isLoading: true,
};

export const getPosts = createAsyncThunk(
  "cart/getPosts",
  async (name, thunkAPI) => {
    try {
      return await blogService.fetchPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const blogSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state: BlogState, action) => {
        console.log(action);
        state.isLoading = false;
        state.posts = action.payload.posts;
      })
      .addCase(getPosts.rejected, (state: BlogState, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});

// export const {} = blogSlice.actions;

export default blogSlice.reducer;
