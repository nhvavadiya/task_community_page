import {
  Avatar,
  Box,
  Container,
  InputAdornment,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WorkIcon from "@mui/icons-material/Work";
import TextsmsIcon from "@mui/icons-material/Textsms";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [value] = useState("one");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  const navBarTabs = [
    {
      label: 'Home',
      icon: <HomeIcon />,
      value: 'one'
    },
    {
      label: 'Network',
      icon: <PeopleAltIcon />,
      value: 'two'
    },
    {
      label: 'Job',
      icon: <WorkIcon />,
      value: 'three'
    },
    {
      label: 'Message',
      icon: <TextsmsIcon />,
      value: 'four'
    },
    {
      label: 'Notification',
      icon: <NotificationsIcon />,
      value: 'five'
    },
  ]
  return (
    <Box className="App" sx={{ backgroundColor: "whitesmoke" }}>
      <Container fixed sx={{ height: '50px' }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: '100%'
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <img src="favicon.ico" height={35} width={35} alt="img" />
            <TextField
              id="outlined-search"
              placeholder="Search"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                sx: { height: "2.2rem" },
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ gap: "1.5rem", display: { xs: 'none', md: 'flex' } }}>
            <Tabs
              value={value}
              sx={{ fontSize: "5px", padding: '0px', minHeight: '50px' }}
            >

              {
                navBarTabs.map((tab) => {
                  return (
                    <Tab
                      key={tab.value}
                      value={tab.value}
                      label={tab.label}
                      icon={tab.icon}
                      sx={{ fontSize: "11px", padding: '0px', minHeight: '50px' }}
                    />
                  )
                })
              }
              <Tab
                value="six"
                label="Profile"
                sx={{ fontSize: "11px", padding: '0px', minHeight: '50px' }}
                icon={
                  <Avatar
                    sx={{
                      bgcolor: '#e91e63',
                      height: 24,
                      width: 24,
                    }}
                  >
                    <Typography fontSize={12}>J</Typography>

                  </Avatar>
                }
              />
            </Tabs>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Navbar;
