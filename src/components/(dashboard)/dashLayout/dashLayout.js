"use client";

import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ChairIcon from "@mui/icons-material/Chair";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import ApartmentIcon from "@mui/icons-material/Apartment";
import RateReviewIcon from "@mui/icons-material/RateReview";
import RuleIcon from "@mui/icons-material/Rule";

import Link from "next/link";
import Loading from "@/components/loading/loading";
import Image from "next/image";

export default function DashLayout({ children, role, admin }) {
  const router = useRouter();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const openedMixin = (theme) => ({
    width: "17vw",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: "17vw",
      width: `calc(100% - ${"17vw"})`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: "17vh",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const { user, checkUser, LogOut } = useContext(AuthContext);

  let links = [];

  if (user && user.role === "Admin") {
    links = [
      { path: "/overview", text: "Overview", icon: <DashboardIcon /> },
      { path: "/admin/user", text: "Users", icon: <GroupIcon /> },
      { path: "/spaces", text: "Spaces", icon: <MapsHomeWorkIcon /> },
      { path: "/admin/amenity", text: "Amenities", icon: <ChairIcon /> },
      { path: "/event", text: "Events", icon: <EventIcon /> },
      { path: "/admin/city", text: "Cities", icon: <ApartmentIcon /> },
      { path: "/rating", text: "Ratigs", icon: <RateReviewIcon /> },
      { path: "/rule", text: "Rules", icon: <RuleIcon /> },
    ];
  } else if (user && user.role === "Manager") {
    links = [
      { path: "/spaces", text: "Spaces", icon: <MapsHomeWorkIcon /> },
      { path: "/event", text: "Events", icon: <EventIcon /> },
      { path: "/rating", text: "Ratigs", icon: <RateReviewIcon /> },
      { path: "/rule", text: "Rules", icon: <RuleIcon /> },
      { path: "/subscribed_user", text: "Sub User", icon: <GroupIcon /> },
    ];
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (checkUser) {
    return <Loading />;
  }

  if (user && role.includes(user.role)) {
    if (!admin) {
      return (
        <div style={{ display: "flex" }}>
          <CssBaseline />{" "}
          <AppBar
            position="fixed"
            open={open}
            sx={{
              bgcolor: "#4d6188",
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="p"
                noWrap
                component="div"
                sx={{
                  fontSize: "1.2rem",
                }}
              >
                CoSpace Dashboard
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Image
                src={"/logo2.svg"}
                width={80}
                height={80}
                alt="CoSpace Logo"
              />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {links.map((link, index) => (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      ":hover": {
                        bgcolor: "#4d61886e",
                      },
                      bgcolor: pathname.includes(link.path) ? "#4d61886e" : "",
                    }}
                  >
                    <Link
                      href={`/dashboard${link.path}`}
                      style={{
                        display: "flex",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {link.icon}
                      </ListItemIcon>
                      <Typography
                        component="p"
                        style={{
                          display: open ? "flex" : "none",
                        }}
                      >
                        {link.text}
                      </Typography>
                    </Link>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider />
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    ":hover": {
                      bgcolor: "#4d61886e",
                    },
                  }}
                  onClick={() => LogOut()}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <LogoutIcon />
                  </ListItemIcon>
                  <span
                    style={{
                      display: open ? "flex" : "none",
                    }}
                  >
                    Log Out
                  </span>
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    ":hover": {
                      bgcolor: "#4d61886e",
                    },
                  }}
                  onClick={() => router.push("/")}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <Link
                    href={`/`}
                    style={{
                      display: open ? "flex" : "none",
                    }}
                  >
                    Home
                  </Link>
                </ListItemButton>
              </ListItem>
              <Divider />
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{ width: open ? "78vw" : "85vw", flexGrow: 1, p: 3 }}
          >
            <DrawerHeader />
            <main
              style={{
                minHeight: "50vh",
              }}
            >
              {children}
            </main>
          </Box>
        </div>
      );
    } else {
      return <div>{children}</div>;
    }
  } else if (!checkUser || !user) {
    router.push("/unauthorized");
  }
}
