import React, {useContext, useEffect} from 'react';
import './booking.css';
import { Container, Grid, Paper, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import AuthLayout  from '../layouts/authLayout';
import {ParkingContext} from "../../context/ParkingContext";
const hexToDecimal = hex => parseInt(hex, 16);
var moment = require('moment');

function ParkingBookingList() {
    const { allBookingList } = useContext(ParkingContext);
    console.log(allBookingList);
    return (
        <AuthLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Typography component="h1" variant="h5">
                        Booking List
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    { bookingListData(allBookingList) }
                </Grid>
            </Container>
        </AuthLayout>
    );
}

const bookingListData = (allBookingList) => {
    return (
        <table className="parking-booking-list" id="parking-bookings">
            <thead>
                <tr>
                    <th>User Details</th>
                    <th>Parking Details</th>
                    <th>Booking Data</th>
                    <th>Booking Date</th>
                    <th>Booking Hour</th>
                </tr>
            </thead>
            <tbody>
                {allBookingList.map(dataObj => ( 
                    <tr key={hexToDecimal(dataObj.timestamp._hex)}>
                        <td>
                            Booking By:  { dataObj.bookingBy }<br></br>
                            { dataObj.idType }:  { dataObj.idCardNumber }
                        </td>
                        <td>
                            Parking Id: { hexToDecimal(dataObj.parkingsId._hex) }<br></br>
                            { dataObj.parkingName }<br></br>
                            { dataObj.parkingAddress }
                        </td>
                        <td>
                            Booking Id: { hexToDecimal(dataObj.bookingId._hex) } <br></br>
                            Booking For: { dataObj.parkingFor }<br></br>
                            Registration No: { dataObj.vehicleRegistrationNo }
                        </td>
                        <td>{ moment.unix(hexToDecimal(dataObj.timestamp._hex)).format('ddd, MMM Do YYYY, hh:mm A') }</td>
                        <td>{ hexToDecimal(dataObj.bookingHour._hex) } {(hexToDecimal(dataObj.bookingHour._hex)>1)? "hours": "hour" }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default ParkingBookingList;
