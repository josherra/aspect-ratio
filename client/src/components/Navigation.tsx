import { AppBar, Typography, TextField } from "@mui/material";
import { Box } from "@mui/system";

export const Navigation = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ padding: "1rem" }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Aspect Ratio .:.
        </Typography>
      </AppBar>
    </Box>
  );
};
