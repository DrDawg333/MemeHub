import { useState } from "react";
import api from "../services/api";

function Signup() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await api.post(
                "/auth/signup",
                {
                    username,
                    email,
                    password
                }
            );

            alert("Signup Successful");

            console.log(res.data);

        } catch (error) {

            console.error(error);

        }
    };

    return (
        <div>

            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                />

                <br />

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
                    Signup
                </button>

            </form>

        </div>
    );
}

export default Signup;