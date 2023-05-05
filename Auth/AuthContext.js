import React, { useState } from "react";

const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
  signIn: async () => {},
  addToFavorites: async () => {},
});

export default AuthContext;
