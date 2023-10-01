import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIKEY } from "../../common/apis/MovieApiKey";
import movieapi from '../../common/apis/MovieApi'

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (term) => {
      const response = await movieapi.get(
        `?apiKey=${APIKEY}&s=${term}&type=movie`
      );
      return response.data;
    }
  );
  
  export const fetchAsyncShows = createAsyncThunk(
    "movies/fetchAsyncShows",
    async (term) => {
      const response = await movieapi.get(
        `?apiKey=${APIKEY}&s=${term}&type=series`
      );
      return response.data;
    }
  );
  
  export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    "movies/fetchAsyncMovieOrShowDetail",
    async (id) => {
      const response = await movieapi.get(`?apiKey=${APIKEY}&i=${id}&Plot=full`);
      return response.data;
    }
  );
  


const initialState = {
    movies:{},
    shows:{},
    selectMovieOrShow:{}
};

const movieSlice = createSlice({
    name:"movies",
    initialState,
    reducers:{
        removeSelectedMovieOrShow:state=>{
            state.selectMovieOrShow = {};
        }

    },
    extraReducers:{
        [fetchAsyncMovies.pending]:()=>{
            console.log('pending')
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload})=>{
            console.log("Fetched movies successfully");
            return {...state,movies:payload}
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log('Fetch failed')
        },
        [fetchAsyncShows.fulfilled]:(state,{payload})=>{
            console.log("Fetched series successfully");
            return {...state,shows:payload}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled]:(state,{payload})=>{
            return {...state,selectMovieOrShow:payload}
        }
    }
})

export const {removeSelectedMovieOrShow} = movieSlice.actions;

export default movieSlice.reducer;