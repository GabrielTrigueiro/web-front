import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import DefaultNavbar from "../../components/navbar/navbar";

const NavPages = () => {

    // if (localStorage.getItem("userInfo") === null) {
    //     return <Navigate replace to={"/login"} />;
    // }

    return (
        <div>
            <DefaultNavbar />
            <Outlet />
        </div>
    );
};

export default NavPages;
