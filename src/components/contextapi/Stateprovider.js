import React, { useReducer, useContext, createContext, useEffect } from "react";

export const StateContext = createContext();

export const Stateprovider = ({ reducer, children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const actionTypes = {
  SET_USER: "SET_USER",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
