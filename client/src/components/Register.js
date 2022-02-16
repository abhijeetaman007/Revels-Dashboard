import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const auth = useAuth()

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState(0);
    const [regNum, setRegNum] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [branch, setBranch] = useState("");
    const [college, setCollege] = useState("");
    const [state, setState] = useState("");
    const [isMahe, setIsMahe] = useState(true);
    // handles input field validation
    const validateForm = (toastId) => {
        if(
            name === "" ||
            email === "" ||
            mobileNumber === "" ||
            regNum === "" ||
            branch === "" ||
            password === "" ||
            confirmPass === "" ||
            college === "" ||
            state === "--"
        ) {
            toast.error("Please fill in all the fields", {
              id: toastId
            });
            return false;
        } else {
            // check phone number
            console.log(typeof mobileNumber)
            if (
                !isNaN(mobileNumber) &&
                typeof mobileNumber === "number" && 
                mobileNumber.toString().length === 10
            ) {
                // check password match
                if(password === confirmPass) {
                    return true
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
    }
    // handles submit of registration form
    const handleSubmit = async (e) => {
        e.preventDefault()
        const toastId = toast.loading("Loading...");
        if(validateForm(toastId)){
            try {
                const res = await auth.userRegister(
                    name,
                    email,
                    password,
                    mobileNumber,
                    regNum,
                    branch,
                    college,
                    state,
                    isMahe
                );
                if(res.success) {
                    toast.success(res.msg, { position: "bottom-center", id: toastId });
                } else {
                    toast.error(res.msg[0][Object.keys(res.msg[0])[0]], { position: "bottom-center", id: toastId });
                }
            } catch (error) {
                toast.error(error.response.data.msg, {
                    position: "bottom-center",
                    id: toastId
                })
            }
        }
    }
    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Register;