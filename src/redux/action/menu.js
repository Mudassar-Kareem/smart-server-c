// src/redux/actions/menuActions.js
import axios from "axios";
import { server } from "../../server";

export const getAllMenuItems = (restaurantId) => async (dispatch) => {
  try {
    dispatch({ type: "LoadMenuRequest" });

    const { data } = await axios.get(`${server}/menu/getAll/${restaurantId}`);

    dispatch({
      type: "LoadMenuSuccess",
      payload: data.menuItems,
    });
  } catch (error) {
    dispatch({
      type: "LoadMenuFail",
      payload: error.response?.data?.message || error.message,
    });
  }
};
