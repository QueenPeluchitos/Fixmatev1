import {Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const AuthProvider = ({ children  }) =>{
    const isAuthenticated = Cookies.get("authToken")==="true";
    return isAuthenticated ? children : <Navigate to="/login"/>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
