import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from "@mui/material"
import { useUser } from "../../context/user-context"

import { Route, Routes, Navigate, Link } from "react-router-dom"
import { UserProfile } from "../userprofile/userProfile";
import { BooksList } from "../books-list/books-list"
import { LoginDialog } from "../login/login-dialog"
import { BookForm } from "../book-form/book-form"
import { Book } from "../book/book"
import { WithLoginProtector } from "../access-control/login-protector"
import { WithAdminProtector } from "../access-control/admin-protector"
import { BackendApi } from "../../client/backend-api";
import { AddUser } from "../addUser/addUser";

export const AppLayout = () => {

    const [openLoginDialog, setOpenLoginDialog] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { user, loginUser, logoutUser, isAdmin } = useUser()
    const [userId, setUserId]= useState(null);
    
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLoginSubmit = (username, password) => {
        loginUser(username, password)
        setOpenLoginDialog(false)
    }

    const handleLoginClose = () => {
        setOpenLoginDialog(false)
    }

    const handleLogout = () => {
        logoutUser()
        handleCloseUserMenu()
    }

    const handleProfile =  async ()=>{
       
       setUserId(user.userId);
    //   console.log(user._id)
    navigate(`/user/${userId}`)
    }
    useEffect(() => {
        if (!user) {
            navigate("/")
           
        } else if (isAdmin) {
            navigate("/admin/books/add")
        }
        
    }, [user, isAdmin])

    return (
        <>
            <AppBar position="static" sx={{backgroundColor:"#D52E0A", minHeight:128}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <LibraryBooksIcon sx={{ mr:2}} />
                        <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
                            <Typography
                                variant="h4"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: "flex",
                                    
                                    fontWeight: 700,
                                    letterSpacing: ".2rem",
                                    color: "white",
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
                            {user ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar> {user.username.charAt(0).toUpperCase() } </Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: "45px" }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">Dashboard</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                        <MenuItem onClick={handleProfile} >
                                            <Typography textAlign="center">Profile</Typography>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (<>
                                <Button
                                    onClick={() => {
                                        navigate("/user/registerUser")
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Register
                                </Button>
                                <Button
                                    onClick={() => {
                                        setOpenLoginDialog(true)
                                    }}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                >
                                    Login
                                </Button></>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
                <Typography
                                // variant="h7"
                                noWrap
                                sx={{
                                    ml: 3,
                                    display: "flex",
                                    fontWeight: 400,
                                   
                                    color: "white",
                                    maxWidth:500
                                }}
                            >
                                The library Management System Provides a <br/> platform to streamline your Library tasks
                            </Typography>
            </AppBar>
            <Routes>
                <Route path="/books" exact element={<BooksList />} />
                <Route
                    path="/books/:bookIsbn"
                    element={
                        <WithLoginProtector>
                            <Book />
                        </WithLoginProtector>
                    }
                />
                <Route
                    path="/admin/books/add"
                    element={
                        <WithLoginProtector>
                            <WithAdminProtector>
                                <BookForm />
                            </WithAdminProtector>
                        </WithLoginProtector>
                    }
                    exact
                />
                <Route
                    path="/admin/books/:bookIsbn/edit"
                    element={
                        <WithLoginProtector>
                            <WithAdminProtector>
                                <BookForm />
                            </WithAdminProtector>
                        </WithLoginProtector>
                    }
                />
                <Route
                    path="/user/:userId"
                    element={
                        <WithLoginProtector>
                            
                                <UserProfile />
                            
                        </WithLoginProtector> 
                    }
                />
                <Route
                    path="/user/registerUser"
                    element={
                       
                                <AddUser />   
                    }
                />
                <Route path="*" element={<Navigate to="/books" replace />} />
            </Routes>
            <LoginDialog
                open={openLoginDialog}
                handleSubmit={handleLoginSubmit}
                handleClose={handleLoginClose}
            />

        </>
    )
}