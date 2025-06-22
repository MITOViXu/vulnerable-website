import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import { checkAuthExpiry } from "state/authSlice";

import TestAttack from "scenes/testAttack";
import Hotel from "scenes/hotel";
import ProtectedRoute from "components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.global.mode);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  // Check authentication status on app load
  useEffect(() => {
    dispatch(checkAuthExpiry());
  }, [dispatch]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            {/* Public routes */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/hotel" replace />
                ) : (
                  <TestAttack />
                )
              }
            />

            {/* Protected routes */}
            <Route
              path="/hotel"
              element={
                <ProtectedRoute>
                  <Hotel />
                </ProtectedRoute>
              }
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
