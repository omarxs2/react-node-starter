import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { deleteToken } from "../../auth/store/loginSlice";
import { useDispatch } from "react-redux";

const pages = ["الاعدادات", "التقارير", "الملف الشخصي"];

const ResponsiveAppBar = () => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(deleteToken());
  };

  const handleCloseNavMenu = () => {};

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button
            onClick={logout}
            variant="outlined"
            sx={{ textTransform: "none" }}
            color="inherit"
          >
            تسجيل خروج
          </Button>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  textTransform: "none",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            تطبيق أمان الورشات
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
