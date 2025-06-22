import React, { useState, useEffect } from "react";
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
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Fab,
  Zoom,
  Paper,
  Stack,
  Fade,
  Tab,
  Tabs,
  useMediaQuery,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Badge,
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
  Logout,
  AccountCircle,
  Star,
  KeyboardArrowUp,
  Favorite,
  Share,
  PhotoCamera,
  CalendarMonth,
  CheckCircle,
  AccessTime,
  People,
  RoomService,
  LocalLaundryService,
  AirportShuttle,
  BusinessCenter,
  Pets,
  ExpandMore,
  Search,
  FilterList,
  ViewModule,
  ViewList,
  StarBorder,
  PersonOutline,
  DateRange,
  ArrowForward,
  PlayArrow,
  Security,
  EmojiEvents,
  TrendingUp,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "state/authSlice";

const Hotel = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState("grid");
  const [selectedRoom, setSelectedRoom] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    handleClose();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Professional data structure
  const hotelStats = [
    { number: "200+", label: "Phòng sang trọng", icon: <RoomService /> },
    { number: "15+", label: "Năm kinh nghiệm", icon: <EmojiEvents /> },
    { number: "50K+", label: "Khách hài lòng", icon: <People /> },
    { number: "4.9/5", label: "Đánh giá trung bình", icon: <Star /> },
  ];

  const amenities = [
    {
      icon: <Wifi />,
      name: "WiFi miễn phí toàn khách sạn",
      desc: "Tốc độ cao 100Mbps",
    },
    { icon: <Pool />, name: "Hồ bơi vô cực tầng thượng", desc: "Mở cửa 24/7" },
    {
      icon: <Restaurant />,
      name: "3 Nhà hàng cao cấp",
      desc: "Ẩm thực Á - Âu",
    },
    {
      icon: <Spa />,
      name: "Spa & Wellness Center",
      desc: "Dịch vụ massage chuyên nghiệp",
    },
    {
      icon: <FitnessCenter />,
      name: "Phòng gym hiện đại",
      desc: "Thiết bị Technogym",
    },
    {
      icon: <LocalParking />,
      name: "Bãi đỗ xe an toàn",
      desc: "200 chỗ đỗ xe",
    },
    {
      icon: <RoomService />,
      name: "Room Service 24/7",
      desc: "Phục vụ tận phòng",
    },
    {
      icon: <AirportShuttle />,
      name: "Đưa đón sân bay",
      desc: "Dịch vụ miễn phí",
    },
    {
      icon: <BusinessCenter />,
      name: "Trung tâm hội nghị",
      desc: "Sức chứa 500 người",
    },
  ];

  const roomTypes = [
    {
      id: 1,
      name: "Superior Room",
      subtitle: "Phòng cao cấp với tầm nhìn thành phố",
      price: 1899000,
      originalPrice: 2299000,
      currency: "VNĐ",
      image:
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
      ],
      size: "35m²",
      guests: 2,
      beds: "1 giường King hoặc 2 giường đôi",
      view: "Tầm nhìn thành phố",
      rating: 4.7,
      reviews: 284,
      features: [
        "Phòng tắm riêng với bồn tắm",
        "Ban công riêng",
        "Minibar miễn phí",
        "Smart TV 55 inch",
        "Máy pha cà phê Nespresso",
        "Két sắt điện tử",
        "Máy sấy tóc Dyson",
      ],
      amenities: [
        "WiFi miễn phí",
        "Điều hòa",
        "Room service",
        "Dọn phòng hàng ngày",
      ],
      badge: { text: "Phổ biến nhất", color: "#4CAF50" },
      promotion: "Giảm 18%",
    },
    {
      id: 2,
      name: "Executive Suite",
      subtitle: "Suite sang trọng với phòng khách riêng",
      price: 3299000,
      originalPrice: 3999000,
      currency: "VNĐ",
      image:
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
      ],
      size: "75m²",
      guests: 3,
      beds: "1 giường King size",
      view: "Tầm nhìn sông Sài Gòn",
      rating: 4.9,
      reviews: 156,
      features: [
        "Phòng khách riêng biệt",
        "Phòng tắm marble cao cấp",
        "Ban công lớn với bàn ghế",
        "Tủ quần áo walk-in",
        "Bàn làm việc executive",
        "Sofa bed bổ sung",
        "Minibar premium",
      ],
      amenities: [
        "Ưu tiên check-in",
        "Late checkout miễn phí",
        "Đưa đón sân bay",
        "Breakfast trong phòng",
      ],
      badge: { text: "Cao cấp", color: "#FF9800" },
      promotion: "Giảm 17%",
    },
    {
      id: 3,
      name: "Presidential Suite",
      subtitle: "Đỉnh cao của sự sang trọng và đẳng cấp",
      price: 6899000,
      originalPrice: 7999000,
      currency: "VNĐ",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600&h=400&fit=crop",
      ],
      size: "150m²",
      guests: 4,
      beds: "2 phòng ngủ với giường King size",
      view: "Panoramic view toàn thành phố",
      rating: 5.0,
      reviews: 89,
      features: [
        "2 phòng ngủ master",
        "Phòng khách sang trọng",
        "Phòng ăn riêng cho 8 người",
        "2 phòng tắm marble cao cấp",
        "Ban công wrap-around 360°",
        "Bếp đầy đủ tiện nghi",
        "Phòng làm việc riêng",
      ],
      amenities: [
        "Butler cá nhân 24/7",
        "Limousine đưa đón",
        "Spa trong phòng",
        "Chef riêng",
      ],
      badge: { text: "Đặc biệt", color: "#E91E63" },
      promotion: "Giảm 14%",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Minh Anh",
      role: "CEO, Tech Corp",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Dịch vụ xuất sắc, không gian sang trọng. Tôi đã có kỳ nghỉ tuyệt vời tại đây cùng gia đình.",
      date: "2 tuần trước",
    },
    {
      name: "David Wilson",
      role: "International Consultant",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service and facilities. The presidential suite exceeded all my expectations.",
      date: "1 tháng trước",
    },
    {
      name: "Trần Thị Mai",
      role: "Wedding Planner",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Địa điểm lý tưởng cho tiệc cưới. Đội ngũ chuyên nghiệp, tận tâm từ A đến Z.",
      date: "3 tuần trước",
    },
  ];

  const handleBooking = (room = null) => {
    const roomName = room ? room.name : "Grand Paradise Hotel";
    alert(
      `Cảm ơn ${
        user?.fullName || user?.username || "bạn"
      } đã quan tâm đến ${roomName}!\n\nĐại diện sẽ liên hệ với bạn trong vòng 15 phút.\n📞 Hotline: +84 28 3825 1234\n✉️ Email: reservations@grandparadise.com`
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  return (
    <>
      {/* Professional Navigation */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          color: "text.primary",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: 1, justifyContent: "space-between" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  width: 100,
                  height: 48,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  color: "white",
                }}
              >
                <Typography variant="h5" fontWeight={800}>
                  GranPara
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={700} color="black">
                  Grand Paradise
                </Typography>
                <Typography variant="caption" color="black">
                  Luxury Hotel & Resort
                </Typography>
              </Box>
            </Box>

            {/* Navigation Menu */}
            {!isMobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {[
                  "Phòng nghỉ",
                  "Tiện nghi",
                  "Dịch vụ",
                  "Ưu đãi",
                  "Liên hệ",
                ].map((item) => (
                  <Typography
                    key={item}
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      fontWeight: 500,
                      color: "black",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            )}

            {/* User Menu */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Chip
                label={`${user?.fullName || user?.username}`}
                variant="outlined"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  fontWeight: 600,
                }}
              />
              <IconButton onClick={handleMenu} size="large">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    fontWeight: 700,
                  }}
                >
                  {(user?.fullName || user?.username || "U")
                    .charAt(0)
                    .toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    borderRadius: 2,
                    minWidth: 220,
                    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <AccountCircle sx={{ mr: 2 }} />
                  Thông tin tài khoản
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Security sx={{ mr: 2 }} />
                  Bảo mật
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                  <Logout sx={{ mr: 2 }} />
                  Đăng xuất
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section - Professional */}
      <Box
        sx={{
          height: "100vh",
          position: "relative",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgba(25, 118, 210, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              'url("https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1920&h=1080&fit=crop")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.4)",
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box sx={{ color: "white", maxWidth: 800 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4rem" },
                  fontWeight: 300,
                  mb: 2,
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome to
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "3rem", md: "5rem" },
                  fontWeight: 800,
                  mb: 3,
                  letterSpacing: "-0.02em",
                  background: "linear-gradient(45deg, #FFD700, #FFA500)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Grand Paradise
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  mb: 4,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  opacity: 0.9,
                }}
              >
                Nơi nghỉ dưỡng sang trọng bậc nhất Sài Gòn
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mb: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonth />}
                  onClick={() => handleBooking()}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      boxShadow: "0 8px 25px rgba(25, 118, 210, 0.3)",
                    },
                  }}
                >
                  Đặt phòng ngay
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<PlayArrow />}
                  sx={{
                    py: 2,
                    px: 4,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 1,
                    textTransform: "none",
                    borderColor: "white",
                    color: "white",
                    "&:hover": {
                      borderColor: "white",
                      background: "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  Xem video giới thiệu
                </Button>
              </Stack>

              <Stack direction="row" spacing={4} sx={{ mt: 6 }}>
                {hotelStats.map((stat, index) => (
                  <Box key={index} sx={{ textAlign: "center" }}>
                    <Typography variant="h4" fontWeight={700}>
                      {stat.number}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 8 }}>
        {/* Quick Booking Widget */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 8,
            borderRadius: 3,
            border: "1px solid",
            borderColor: "divider",
            transform: "translateY(-50px)",
            background: "background.paper",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Ngày nhận phòng"
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Ngày trả phòng"
                type="date"
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="Số khách"
                select
                SelectProps={{ native: true }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutline />
                    </InputAdornment>
                  ),
                }}
              >
                <option value={1}>1 khách</option>
                <option value={2}>2 khách</option>
                <option value={3}>3 khách</option>
                <option value={4}>4+ khách</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                endIcon={<Search />}
                sx={{
                  py: 2,
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                Tìm phòng trống
              </Button>
            </Grid>
          </Grid>
        </Paper>

        {/* Room Types Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "text.primary",
                mb: 2,
              }}
            >
              Phòng nghỉ cao cấp
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                maxWidth: 600,
                mx: "auto",
                fontWeight: 400,
              }}
            >
              Trải nghiệm không gian sống đẳng cấp với thiết kế hiện đại và tiện
              nghi 5 sao
            </Typography>
          </Box>

          {/* Room Filter & View Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                size="small"
                placeholder="Tìm kiếm phòng..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{ minWidth: 250 }}
              />
              <IconButton>
                <FilterList />
              </IconButton>
            </Box>
            <Box>
              <IconButton
                onClick={() => setViewMode("grid")}
                color={viewMode === "grid" ? "primary" : "default"}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode("list")}
                color={viewMode === "list" ? "primary" : "default"}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>

          {/* Rooms Grid */}
          <Grid container spacing={4}>
            {roomTypes.map((room, index) => (
              <Grid
                item
                xs={12}
                md={viewMode === "grid" ? 4 : 12}
                key={room.id}
              >
                <Fade in timeout={500 + index * 200}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      overflow: "hidden",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border: "1px solid",
                      borderColor: "divider",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height={viewMode === "grid" ? 280 : 200}
                        image={room.image}
                        alt={room.name}
                      />

                      {/* Badges */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 16,
                          left: 16,
                          display: "flex",
                          gap: 1,
                        }}
                      >
                        <Chip
                          label={room.badge.text}
                          size="small"
                          sx={{
                            backgroundColor: room.badge.color,
                            color: "white",
                            fontWeight: 600,
                          }}
                        />
                        {room.promotion && (
                          <Chip
                            label={room.promotion}
                            size="small"
                            sx={{
                              backgroundColor: "#E91E63",
                              color: "white",
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>

                      {/* Favorite Button */}
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: 16,
                          right: 16,
                          backgroundColor: "rgba(255,255,255,0.9)",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                        }}
                      >
                        <Favorite sx={{ color: "grey.400" }} />
                      </IconButton>
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 2,
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography
                            variant="h5"
                            fontWeight={700}
                            gutterBottom
                          >
                            {room.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {room.subtitle}
                          </Typography>
                        </Box>
                        <Box sx={{ textAlign: "right" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              textDecoration: "line-through",
                              color: "text.secondary",
                            }}
                          >
                            {formatPrice(room.originalPrice)} {room.currency}
                          </Typography>
                          <Typography
                            variant="h4"
                            color="primary"
                            fontWeight={700}
                          >
                            {formatPrice(room.price)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            /{room.currency} đêm
                          </Typography>
                        </Box>
                      </Box>

                      {/* Rating */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Rating
                          value={room.rating}
                          readOnly
                          precision={0.1}
                          size="small"
                        />
                        <Typography variant="body2" color="text.secondary">
                          {room.rating} ({room.reviews} đánh giá)
                        </Typography>
                      </Box>

                      {/* Room Info */}
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Diện tích: <strong>{room.size}</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2" color="text.secondary">
                            Sức chứa: <strong>{room.guests} khách</strong>
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="text.secondary">
                            {room.beds} • {room.view}
                          </Typography>
                        </Grid>
                      </Grid>

                      {/* Amenities */}
                      <Box sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                          {room.amenities.slice(0, 3).map((amenity, idx) => (
                            <Chip
                              key={idx}
                              label={amenity}
                              size="small"
                              variant="outlined"
                              sx={{ mb: 1 }}
                            />
                          ))}
                          {room.amenities.length > 3 && (
                            <Chip
                              label={`+${room.amenities.length - 3} more`}
                              size="small"
                              variant="outlined"
                              sx={{ mb: 1 }}
                            />
                          )}
                        </Stack>
                      </Box>

                      {/* Actions */}
                      <Stack direction="row" spacing={2}>
                        <Button
                          variant="outlined"
                          fullWidth
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth
                          endIcon={<ArrowForward />}
                          onClick={() => handleBooking(room)}
                          sx={{
                            textTransform: "none",
                            fontWeight: 600,
                          }}
                        >
                          Đặt ngay
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Amenities Section */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Tiện nghi & Dịch vụ
          </Typography>
          <Grid container spacing={3}>
            {amenities.map((amenity, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in timeout={1000 + index * 100}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                        borderColor: "primary.main",
                      },
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          backgroundColor: "primary.main",
                          color: "white",
                        }}
                      >
                        {amenity.icon}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                          {amenity.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {amenity.desc}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonials */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h3"
            gutterBottom
            textAlign="center"
            sx={{ fontWeight: 700, mb: 6 }}
          >
            Đánh giá từ khách hàng
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in timeout={1500 + index * 200}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      height: "100%",
                    }}
                  >
                    <Rating
                      value={testimonial.rating}
                      readOnly
                      sx={{ mb: 2 }}
                    />
                    <Typography
                      variant="body1"
                      paragraph
                      sx={{ fontStyle: "italic" }}
                    >
                      "{testimonial.text}"
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={testimonial.avatar}
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {testimonial.role} • {testimonial.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Contact Section */}
        <Paper
          elevation={0}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            background:
              "linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)",
            border: "1px solid",
            borderColor: "primary.main",
            borderOpacity: 0.2,
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Sẵn sàng trải nghiệm?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{ mb: 4 }}
          >
            Liên hệ ngay để được tư vấn và nhận ưu đãi đặc biệt dành riêng cho
            bạn
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              onClick={() => handleBooking()}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Gọi ngay: 028 3825 1234
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<Email />}
              sx={{
                py: 2,
                px: 4,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Gửi email tư vấn
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* Back to Top */}
      <Zoom in={showBackToTop}>
        <Fab
          color="primary"
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      </Zoom>
    </>
  );
};

export default Hotel;
