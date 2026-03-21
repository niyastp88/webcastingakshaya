import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://akshayawebcasting.onrender.com/api/admin";

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/login`, data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
  token: localStorage.getItem("token") || null,
  error: null,
  loading: false,
},
  reducers: {
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginAdmin.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(loginAdmin.fulfilled, (state, action) => {
    state.loading = false;
    state.token = action.payload.token;
    state.error = null;
    
  })
  .addCase(loginAdmin.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    
  });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;