import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuthExpiry } from "state/authSlice";
import { Box, CircularProgress, Typography } from "@mui/material";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  // Check auth expiry on component mount
  useEffect(() => {
    dispatch(checkAuthExpiry());
  }, [dispatch]);

  // Show loading while checking authentication
  if (isAuthenticated === undefined) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="h6">Đang kiểm tra đăng nhập...</Typography>
      </Box>
    );
  }

  // If not authenticated, redirect to login with return url
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
