import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/me`,{withCredentials:true});
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    console.log("Error response:", error.response);
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};