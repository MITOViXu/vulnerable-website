import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useTheme,
  TextField,
  CardMedia,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useMediaQuery,
  Typography,
  Fade,
  Slide,
  Button,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  Visibility,
  VisibilityOff,
  Login,
  Security,
  Warning,
  Error,
  Shield,
  VpnLock,
  Close,
  Report,
  CheckCircle,
} from "@mui/icons-material";
import { useAddAttackerMutation } from "state/api";
import { useDispatch } from "react-redux";
import { loginSuccess } from "state/authSlice";
import { useNavigate } from "react-router-dom";

const TestAttack = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Enhanced notification states
  const [sqlInjectionAlert, setSqlInjectionAlert] = useState({
    open: false,
    ip: "",
    details: "",
  });
  const [loginErrorAlert, setLoginErrorAlert] = useState({
    open: false,
    attempts: 0,
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
      notify("Vui lòng nhập đầy đủ thông tin đăng nhập", "warning");
      return;
    }

    // Kiểm tra thông tin đăng nhập hợp lệ
    if (username === "mtoan" && password === "123") {
      // Đăng nhập thành công - lưu vào Redux store và localStorage
      const userData = {
        username: "mtoan",
        fullName: "Minh Toàn",
        role: "admin",
        loginTime: new Date().toISOString(),
      };

      const authToken = `token_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      dispatch(
        loginSuccess({
          user: userData,
          token: authToken,
        })
      );

      notify("✅ Đăng nhập thành công! Chuyển hướng...", "success");

      setTimeout(() => {
        setOpen(false);
        setUsername("");
        setPassword("");
        navigate("/hotel");
      }, 1500);

      return;
    }

    // Kiểm tra SQL Injection cho các input khác
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

        // Enhanced SQL Injection Alert
        setSqlInjectionAlert({
          open: true,
          ip: ipData.ip,
          details: `Input: "${username}${password.substring(0, 10)}${
            password.length > 10 ? "..." : ""
          }"`,
        });

        setOpen(false);
        setUsername("");
        setPassword("");
      } else {
        // Enhanced Login Error Alert
        setLoginErrorAlert({
          open: true,
          attempts: (loginErrorAlert.attempts || 0) + 1,
        });

        setOpen(false);
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error(err);
      notify("🔌 Không thể kết nối đến máy chủ xác thực", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
        p: 2,
      }}
    >
      {/* Header */}
      <Fade in timeout={1000}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <CardMedia
            component="img"
            height="200"
            image="https://img.freepik.com/premium-vector/hotel-logo-icon-vector-hotel-logo-silhouette-building-vector-illustration_1199258-5038.jpg"
            sx={{
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
              mb: 2,
            }}
          />
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              color: "#FFFFFF",
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              mb: 3,
              fontSize: { xs: "1.5rem", md: "2rem" },
              letterSpacing: "0.02em",
            }}
          >
            Grand Paradise Hotel
          </Typography>
          <Chip
            icon={<Shield sx={{ color: "#FFFFFF !important" }} />}
            label="Được bảo vệ bởi Injex Watch"
            variant="filled"
            sx={{
              mt: 1,
              fontWeight: 700,
              fontSize: "1rem",
              px: 2,
              py: 1,
              color: "#FFFFFF",
              backgroundColor: "rgba(25, 118, 210, 0.9)",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 16px rgba(25, 118, 210, 0.4)",
              "& .MuiChip-label": {
                color: "#FFFFFF",
                fontWeight: 700,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              },
              "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 1)",
                boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                transform: "translateY(-1px)",
              },
            }}
          />
        </Box>
      </Fade>

      {/* Login Trigger */}
      <Fade in timeout={1500}>
        <LoadingButton
          variant="contained"
          size="large"
          startIcon={<Login />}
          onClick={handleOpen}
          sx={{
            padding: "16px 40px",
            fontSize: "1.2rem",
            fontWeight: 600,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            boxShadow: "0 8px 25px rgba(25, 118, 210, 0.3)",
            "&:hover": {
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              transform: "translateY(-3px)",
              boxShadow: "0 12px 35px rgba(25, 118, 210, 0.4)",
            },
          }}
        >
          Đăng nhập hệ thống
        </LoadingButton>
      </Fade>

      {/* Info Card */}
      <Fade in timeout={2000}>
        <Card
          sx={{
            mt: 6,
            maxWidth: 650,
            background: theme.palette.background.paper,
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              gutterBottom
              color="primary"
              sx={{ mb: 3, fontWeight: 600 }}
            >
              ℹ️ Hướng dẫn đăng nhập
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CheckCircle sx={{ color: "success.main" }} />
                <Typography variant="body2">
                  <strong>Tài khoản hợp lệ:</strong> Liên hệ{" "}
                  <strong>09123456789</strong> để đăng ký
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Error sx={{ color: "error.main" }} />
                <Typography variant="body2">
                  <strong>Quên mật khẩu:</strong> Gọi hotline{" "}
                  <strong>09125551119</strong>
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <VpnLock sx={{ color: "warning.main" }} />
                <Typography
                  variant="body2"
                  color="warning.main"
                  fontWeight={600}
                >
                  <strong>Bảo mật:</strong> Hệ thống được bảo vệ khỏi SQL
                  Injection và tấn công mạng
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Fade>

      {/* Login Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 700, fontSize: "1.3rem" }}
        >
          🔐 Xác thực người dùng
        </DialogTitle>
        <Box component="form" onSubmit={handleLogin}>
          <DialogContent sx={{ pb: 2 }}>
            <Box sx={{ p: 3 }}>
              <TextField
                label="Tên đăng nhập"
                placeholder="Nhập tên đăng nhập của bạn"
                fullWidth
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                disabled={loading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "text.primary",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root": {
                    color: "text.secondary",
                    fontWeight: 600,
                  },
                }}
              />
              <TextField
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn"
                fullWidth
                margin="normal"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "background.paper",
                    "& fieldset": {
                      borderColor: "divider",
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "text.primary",
                    fontWeight: 500,
                  },
                  "& .MuiInputLabel-root": {
                    color: "text.secondary",
                    fontWeight: 600,
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd((s) => !s)}
                        edge="end"
                        disabled={loading}
                        sx={{ color: "text.secondary" }}
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={loading}
              sx={{
                flex: 1,
                py: 1.5,
                fontWeight: 600,
                borderColor: "divider",
                color: "text.primary",
                backgroundColor: "background.paper",
                "&:hover": {
                  borderColor: "primary.main",
                  backgroundColor: "action.hover",
                  color: "primary.main",
                },
                "&:disabled": {
                  borderColor: "action.disabled",
                  color: "action.disabled",
                },
              }}
            >
              Hủy
            </Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              sx={{
                flex: 2,
                py: 1.5,
                fontWeight: 700,
                fontSize: "1rem",
                color: "#FFFFFF",
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                boxShadow: "0 4px 12px rgba(25, 118, 210, 0.4)",
                "&:hover": {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
                  boxShadow: "0 6px 16px rgba(25, 118, 210, 0.5)",
                  transform: "translateY(-1px)",
                },
                "&:disabled": {
                  background: "action.disabled",
                  color: "action.disabled",
                },
              }}
            >
              Đăng nhập
            </LoadingButton>
          </DialogActions>
        </Box>
      </Dialog>

      {/* SQL Injection Detection Alert */}
      <Dialog
        open={sqlInjectionAlert.open}
        onClose={() => setSqlInjectionAlert({ open: false })}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: "2px solid",
            borderColor: "error.main",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "error.main",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Warning sx={{ fontSize: 30 }} />
          <Typography variant="h6" fontWeight={700}>
            🚨 CẢNH BÁO BẢO MẬT
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4 }}>
          <Alert severity="error" sx={{ mb: 3, fontSize: "1.1rem" }}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Phát hiện SQL Injection Attack!
            </Typography>
          </Alert>

          <Stack spacing={2}>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="error.main"
              >
                🌐 Địa chỉ IP tấn công:
              </Typography>
              <Chip
                label={sqlInjectionAlert.ip}
                color="error"
                variant="outlined"
                sx={{ fontFamily: "monospace", fontSize: "1rem" }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle1"
                fontWeight={600}
                color="error.main"
              >
                📝 Thông tin chi tiết:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "monospace",
                  bgcolor: "black",
                  p: 2,
                  borderRadius: 1,
                  wordBreak: "break-all",
                }}
              >
                {sqlInjectionAlert.details}
              </Typography>
            </Box>

            <Alert severity="warning">
              <Typography variant="body2">
                ⚠️ Hành vi này đã được ghi lại và báo cáo tới quản trị viên hệ
                thống. Việc tiếp tục các hành vi tấn công có thể dẫn đến việc bị
                khóa IP vĩnh viễn.
              </Typography>
            </Alert>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setSqlInjectionAlert({ open: false })}
            variant="contained"
            color="error"
            startIcon={<Close />}
            fullWidth
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            Đã hiểu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login Error Alert */}
      <Dialog
        open={loginErrorAlert.open}
        onClose={() => setLoginErrorAlert({ open: false })}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: "2px solid",
            borderColor: "warning.main",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "warning.main",
            color: "white",
            textAlign: "center",
          }}
        >
          <Error sx={{ fontSize: 40, mb: 1 }} />
          <Typography variant="h6" fontWeight={700}>
            Đăng nhập thất bại
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 4, textAlign: "center" }}>
          <Typography
            variant="h6"
            gutterBottom
            fontWeight={600}
            color="error.main"
          >
            ❌ Thông tin đăng nhập không chính xác
          </Typography>

          <Typography variant="body1" paragraph>
            Tên đăng nhập hoặc mật khẩu bạn nhập không đúng.
          </Typography>

          {loginErrorAlert.attempts > 1 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              <Typography variant="body2">
                ⚠️ Bạn đã thử đăng nhập{" "}
                <strong>{loginErrorAlert.attempts}</strong> lần không thành
                công.
                {loginErrorAlert.attempts >= 3 &&
                  " Tài khoản có thể bị tạm khóa sau 5 lần thử."}
              </Typography>
            </Alert>
          )}

          <Box sx={{ mt: 3, p: 2, bgcolor: "grey.50", borderRadius: 2 }}>
            <Typography variant="body2" color="black">
              💡 <strong>Cần hỗ trợ?</strong>
              <br />
              📞 Hotline: 09125551119
              <br />
              📧 Email: support@grandparadise.com
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setLoginErrorAlert({ open: false })}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5, fontWeight: 600 }}
          >
            Thử lại
          </Button>
        </DialogActions>
      </Dialog>

      {/* Standard Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{
            width: "100%",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TestAttack;
