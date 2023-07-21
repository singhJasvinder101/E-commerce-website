import UserLoginPageComponent from "./components/UserLoginComponent";
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"
import {setReduxUserState} from "../../redux/store/slices/userLoginRegisterSlice"

const userLoginApiRequest = async (email, password, donotlogout) => {
  const {data} = await axios.post("/api/users/login", { email, password, donotlogout })
  // console.log(data)
  if(data.userLoggedIn.donotlogout){
    localStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
  }else{
    sessionStorage.setItem("userInfo", JSON.stringify(data.userLoggedIn))
  }
  return data
}

const LoginPage = () => {
  const reduxDispatch = useDispatch()
  // const users = useSelector((state) => { return state.userLoginRegister })
  //   console.log(users.userInfo)

  return (
    <UserLoginPageComponent 
    reduxDispatch={reduxDispatch}
    setReduxUserState={setReduxUserState}
    userLoginApiRequest={userLoginApiRequest}/>
  );
};

export default LoginPage;
