/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import {
    AppBar, Toolbar, Container, Menu, MenuItem, Typography, IconButton, Box, Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ImportStatus from '../../Import/ImportStatus/ImportStatus';
import { addAroundSize } from '../../../store/actions';

function debounce(fn, ms) {
    let timer;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, arguments);
        }, ms);
    };
}

function Header() {
    const dispatch = useDispatch();
    const updateStore = (size) => {
        dispatch(addAroundSize(size));
    };
    const headerRef = useRef(null);
    const [headerSize, setHeaderSize] = useState({ width: 0, height: 0 });

    const pages = {
        Home: { url: '/', display: <HomeIcon /> },
        References: { url: '/references', display: 'Références' },
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

    // Get header Height
    const debouncedHandleResize = debounce(() => {
        const { height, width } = headerRef.current.getBoundingClientRect();
        setHeaderSize({ height, width });
        updateStore({ height, width });
    }, 16);

    useEffect(() => {
        debouncedHandleResize();
        window.addEventListener('resize', debouncedHandleResize);
        return (_) => {
            window.removeEventListener('resize', debouncedHandleResize);
        };
    }, []);

    return (
        <AppBar id="appbar" position="sticky" ref={headerRef}>
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
                    <ImportStatus />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default React.memo(Header);
