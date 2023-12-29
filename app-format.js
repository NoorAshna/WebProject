import {React,useState,useEffect} from "react"
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import { BookList } from "./BookList/BookList"  
import { LoginDialog } from './Login/login';
import {
  AppBar,
  Box,
  Toolbar,
  Avatar,
  Button,
  Container,
  Typography,
} from '@mui/material';

export const AppFormat = () => {
  //logic for login dialog box
const [openLoginDialog, setOpenLoginDialog] = useState(false)
// function for loginsubmit
const handleLoginSubmit = (username, password) =>
{
  console.log('Login Submitted:',username,password)
  setOpenLoginDialog(false)

}
const handleLoginClose=() =>
{
  setOpenLoginDialog(false)
}
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar
              alt="Library Management System"
              src="client\icons\download.jpeg"
              sx={{ width: 50, height: 50, marginRight: 1 }}
            />
            <Link to="/" style={{ textDecoration: 'none', flexGrow: 5 }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  mr: 3,
                  display: 'flex',
                  fontFamily: 'revert-layer',
                  fontWeight: 900,
                  letterSpacing: '.2rem',
                  color: 'black',
                }}
              >
                Library Management System
              </Typography>
            </Link>
            <Box
              sx={{
                flexGrow: 0,
              }}
            >
              <Button
                onClick={() => {
                   setOpenLoginDialog(true)
                }}
                sx={{ my: 2, color: 'black', display: 'block', fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Routes>
        <Route path="/books"  element={<BookList />} />
        {/* fallback route handle 404-like scenarios  */}
        <Route path="*" element={<Navigate to="/books"  
         replace />} />
      </Routes>
      <LoginDialog
      open={openLoginDialog}
      handleSubmit={handleLoginSubmit}
      handleClose={handleLoginClose} />

    </>
  );
};
