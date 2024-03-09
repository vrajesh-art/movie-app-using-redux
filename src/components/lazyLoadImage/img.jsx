import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
// here we are using the curly braces to destructure the properties of the object passed to the function
const Img = ({ src, className }) => {
    return (
        // classname aata hai toh classname lagao yee phir "" rakhdo
        <LazyLoadImage className={className || ""} alt="" effect="blur" src={src} />
    )
};
export default Img;


// So, the src and className properties are extracted from the passed object (props), and the component uses them to render a LazyLoadImage component with the specified src and className. If className is not provided, an empty string is used as a default value.

// so the above method can be also alternatively used as
//     const img = (props) => {
//         const { src, className } = props;
//         return (
//             <LazyLoadImage className={className || ""} alt="" effect="blur" src={src} />
//         );
//     };





