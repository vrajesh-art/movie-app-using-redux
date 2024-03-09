import { createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
    name: 'home',
    initialState: {
        url: {},
        genres: {}
    },

    reducers: {
        // below are the actions
        getApiConfiguration: (state, action) => {
            state.url = action.payload;
        },
        getGenres: (state, action) => {
            state.genres = action.payload;
        }
    }
})



export const { getApiConfiguration, getGenres } = homeSlice.actions;
export default homeSlice.reducer;
// yahape slice create kiya hai jiska naam hai homeslice using the createSlice of the redux/toolkit usko apan ne naam diya hai home aur initial state mein url and genres hai joh ki initially empty objects hai
// reducer ke andar 2 methods hai  getApiConfiguration,getGenres joh ki state and action ko leta hai state joh hai initialstate hai and uske andar ke url and genres ko apan update kardenge from action and url and genres ko apan throughout the application use kar sakte hai