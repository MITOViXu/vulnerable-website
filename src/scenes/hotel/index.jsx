import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  useTheme,
  Container,
  Chip,
  Rating,
  Alert,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  Email,
  Wifi,
  Pool,
  Restaurant,
  LocalParking,
  Spa,
  FitnessCenter,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Hotel = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const facilities = [
    { icon: <Wifi />, name: "WiFi miễn phí" },
    { icon: <Pool />, name: "Hồ bơi" },
    { icon: <Restaurant />, name: "Nhà hàng" },
    { icon: <LocalParking />, name: "Bãi đỗ xe" },
    { icon: <Spa />, name: "Spa" },
    { icon: <FitnessCenter />, name: "Phòng gym" },
  ];

  const rooms = [
    {
      name: "Phòng Deluxe",
      price: "1,500,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=250&fit=crop",
      features: ["2 giường đơn", "Tầm nhìn thành phố", "30m²"],
    },
    {
      name: "Phòng Suite",
      price: "2,800,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=250&fit=crop",
      features: ["Giường king", "Tầm nhìn biển", "65m²"],
    },
    {
      name: "Phòng Presidential",
      price: "5,500,000 VNĐ",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
      features: ["2 phòng ngủ", "Ban công riêng", "120m²"],
    },
  ];

  const handleBooking = (roomName) => {
    alert(
      `Cảm ơn bạn đã quan tâm đến ${roomName}!\n\nVui lòng gọi +84 28 3825 1234 để đặt phòng.\nHoặc email: info@grandparadise.com`
    );
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Success Alert */}
        <Alert
          severity="success"
          sx={{
            mb: 4,
            fontSize: "1.1rem",
            "& .MuiAlert-message": {
              display: "flex",
              alignItems: "center",
              gap: 1,
            },
          }}
        >
          <Typography variant="h6" component="span">
            ✅ Đăng nhập thành công!
          </Typography>
          <Typography component="span">
            Hệ thống đã xác minh đầu vào của bạn là an toàn. Chào mừng bạn đến
            với Grand Paradise Hotel!
          </Typography>
        </Alert>

        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "bold",
            }}
          >
            🏨 Grand Paradise Hotel
          </Typography>
          <Typography variant="h5" color="textSecondary" gutterBottom>
            Trải nghiệm nghỉ dưỡng đẳng cấp 5 sao
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              mt: 2,
            }}
          >
            <Rating value={5} readOnly />
            <Typography variant="body1">(4.8/5 - 1,247 đánh giá)</Typography>
          </Box>
        </Box>

        {/* Hero Image */}
        <Box sx={{ mb: 6 }}>
          <img
            src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&h=400&fit=crop"
            alt="Grand Paradise Hotel"
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: theme.shadows[8],
            }}
          />
        </Box>

        {/* Contact Info */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
              }}
            >
              <LocationOn color="primary" />
              <Typography variant="body1">
                123 Nguyễn Huệ, Quận 1, TP.HCM
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
              }}
            >
              <Phone color="primary" />
              <Typography variant="body1">+84 28 3825 1234</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                p: 2,
                backgroundColor: theme.palette.background.paper,
                borderRadius: 2,
                boxShadow: theme.shadows[2],
              }}
            >
              <Email color="primary" />
              <Typography variant="body1">info@grandparadise.com</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* About */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Giới thiệu
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Grand Paradise Hotel là một trong những khách sạn hàng đầu tại trung
            tâm Thành phố Hồ Chí Minh. Với thiết kế hiện đại và dịch vụ đẳng cấp
            quốc tế, chúng tôi mang đến cho quý khách những trải nghiệm nghỉ
            dưỡng tuyệt vời nhất.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
          >
            Khách sạn có 200 phòng được thiết kế sang trọng, nhà hàng phục vụ ẩm
            thực đa dạng, hồ bơi ngoài trời, spa cao cấp và nhiều tiện ích khác.
            Chúng tôi cam kết mang đến sự hài lòng tuyệt đối cho mọi khách hàng.
          </Typography>
        </Box>

        {/* Facilities */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Tiện nghi
          </Typography>
          <Grid container spacing={2}>
            {facilities.map((facility, index) => (
              <Grid item xs={6} md={4} key={index}>
                <Chip
                  icon={facility.icon}
                  label={facility.name}
                  variant="outlined"
                  sx={{
                    width: "100%",
                    justifyContent: "flex-start",
                    p: 2,
                    fontSize: "1rem",
                    height: "auto",
                    "& .MuiChip-label": { p: 1 },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Rooms */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" gutterBottom color="primary">
            Phòng nghỉ
          </Typography>
          <Grid container spacing={4}>
            {rooms.map((room, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[8],
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={room.image}
                    alt={room.name}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {room.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      color="primary"
                      gutterBottom
                      fontWeight="bold"
                    >
                      {room.price}/đêm
                    </Typography>
                    <Box sx={{ mb: 2, flexGrow: 1 }}>
                      {room.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                          color="secondary"
                        />
                      ))}
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleBooking(room.name)}
                      sx={{
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        "&:hover": {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                        },
                      }}
                    >
                      Đặt phòng
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer Actions */}
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handleBackToLogin}
            sx={{ mr: 2 }}
          >
            🔙 Quay lại trang đăng nhập
          </Button>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleBooking("Grand Paradise Hotel")}
            sx={{
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
                boxShadow: "0 6px 10px 2px rgba(255, 105, 135, .4)",
              },
            }}
          >
            📞 Liên hệ đặt phòng
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Hotel;
