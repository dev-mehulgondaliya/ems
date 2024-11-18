import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiList } from "../api/apiList";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router";

export function createExtraReducer(builder, actionFunction){
    builder
    // Handle the "pending" state when the API request is in progress
    .addCase(actionFunction.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors
    })
    // Handle the "fulfilled" state when the API request succeeds
    .addCase(actionFunction.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.response = action.payload; // Clear password as well
    })
    // Handle the "rejected" state when the API request fails
    .addCase(actionFunction.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Store the error message
    });
}

export function commonApiCall(thunkName, apiName, auth=true){
    return createAsyncThunk(
        thunkName,
        async (apidata, { rejectWithValue }) => {
            try {
                const baseUrl = 'http://localhost:4747'
                const cookie = new Cookies()
                const userToken = cookie.get('Token')
                const apiConfig = apiList[apiName].url(apidata?.params)
                const response = await fetch(`${baseUrl}${apiConfig}`, {
                    method: apiList[apiName].method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': auth ? 'JWT ' + userToken : undefined
                    },
                    body: apiList[apiName].method === 'GET' ? undefined : JSON.stringify(apidata?.data),
                });
                

                if (!response.ok) {
                    throw new Error();
                }

                const data = await response.json();
                return data; // Return the response data, which can be used in the `fulfilled` case
            } catch (error) {
                return rejectWithValue(error.message); // Pass error to the `rejected` case
            }
        }
    );
} 

