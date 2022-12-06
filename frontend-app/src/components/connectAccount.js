import React, { useState, useContext } from 'react';
// import { useNavigate, useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ParkingContext} from "../context/ParkingContext";
import {shortenAddress} from "../utils/shortenAddress";

export default function ConnectAccount() {
    const {connectWallet, currentAccount} = useContext(ParkingContext);

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Typography component="h1" variant="h5">
                    Connect account to access Parking Portal
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                <Box component="form"  noValidate sx={{ mt: 1 }}>
                    {!currentAccount && (
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={ connectWallet }>Connect Wallet</Button>
                    )}
                    {currentAccount && (
                        <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>{ shortenAddress(currentAccount) }</Button>
                    )}
                </Box>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
            </Box>
        </Container>
    );
}