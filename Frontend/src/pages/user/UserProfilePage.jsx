import UserProfilePageComponent from "./components/UserProfilePageComponent";
import axios from "axios"
import { useSelector, useDispatch } from "react-redux";
import { setReduxUserState } from "../../../redux/store/slices/userLoginRegisterSlice";

const updateUserProfileApiRequest = async (
  name,
  lastname,
  phoneNumber,
  address,
  country,
  zipCode,
  city,
  state,
  password
) => {
  const { data } = await axios.patch("/api/users/profile", {
    name,
    lastname,
    phoneNumber,
    address,
    country,
    zipCode,
    city,
    state,
    password,
  });
  return data;
};


const fetchUser = async (user_id) => {
  const { data } = await axios.get("/api/users/profile/" + user_id);
  return data;
};

const UserProfilePage = () => {
  const reduxDispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLoginRegister);

  return <UserProfilePageComponent
    updateUserProfileApiRequest={updateUserProfileApiRequest}
    fetchUser={fetchUser}
    userInfoFromRedux={userInfo}
    reduxDispatch={reduxDispatch}
    setReduxUserState={setReduxUserState}  // to update in redux state (userInfo)
    localStorage={window.localStorage}
    sessionStorage={window.sessionStorage}
  />
};

export default UserProfilePage;
