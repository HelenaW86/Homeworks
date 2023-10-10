import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, password }, thunkApi) => {
    try {
      const res = await axios.post("http://localhost:8080/signup", {
        username,
        password,
      })
      return res.data;
    } catch (err) {
      console.log(err);
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async ({ username, password }, thunkApi) => {
    try {
      const res = await axios.post("http://localhost:8080/signin", {
        username,
        password,
      })
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

// axios.get('http://localhost:8080/questions', {params: {theme}})
// .then(res => {
//   setQuestions(res.data)
// })
// .catch(err => setError('Couldn`t fetch questions'))

export const getQuestions = createAsyncThunk(
  "auth/getQuestions",
  async ({ theme }, thunkApi) => {
    try {
      const res = await axios.get("http://localhost:8080/getQuestions", {
        theme,
      })
      console.log(res)
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);


const initialState = {
  user: "",
  questions: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.user = "";
      state.questions = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signup.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload.username;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getQuestions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.questions = null;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
