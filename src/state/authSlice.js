import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const loadAuthState = () => {
  try {
    const authData = localStorage.getItem("authState");
    if (authData) {
      const parsed = JSON.parse(authData);
      // Check if token is still valid (optional expiry check)
      if (parsed.expiresAt && new Date() > new Date(parsed.expiresAt)) {
        localStorage.removeItem("authState");
        return {
          isAuthenticated: false,
          user: null,
          token: null,
        };
      }
      return parsed;
    }
  } catch (error) {
    console.error("Error loading auth state:", error);
    localStorage.removeItem("authState");
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  };
};

const saveAuthState = (state) => {
  try {
    localStorage.setItem("authState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving auth state:", error);
  }
};

const clearAuthState = () => {
  try {
    localStorage.removeItem("authState");
  } catch (error) {
    console.error("Error clearing auth state:", error);
  }
};

const initialState = loadAuthState();

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Set expiry time (24 hours from now)
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      state.expiresAt = expiresAt.toISOString();

      // Save to localStorage
      saveAuthState({
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        expiresAt: state.expiresAt,
      });
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.expiresAt = null;

      // Clear localStorage
      clearAuthState();
    },
    checkAuthExpiry: (state) => {
      if (state.expiresAt && new Date() > new Date(state.expiresAt)) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.expiresAt = null;
        clearAuthState();
      }
    },
  },
});

export const { loginSuccess, logout, checkAuthExpiry } = authSlice.actions;

export default authSlice.reducer;
