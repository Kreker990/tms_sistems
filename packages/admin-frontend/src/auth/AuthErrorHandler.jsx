import React from "react";
import { useHistory } from "react-router-dom";
import eventEmitter from "./EventEmitter";

// eslint-disable-next-line react/prop-types
function AuthErrorHandler({ children }) {
  const history = useHistory();

  React.useEffect(() => {
    const handleUnauthorized = () => {
      history.replace("/signin");
    };
    eventEmitter.on("401", handleUnauthorized);

    return () => {
      eventEmitter.off("401", handleUnauthorized);
    };
  }, []);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default AuthErrorHandler;
