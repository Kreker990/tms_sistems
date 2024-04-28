import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';

import eventEmitter from "./EventEmitter";
import { getToken, TokenTypes } from "./tokenRepository";
import { isTokenExpired } from "./jwtDomain";

function ProtectedRoute({ redirectPath, children }) {
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [tokenChecked, setTokenChecked] = React.useState(false);

  React.useEffect(() => {
    const checkToken = async () => {
      const token = await getToken(TokenTypes.ACCESS);
      if (token && !isTokenExpired(token)) {
        setIsAuthenticated(true);
      }

      setTokenChecked(true);
    };

    checkToken();
  }, []);

  React.useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/signin");
    };
    eventEmitter.on("401", handleUnauthorized);

    return () => {
      eventEmitter.off("401", handleUnauthorized);
    };
  }, []);

  if (!isAuthenticated && tokenChecked) {
    navigate(redirectPath);
    return null;
  }

  if (!tokenChecked) {
    return null;
  }

  return children;
}

ProtectedRoute.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

ProtectedRoute.defaultProps = {
  redirectPath: "/signin",
};

export default ProtectedRoute;
