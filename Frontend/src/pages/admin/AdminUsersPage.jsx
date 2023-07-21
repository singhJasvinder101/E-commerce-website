import UsersPageComponent from "./components/UsersPageComponent"
import axios from "axios";
// axios.defaults.baseURL = `http://localhost:3000`
// we will made our util functions here 

const fetchUsers = async (controller) => {
  const { data } = await axios.get("/api/users", {
    signal: controller.signal
  });
  return data
}
const deleteUser = async (userId) => {
  const { data } = await axios.delete(`/api/users/${userId}`)
  // console.log(data)

  return data
}

const AdminUsersPage = () => {
  return (
    <UsersPageComponent fetchUsers={fetchUsers} deleteUser={deleteUser} />
  )
}
export default AdminUsersPage
