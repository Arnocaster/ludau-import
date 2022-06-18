/* eslint-disable react/jsx-props-no-multi-spaces */
import React from 'react';
import './header.scss';
import {
    AppBar, Toolbar, Container, Menu, MenuItem, Typography, IconButton, Box, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

function Header() {
    const pages = {
        Home: { url: '/', display: <HomeIcon /> },
        Import: { url: '/import', display: 'Import' },
    };

    // Menu Interaction
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar id="appbar" position="sticky">
            <Container>
                <Toolbar disableGutters>
                    {/* Mobile Button */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, mr: 1 }}>
                        <IconButton onClick={handleOpenNavMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="appbar__menu"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                            keepMounted
                        >
                            {Object.keys(pages).map((page) => (
                                <MenuItem key={page}>
                                    <Typography>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.keys(pages).map((page) => (
                            <Link key={page} className="link" to={pages[page].url}>
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {pages[page].display}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default React.memo(Header);
