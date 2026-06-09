import { Link } from "react-router-dom";

function Navbar() {
    const token =
        localStorage.getItem("token");
    return (

        <nav className="navbar">

            <h2 className="logo">MemeHub 🔥</h2>

            <div className="nav-links">

                <Link to="/">
                    Feed
                </Link>

                <Link to="/create">
                    Create
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                {
                    !token ? (
                        <>
                            <Link to="/login">
                                Login
                            </Link>

                            <Link to="/signup">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={() => {

                                localStorage.removeItem(
                                    "token"
                                );

                                window.location.href =
                                    "/login";

                            }}
                        >
                            Logout
                        </button>
                    )
                }
            </div>

        </nav>



    );
}

export default Navbar;