import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  TextField,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Visibility, VisibilityOff, Login } from "@mui/icons-material";
import { useAddAttackerMutation } from "state/api";
import { useNavigate } from "react-router-dom";

const TestAttack = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const [addAttacker] = useAddAttackerMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => !loading && setOpen(false);
  const handleSnackbarClose = () => setSnackbar((s) => ({ ...s, open: false }));

  const notify = (message, severity = "info") =>
    setSnackbar({ open: true, message, severity });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      notify("Vui lòng nhập tên đăng nhập & mật khẩu", "warning");
      return;
    }

    // Bypass AI check nếu đúng thông tin đặc biệt
    if (username === "mtoan" && password === "123") {
      notify("Đăng nhập thành công. Chuyển đến trang khách sạn...", "success");
      setTimeout(() => navigate("/hotel"), 1000);
      setOpen(false);
      setUsername("");
      setPassword("");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input_val: `${username}${password}` }),
      });
      const data = await res.json();

      if (data.attack_detected) {
        const ipData = await fetch("https://api.ipify.org?format=json").then(
          (r) => r.json()
        );
        const attackerData = {
          ip: ipData.ip,
          status: "active",
          devices: [{ ip: "192.168.48.128", port: 3000 }],
        };
        await addAttacker(attackerData);
        notify(`Phát hiện SQLi! IP ${ipData.ip} đã được ghi nhận.`, "success");
      } else {
        notify("Tên đăng nhập hoặc mật khẩu không chính xác!", "error");
      }

      setOpen(false);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      notify("Đã xảy ra lỗi, vui lòng thử lại.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Login Trigger */}
      <Box display="flex" justifyContent="center" mt={4}>
        <LoadingButton
          variant="contained"
          size={isMobile ? "medium" : "large"}
          startIcon={<Login />}
          onClick={handleOpen}
        >
          Đăng nhập
        </LoadingButton>
      </Box>

      {/* Login Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ textAlign: "center", fontWeight: 600 }}>
          Đăng nhập
        </DialogTitle>
        <Box component="form" onSubmit={handleLogin}>
          <DialogContent>
            <Card elevation={0}>
              <CardHeader
                title="Thông tin tài khoản"
                titleTypographyProps={{ align: "center", variant: "subtitle1" }}
                sx={{ pb: 1 }}
              />
              <CardContent sx={{ pt: 0 }}>
                <TextField
                  label="Tên đăng nhập"
                  fullWidth
                  margin="dense"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
                <TextField
                  label="Mật khẩu"
                  fullWidth
                  margin="dense"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPwd((s) => !s)}
                          edge="end"
                        >
                          {showPwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <LoadingButton
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              loading={loading}
            >
              Huỷ
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: "#fff",
              }}
            >
              Đăng nhập
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TestAttack;
