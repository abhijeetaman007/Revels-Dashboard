import React from "react";
import Events from "../components/Events";
import { useAuth } from "../context/AuthContext";
import Layout from "./Layout/Layout";

const Dashboard = () => {
    const auth = useAuth();
    return (
        <div>
            {/* <Events /> */}
            <Layout />
            {/* <button onClick={auth.userLogout}>Logout User</button> */}
        </div>
    )
}

export default Dashboard