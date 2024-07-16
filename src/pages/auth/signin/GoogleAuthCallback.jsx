// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
// import { setToken, setUser } from "../../../store/accountSlice";
// import { toast } from "react-toastify";

// const GoogleAuthCallback = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const dispatch = useDispatch();


//     useEffect(() => {
//         const fetchToken = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/dashboard/auth/google/callback', {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();
//                 if (data.token) {
//                     localStorage.setItem('token', data.token);
//                     navigate('/dashboard/overview');
//                 } else {
//                     navigate('/auth/sign-in');
//                 }
//             } catch (error) {
//                 console.error('Error fetching token:', error);
//                 navigate('/auth/sign-in');
//             }
//         };

//         fetchToken();
//     }, [navigate]);

//     // useEffect(() => {
//     //     const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

//     //     if (token) {
//     //         dispatch(setToken(token));

//     //         // Fetch user details using the token
//     //         fetchUserDetails(token).then((user) => {
//     //             dispatch(setUser(user));
//     //             navigate('/dashboard/overview');
//     //         }).catch((error) => {
//     //             toast.error('Failed to fetch user details');
//     //             navigate('/auth/sign-in');
//     //         });
//     //     } else {
//     //         toast.error('No token found');
//     //         navigate('/auth/sign-in');
//     //     }
//     // }, [location, navigate, dispatch]);

//     // const fetchUserDetails = async (token) => {
//     //     try {
//     //         const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
//     //             headers: {
//     //                 Authorization: `Bearer ${token}`,
//     //             },
//     //         });
//     //         if (!response.ok) {
//     //             throw new Error('Failed to fetch user details');
//     //         }
//     //         const data = await response.json();
//     //         return data.user;
//     //     } catch (error) {
//     //         throw new Error(error.message);
//     //     }
//     // };

//     return <div>Loading...</div>;
// };

// export default GoogleAuthCallback;



// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setToken } from "../../../store/accountSlice";

// const GoogleAuthCallback = () => {
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchToken = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/dashboard/auth/google/callback', {
//                     credentials: 'include',
//                 });
//                 const data = await response.json();
//                 if (data.token) {
//                     dispatch(setToken(data.token)); // Store token in Redux or localStorage
//                     localStorage.setItem('token', data.token); // Store token in localStorage
//                     navigate('/dashboard/overview'); // Redirect to dashboard
//                 } else {
//                     navigate('/auth/sign-in'); // Redirect to sign-in if token not received
//                 }
//             } catch (error) {
//                 console.error('Error fetching token:', error);
//                 navigate('/auth/sign-in'); // Redirect to sign-in on error
//             }
//         };

//         fetchToken();
//     }, [dispatch, navigate]);

//     return <div>Loading...</div>;
// };

// export default GoogleAuthCallback;




import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../../store/accountSlice";

const GoogleAuthCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        const fetchToken = async () => {
            const queryParams = new URLSearchParams(location.search);
            const token = queryParams.get('token');

            console.log("TOKEN: ", token);
            if (token) {
                console.log("getting token: ", token);
                dispatch(setToken(token)); // Store token in Redux or localStorage
                dispatch(setUser({ username: "John doe" }));
                // localStorage.setItem('token', token); // Store token in localStorage
                navigate('/dashboard/overview'); // Redirect to dashboard
            } else {
                console.log("not getting token: ");
                navigate('/auth/sign-in'); // Redirect to sign-in if token not received
            }
        };

        fetchToken();
    }, [dispatch, navigate, location.search]);

    return <div>Loading...</div>;
};

export default GoogleAuthCallback;
