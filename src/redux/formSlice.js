import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://akshayawebcasting.onrender.com/api/forms";

const getToken = () => localStorage.getItem("token");

export const submitForm = createAsyncThunk(
  "form/submit",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(API, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const fetchForms = createAsyncThunk(
  "form/fetch",
  async (status) => {
    const res = await axios.get(`${API}?status=${status}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  }
);

export const updateStatus = createAsyncThunk(
  "form/update",
  async ({ id, status }) => {
    await axios.put(`${API}/${id}`, { status }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return { id, status };
  }
);

const slice = createSlice({
  name: "form",
  initialState: {
  data: [],
  error: null,
},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      state.data = action.payload;
    })
    builder.addCase(updateStatus.fulfilled, (state, action) => {
  state.data = state.data.filter(
    item => item._id !== action.payload.id
  );
})
builder
  .addCase(submitForm.fulfilled, (state) => {
    state.error = null;
  })
  .addCase(submitForm.rejected, (state, action) => {
    state.error = action.payload;
  });
  },
});

export default slice.reducer;