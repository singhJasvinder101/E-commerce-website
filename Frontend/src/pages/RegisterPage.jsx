import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReduxUserState } from "../../redux/store/slices/userLoginRegisterSlice"; 

const registerUserApiRequest = async (name, lastname, email, password) => {
  const { data } = await axios.post("/api/users/register", {
    name, lastname: lastname, email, password
  })
  // console.log(data)
  sessionStorage.setItem("userInfo", JSON.stringify(data.userCreated));
  if (data.success === "user created") window.location.href = "/user";
  return data;
}

const RegisterPage = () => {
  return <RegisterPageComponent
    registerUserApiRequest={registerUserApiRequest}
    useDispatch={useDispatch}
    setReduxUserState={setReduxUserState}
  />
};

export default RegisterPage;
