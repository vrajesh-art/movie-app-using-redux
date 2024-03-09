import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './homeSlice'
export default configureStore({
    reducer: { home: homeSlice },
})
// here above we have created the store and we have to give it to the react
// after this we are creating the slice for different page we can create the different slice
// jo homeslice apan ne import kiya hai usko hume ek key ke corresponding mein store kara dena hai