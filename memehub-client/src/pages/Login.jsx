import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );
            console.log("FULL RESPONSE:", res.data);

            localStorage.setItem(
                "token",
                res.data.token
            );

            localStorage.setItem(
                "userId",
                res.data.user.id
            );

            console.log(
                "Stored User ID:",
                localStorage.getItem("userId")
            );

            console.log("Stored:", localStorage.getItem("userId"));
            window.location.href = "/";

            // alert("Login Successful");

            // console.log(res.data);
            console.log("LOGIN RESPONSE");
            console.log(res.data);
            console.log(res.data.user);
            console.log(res.data.user._id);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <h1>Login</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;