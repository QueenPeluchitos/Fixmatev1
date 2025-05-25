import { useEffect, useState, useCallback } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "./UserContext";

const AuthProvider = ({ children }) => {
    const [checking, setChecking] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // Nueva función para refrescar el usuario desde cualquier componente
    const refreshUser = useCallback(async () => {
        setChecking(true);
        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                credentials: "include",
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data);
                setIsAuthenticated(true);
                console.log('AuthProvider: usuario cargado correctamente', data);
            } else {
                setUser(null);
                setIsAuthenticated(false);
                console.error('AuthProvider: error al obtener el usuario. Status:', res.status);
            }
        } catch (e) {
            setUser(null);
            setIsAuthenticated(false);
            console.error('AuthProvider: error de red/fetch al obtener usuario', e);
        } finally {
            setChecking(false);
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    if (checking) return null; // O un loader
    return isAuthenticated ? (
        <UserContext.Provider value={{ user, refreshUser }}>{children}</UserContext.Provider>
    ) : (
        <Navigate to="/login" />
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
