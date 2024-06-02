import React, { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

const AuthProvider = (props) => {
  const { children } = props;
  const [isLogin, setIsLogin] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (!user) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const signIn = (email, password) => {
    return auth().signInWithEmailAndPassword(email, password)
  };

  const signUp = (email, password) => {
    return auth().createUserWithEmailAndPassword(email, password)
  };

  const signOut = () => {
    setIsLogin(false);
    return auth().signOut();
  };

  return (
    <AuthContext.Provider value={{ isLogin, signIn, signUp, signOut, user }}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
