import { createContext, Dispatch } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";

export interface AppContextInterface {
  currentAuthenticatedUser: CognitoUser | null;
  setCurrentAuthenticatedUser: Dispatch<CognitoUser | null>;
  initializeApp: (currentUser?: CognitoUser) => Promise<void>;
}

export default createContext<AppContextInterface | null>(null);
