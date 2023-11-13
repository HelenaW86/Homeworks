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

export const themeQuestions = createAsyncThunk(
  "auth/themeQuestions",
  async (theme , thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:8080/themeQuestions/${theme}`, 
        {theme}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const cardQuestions = createAsyncThunk(
  "auth/questions",
  async (questions , thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:8080/questions/${questions.name}`, 
        {questions}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const postQuestionCard = createAsyncThunk(
  "auth/postQuestionCard",
  async (card , thunkApi) => {
    try {
      const res = await axios.post(`http://localhost:8080/postQuestionCard`, 
        {card}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const postQuestion = createAsyncThunk(
  "auth/postQuestion",
  async (question , thunkApi) => {
    try {
      const res = await axios.post(`http://localhost:8080/postQuestion`, 
        {question}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const postResult = createAsyncThunk(
  "auth/postResult",
  async (result , thunkApi) => {
    try {
      const res = await axios.post(`http://localhost:8080/postResult`, 
        {result}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const getResults = createAsyncThunk(
  "auth/results",
  async (user , thunkApi) => {
    try {
      const res = await axios.get(`http://localhost:8080/results/${user}`, 
        {user}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const deleteResults = createAsyncThunk(
  "auth/deleteResults",
  async (id , thunkApi) => {
    try {
      const res = await axios.delete(`http://localhost:8080/deleteResults/${id}`, 
        {id}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);

export const putResult = createAsyncThunk(
  "auth/putResult",
  async (result , thunkApi) => {
    try {
      const res = await axios.put(`http://localhost:8080/putResult`, 
        {result}
      );
      return res.data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  }
);


const initialState = {
  user: "",
  themeQuestions: null,
  questions: null,
  results: null,
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
      state.questions = [];
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
      .addCase(themeQuestions.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.themeQuestions = action.payload;
        state.error = null;
      })
      .addCase(themeQuestions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(themeQuestions.rejected, (state, action) => {
        state.loading = false;
        state.themeQuestions = null;
        state.error = action.payload;
      })
      .addCase(cardQuestions.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.questions = action.payload;
        state.error = null;
        console.log( state.questions)
      })
      .addCase(cardQuestions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(cardQuestions.rejected, (state, action) => {
        state.loading = false;
        state.questions = null;
        state.error = action.payload;
      })
      .addCase(getResults.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.loading = false;
        state.results = action.payload;
        state.error = null;
      })
      .addCase(getResults.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getResults.rejected, (state, action) => {
        state.loading = false;
        state.results = null;
        state.error = action.payload;
      })
      .addCase(deleteResults.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.results?.findIndex((r) => r.resultId === action.payload.resultId);
          state.results.splice(index, 1);
      })
      .addCase(deleteResults.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(putResult.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.results?.findIndex((r) => r.card === action.payload.card);
        state.results[index] = action.payload
        state.error = null;
      })
      .addCase(putResult.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(putResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
