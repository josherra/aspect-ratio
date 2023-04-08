import { AppBar, Button, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/store";

export const Navigation = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Aspect Ratio .:.
        </Typography>
        {isLoggedIn ? (
          <Button variant="contained" onClick={() => logout()}>
            Logout
          </Button>
        ) : (
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        )}
        <Button variant="contained" component={Link} to="/">
          Home
        </Button>
        <Button variant="contained" component={Link} to="/admin">
          Admin
        </Button>
      </AppBar>
    </Box>
  );
};
