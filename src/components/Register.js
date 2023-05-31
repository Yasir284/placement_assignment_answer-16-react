import axios from "axios";
import { useContext, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TodoContext from "../contexts/TodoContext";

export default function Register() {
  let nameRef = useRef();
  let emailRef = useRef();
  let passwordRef = useRef();
  let { setUser } = useContext(TodoContext);
  let navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    let name = nameRef.current.value;
    let email = emailRef.current.value;
    let password = passwordRef.current.value;

    if (!(name && email && password)) {
      toast("All fields are mandatory", { type: "warning" });
    }

    try {
      let { data } = await axios.post("https://reqres.in/api/register", {
        name,
        email,
        password,
      });
      console.log(data);

      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      toast("Account registered successfully", { type: "success" });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Error in creating account", { type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center text-white h-[80vh]">
      <div className=" flex flex-col bg-my-green-800 p-8 rounded-lg shadow-2xl shadow-my-green-800">
        <h1 className="w-80 text-center text-2xl px-4 py-2 font-semibold border-b-2">
          Register
        </h1>

        <form onSubmit={register} className="flex flex-col mt-8 mb-2">
          <label htmlFor="name" className="">
            Name:
          </label>
          <input
            ref={nameRef}
            type="name"
            id="name"
            className="mb-8 rounded-md p-2 text-black"
          />

          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            readOnly
            value="eve.holt@reqres.in"
            className="mb-8 rounded-md p-2 text-black"
          />

          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            required
            type="password"
            id="password"
            value="pistol"
            readOnly
            className="mb-8 rounded-md p-2 text-black"
          />

          <button
            type="submit"
            className="py-2 px-4 bg-white text-my-green-800 w-fit mx-auto rounded-md border border-transparent hover:bg-transparent hover:border-white hover:text-white transition-all ease-in-out duration-200 font-semibold active:scale-95 hover:scale-105"
          >
            Submit
          </button>
        </form>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="border bg-white text-my-green-800 rounded-md hover:text-white px-1 ml-3 hover:bg-transparent hover:border-white transition-all ease-in-out duration-200"
          >
            Log In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
