import React, { useState } from "react";
import Amplify, { Auth } from "aws-amplify";
import awsConfig from "./aws-exports";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";
import Navigation from "navigation";
import AppContext from "appcontext";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import { CognitoUser } from "amazon-cognito-identity-js";

Amplify.configure(awsConfig);

export default function App() {
  const [
    currentAuthenticatedUser,
    setCurrentAuthenticatedUser
  ] = useState<CognitoUser | null>(null);

  const [appReady, setAppReady] = useState(false);

  async function loadResources() {
    return Promise.all([
      Asset.loadAsync([
        require("./assets/icon.png"),
        require("./assets/splash.png")
      ])
    ]);
  }

  async function initialize(currentUser?: CognitoUser) {
    if (currentUser) {
      setCurrentAuthenticatedUser(currentUser);
    } else {
      const currUser = await Auth.currentAuthenticatedUser();
      if (currUser) {
        setCurrentAuthenticatedUser(currUser);
      }
    }
  }

  if (!appReady) {
    return (
      <AppLoading
        startAsync={async () => {
          await initialize();
          await loadResources();
        }}
        onFinish={() => setAppReady(true)}
      />
    );
  }

  return (
    <ApplicationProvider mapping={mapping} theme={lightTheme}>
      <AppContext.Provider
        value={{
          currentAuthenticatedUser,
          setCurrentAuthenticatedUser,
          initializeApp: initialize
        }}
      >
        <Navigation />
      </AppContext.Provider>
    </ApplicationProvider>
  );
}
