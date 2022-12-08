import React, {useContext, useEffect} from 'react';
import './booking.css';
import { Container, Grid, Paper, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import AuthLayout  from '../layouts/authLayout';
import {ParkingContext} from "../../context/ParkingContext";
const hexToDecimal = hex => parseInt(hex, 16);
var moment = require('moment');
var Web3 = require('web3');

function ParkingBookingList() {
    const { currentAccount,allBookingList } = useContext(ParkingContext);
    return (
        <AuthLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Typography component="h1" variant="h5">
                        Booking List
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    { bookingListData(currentAccount, allBookingList) }
                </Grid>
            </Container>
        </AuthLayout>
    );
}

const bookingListData = (currentAccount, allBookingList) => {
    console.log(allBookingList);
    return (
        <table className="parking-booking-list" id="parking-bookings">
            <thead>
                <tr>
                    <th>Booking Details</th>
                    <th>User Details</th>
                    <th>Parking Details</th>
                    <th>Booking Date</th>
                    <th>Booking Hour</th>
                </tr>
            </thead>
            <tbody>
                {allBookingList.map(dataObj => (
                    <tr key={hexToDecimal(dataObj.timestamp._hex)}>
                        <td>
                            #Id: { hexToDecimal(dataObj.bookingId._hex) } <br></br>
                            Charge: { Web3.utils.fromWei(String(hexToDecimal(dataObj.parkingCharge._hex)), 'ether') } ETH<br></br>
                            { returnIfValidOwner(currentAccount, dataObj.bookingOwner, dataObj.parkingOwner, dataObj.parkingFor +" Registration No : " + dataObj.vehicleRegistrationNo) } 
                        </td>
                        <td>
                            Booking By:  { dataObj.bookingBy }<br></br>
                            { returnIfValidOwner(currentAccount, dataObj.bookingOwner, dataObj.parkingOwner, dataObj.idType + " : " + dataObj.idCardNumber) }
                        </td>
                        <td>
                            Parking Id: { hexToDecimal(dataObj.parkingsId._hex) }<br></br>
                            { dataObj.parkingName }<br></br>
                            { dataObj.parkingAddress }
                        </td>
                        <td>{ moment.unix(hexToDecimal(dataObj.timestamp._hex)).format('ddd, MMM Do YYYY, hh:mm A') }</td>
                        <td>{ hexToDecimal(dataObj.bookingHour._hex) } {(hexToDecimal(dataObj.bookingHour._hex)>1)? "hours": "hour" }</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

const returnIfValidOwner = (currentAccount, bookingOwner, parkingOwner, data) =>{
    if(currentAccount.toUpperCase() == bookingOwner.toUpperCase() || currentAccount.toUpperCase() == parkingOwner.toUpperCase()){
        return data;
    } else {
        return "";
    }
}

export default ParkingBookingList;
