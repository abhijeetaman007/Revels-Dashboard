import React from "react";
import Events from "../components/Events";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const auth = useAuth();
    return (
        <div>
            <Events />
            <button onClick={auth.userLogout}>Logout User</button>
        </div>
    )
}

export default Dashboard