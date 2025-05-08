import axios from "axios";
import { server } from "../../server";

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: "getOrdersRequest",
        });
        const {data} = await axios.get(`${server}/order/getOrders`,{withCredentials:true});
        dispatch({
            type: "getOrdersSuccess",
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: "getOrdersFail",
            payload: error.response.data.message,
        })
    }
}