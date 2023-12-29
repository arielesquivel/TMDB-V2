import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

function GoogleAuth() {
  const clientID =
    "409976640079-obpeoku0ipdg4mrfbs6d07l6gqo1pnh1.apps.googleusercontent.com";
  const [user, setUser] = useState({});

  useEffect(() => {
    const start = () => {
      if (window.gapi) {
        window.gapi.auth2.init({
          client_id: clientID,
        });
      } else {
        setTimeout(start, 100);
      }
    };

    if (window.gapi) {
      start();
    } else {
      window.addEventListener("load", start);
    }

    return () => {
      window.removeEventListener("load", start);
    };
  }, [clientID]);

  const onSuccess = (response) => {
    setUser(response.profileObj);
  };

  const onFailure = (error) => {
    console.log("Algo salió mal:", error);
  };

  return (
    <>
      <div className="btn">
        <GoogleLogin
          clientId={clientID}
          buttonText="Iniciar sesión con Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      </div>
      <div className={user && user.name ? "profile" : "hidden"}>
        <img src={user.imageUrl} alt="" />
        <p>{user.name}</p>
      </div>
    </>
  );
}

export default GoogleAuth;
