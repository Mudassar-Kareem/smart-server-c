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

    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

export const allUser = () => async (dispatch) =>{
  try {
    dispatch({
      type: "allUserRequest",
    })
    const {data} = await axios.get(`${server}/user/all-user`,{withCredentials:true});
    dispatch({
      type: "allUserSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "allUserFail",
      payload: error.response.data.message,
    });
  }
}