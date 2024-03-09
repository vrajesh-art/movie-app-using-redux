import axios from "axios";
// taking the base url from the tmdb
const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNmZDQ0OTc0YjEyM2FmYTliMjBmOGU1ZmZkMTMxNCIsInN1YiI6IjY1ODY3NGRjZTI5NWI0NzA1MzU4MDM0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.INHoocSdErsRJ9NJSnc8Chop2pAQYCZAKAvrIDUp0vg"
// const TMDB_TOKEN = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTNmZDQ0OTc0YjEyM2FmYTliMjBmOGU1ZmZkMTMxNCIsInN1YiI6IjY1ODY3NGRjZTI5NWI0NzA1MzU4MDM0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.INHoocSdErsRJ9NJSnc8Chop2pAQYCZAKAvrIDUp0vg

// const headers hume headers bhejna padta hai
const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
}
// below making the basic function for api call and exporing it

export const fetchDataFromApi = async (url, params) => {
    try {
        // data ko get karenge using axios
        // below mein apan ne base_url use kiya hai joh uppar apan ne declare kiya hai and usko concat kiya hai url ke saath joh apan function call ke time pe use karenge aur options mein apan ne bheja hai headers and params ko
        const { data } = await axios.get(BASE_URL + url, {
            headers, params
        })
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


// dho baar joh api call hoota hai woh strict mode ke wajah se hoota hai woh check karta hai ki pehle reponse aaya aur abhi response aaya woh same hai yaa nhi agar woh diff hai toh fir kuch wrong hai react ke hisaab se
