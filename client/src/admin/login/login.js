import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import revels from "./../../assets/logos/logo_landing.png";
import { useAuth } from "../../context/AuthContext";

const Login = ({ category }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateForm = (toastId) => {
    if (email === "" || password === "") {
      toast.error("Please fill both the fields", {
        id: toastId,
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if (validateForm(toastId)) {
      try {
        const res = await auth.adminLogin(email, password);
        if (res.success) {
          toast.success(res.msg, { position: "bottom-center", id: toastId });
          navigate("/admin/dashboard");
        } else {
          toast.error(res.msg[0][Object.keys(res.msg[0])[0]], {
            position: "bottom-center",
            id: toastId,
          });
        }
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
      }
    }
  };
  useEffect(() => {
    console.log(auth, auth.adminPayment);
    if (!auth.loading) {
      if (auth.adminPayment) {
        console.log("adminPayment");
        navigate("/admin/payment");
      } else if (auth.admin) {
        console.log("admin");
        navigate("/admin/dashboard");
      } else navigate("/admin");
    }
  }, []);
  return (
    <div>
      <div className="d-flex align-content-center justify-content-center text-light my-5">
        <div className="w-auto mb-3" style={{ lineHeight: "250%" }}>
          <div className="font-light" style={{ fontSize: "2rem" }}>
            Admin
          </div>
          <div
            className="font-heavy text-center text-uppercase"
            style={{
              fontSize: "3rem",
              letterSpacing: "0.6rem",
              marginRight: "-0.6rem",
            }}
          >
            {category}
          </div>
          <div className="font-light text-right" style={{ fontSize: "2rem" }}>
            Side
          </div>
        </div>
      </div>
      <div className="text-dark mx-auto" style={{ width: "300px" }}>
        <input
          type="text"
          name=""
          autoComplete="off"
          required
           //value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          maxLength={100}
          className="bg-light my-1 h-25 p-2 rounded mx-0 w-100 text-dark"
          placeholder="Email"
        />
        <input
          type="password"
          name=""
          autoComplete="off"
          required
           //value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          maxLength={100}
          className="bg-light my-1 h-25 p-2 rounded mx-0 w-100 text-dark"
          placeholder="Password"
        />
        <button
          type="button"
          className="btn my-2 w-100"
          style={{ backgroundColor: "#C6A3FF" }}
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </div>
      <div className="d-flex flex-row my-5 align-items-center justify-content-center">
        <img src={revels} height={100} />
        <div
          className="my-5 font-light text-light"
          style={{ fontSize: "2rem" }}
        >
          REVELS '22
        </div>
      </div>
      <div className="fixed-bottom font-light w-auto text-center my-2">
        <div className="text-light">
          Made with{" "}
          <i
            className="fa fa-heart mx-1"
            style={{ fontSize: "18px", color: "red" }}
          ></i>{" "}
          by SysAdmin and Web '22
        </div>
        <div className="text-secondary">sysadrevels22@gmail.com</div>
      </div>
    </div>
  );
};

export default Login;
