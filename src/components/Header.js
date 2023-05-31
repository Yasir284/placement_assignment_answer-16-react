import { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoContext from "../contexts/TodoContext";

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(TodoContext);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    toast("Logged out", { type: "info" });
    navigate("/login");
  };

  return (
    <div className="bg-my-green-800 text-my-green-100 py-4 px-4 sm:px-20 flex flex-row justify-between items-center">
      <h1 className=" text-2xl font-extrabold text-center">TODO APP</h1>

      {user && (
        <div
          onClick={logout}
          className="flex flex-row gap-4 text-lg px-2 py-1 rounded-md font-semibold bg-my-green-100 text-my-green-800 border-2 border-transparent hover:border-red-400 hover:text-red-400 hover:bg-transparent cursor-pointer justify-center items-center transition-colors ease-in-out duration-200"
        >
          <p>Log out</p>
          <FiLogOut />
        </div>
      )}
    </div>
  );
}

export default Header;
