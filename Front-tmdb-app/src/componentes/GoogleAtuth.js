import React, { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
function GoogleAuth() {
  const clientID =
    "409976640079-obpeoku0ipdg4mrfbs6d07l6gqo1pnh1.apps.googleusercontent.com";
  const [user, setUser] = useState({});

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientID: clientID,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  const onSuccess = (response) => {
    setUser("se inicio correctamente", response.profileObj);
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
