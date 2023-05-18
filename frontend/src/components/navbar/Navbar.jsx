import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../assets/images/Logo.png";
import { NavLink } from "react-router-dom";

const pages = [
  { url: "/", name: "Home" },
  {
    name: "Text Extraction",
    url: "/text_extraction",
  },
  {
    name: "Text Summarization",
    url: "/text_summarization",
  },
  {
    name: "Video to Text",
    url: "/video_to_text",
  },
  {
    name: "Audio to Text",
    url: "/audio_to_text",
  },
  {
    name: "Text to Speech",
    url: "/text_to_speech",
  },
];
const StyledLink = styled(Typography)(({ theme }) => ({
  margin: "0 20px",
  transition: `color 0.2s ${theme.transitions.easing.sharp}`,
  color: "#000",
  fontWeight: "bold",

  "&:hover": {
    color: "#8553eb",
  },
  "&.active": {
    color: "#8553eb",
  },
}));
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ background: "#fff" }} elevation={4}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" }, flex: 1, mr: 1 }}>
            <img alt="logo" src={Logo} width={60} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "#000" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  component={NavLink}
                  to={page.url}
                  key={page.name}
                  onClick={handleCloseNavMenu}
                >
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            {" "}
            <img alt="logo" src={Logo} width={60} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <StyledLink
                variant="subtitle2"
                key={page.name}
                component={NavLink}
                to={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, display: "block" }}
              >
                {page.name}
              </StyledLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
