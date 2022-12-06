import React, {useContext} from 'react';
import { Container, Grid, Paper, Box, Typography } from '@mui/material';
import AuthLayout  from './layouts/authLayout';
import {ParkingContext} from "../context/ParkingContext";
import {shortenAddress} from "../utils/shortenAddress";

function Dashboard() {
    const {currentAccount} = useContext(ParkingContext);
    return (
        <AuthLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Typography component="h1" variant="h5">
                        Dashboard
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={4}> </Grid>
                    <Grid item xs={4}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                            Connected Account:  { shortenAddress (currentAccount) }
                        </Paper>
                    </Grid>
                    <Grid item xs={4}> </Grid>
                </Grid>
            </Container>
        </AuthLayout>
    );
}

export default Dashboard;