import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const Register = (props) => {
  const auth = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(null);
  const [regNum, setRegNum] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [course, setCourse] = useState("");
  const [college, setCollege] = useState("--");
  const [state, setState] = useState("");
  const [isMahe, setIsMahe] = useState(true);
  // handles input field validation
  const validateForm = (toastId) => {
    if (
      name === "" ||
      email === "" ||
      mobileNumber === "" ||
      regNum === "" ||
      course === "" ||
      password === "" ||
      confirmPass === "" ||
      college === "" ||
      state === "--"
    ) {
      toast.error("Please fill in all the fields", {
        id: toastId,
      });
      return false;
    } else {
      // check phone number
      if (
        !isNaN(mobileNumber) &&
        // typeof mobileNumber === "number" &&
        mobileNumber.toString().length === 10
      ) {
        // check password match
        if (password === confirmPass) {
          return true;
        } else {
          toast.error("Passwords do not match", {
            id: toastId,
          });
          return false;
        }
      } else {
        toast.error("Please enter a valid phone number", {
          id: toastId,
        });
        return false;
      }
    }
  };
  // handles submit of registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    if (validateForm(toastId)) {
      try {
        const res = await auth.userRegister(
          name,
          email,
          password,
          mobileNumber,
          regNum,
          course,
          college,
          state,
          isMahe
        );
        if (res.success) {
          toast.success(res.msg, { position: "bottom-center", id: toastId });
        } else {
          toast.error(res.msg[0][Object.keys(res.msg[0])[0]], {
            position: "bottom-center",
            id: toastId,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.msg, {
          position: "bottom-center",
          id: toastId,
        });
      }
    }
  };
  return (
    <div className="form-wrapper">
      <h2 className="font-light auth-heading">SIGN UP</h2>
      <form className="auth-form">
        <div className="user-box">
          <input
            type="text"
            name=""
            autoComplete="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            maxLength={100}
          />
          <label>Name</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name=""
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            maxLength={100}
          />
          <label>Email</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name=""
            autoComplete="off"
            required
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            maxLength={100}
          />
          <label>Mobile Number</label>
        </div>
        <div className="user-box">
          <input
            type="number"
            name=""
            autoComplete="off"
            required
            value={regNum}
            onChange={(e) => setRegNum(e.target.value.trim())}
            maxLength={100}
          />
          <label>Registration Number</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            name=""
            autoComplete="off"
            required
            value={course}
            onChange={(e) => setCourse(e.target.value.trim())}
            maxLength={100}
          />
          <label>Course</label>
        </div>
        <div className="user-box">
          <select
            name=""
            required
            value={college}
            onChange={(e) => setCollege(e.target.value)}
          >
            {[
              "Choose your college",
              "Manipal Institute of Technology",
              "BITS, Goa",
            ].map((value, index) => {
              return (
                <option key={index} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
        <div className="user-box">
          <input
            type="text"
            name=""
            autoComplete="off"
            required
            value={state}
            onChange={(e) => setState(e.target.value.trim())}
            maxLength={100}
          />
          <label>State</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name=""
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
            maxLength={100}
          />
          <label>Password</label>
        </div>
        <div className="user-box">
          <input
            type="password"
            name=""
            autoComplete="off"
            required
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value.trim())}
            maxLength={100}
          />
          <label>Confirm Password</label>
        </div>
        <button onClick={(e) => handleSubmit(e)} className="font-medium">
          Register
        </button>
      </form>
      <div className="my-2 d-flex justify-content-center">
        <p
          className="font-medium"
          onClick={() => {
            props.setLogin(true);
            props.setRegister(false);
          }}
        >
          Already have an account?
        </p>
      </div>
    </div>
  );
};

export default Register;
