import uuid from 'uuid';
// import axios from "./pages/axiosInstance";
import Axios from "axios";
import { addToCartAPI, removeFromCartAPI } from "../services/CartService";
// ADD_TO_CART
export const addToCartHelper = (
    {
        name,
        image = undefined,
        ratings = undefined,
        quantity = 1,
        price,
        bookID
    } = {}
) => ({
    type: "ADD_TO_CART",
    shoppingCart: {
        id: uuid(),
        name,
        image,
        ratings,
        quantity,
        price,
        bookID
    }
});

// REMOVE_FROM_CART
const removeFromCartHelper = (bookID) => ({
    type: "REMOVE_FROM_CART",
    bookID
});

// EDIT_CART
export const editCart = (bookID, updates) => ({
    type: "EDIT_CART",
    bookID,
    updates
});

// EMPTY_CART
export const emptyCart = () => ({
    type: "EMPTY_CART"
});

export const removeFromCart = ({ bookID } = {}) => {
    return (dispatch, getState) => {
        const { authentication } = getState();
        if (authentication.isAuthenticated) {
            // make an API call
            const access_token = window.localStorage.getItem("access_token_ekart");
            const headers = { Accept: "application/json", Authorization: `Bearer ${access_token}` };

            Axios.delete(removeFromCartAPI(bookID), { headers: { ...headers } })
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(removeFromCartHelper(bookID));
    }
};

export const addToCart = (book = {}) => {
    return (dispatch, getState) => {
        const {authentication} = getState();
        if(authentication.isAuthenticated){
            // make an API call
            const access_token = window.localStorage.getItem("access_token_ekart");
            const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
            const {bookID, quantity} = book;
            const data = {
                book_id: bookID,
                quantity: quantity
            };
            Axios.post(addToCartAPI,data, {headers: {...headers}})
                .then((response) => {
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
        dispatch(addToCartHelper(book));
    }
};