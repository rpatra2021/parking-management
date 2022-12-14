import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Paper, Box, Typography, Button, Avatar } from '@mui/material';
import {ParkingContext} from "../../context/ParkingContext";
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AuthLayout  from '../layouts/authLayout';
const hexToDecimal = hex => parseInt(hex, 16);

function ParkingList() {
    const {currentAccount, allParkingList} = useContext(ParkingContext);
    let navigate = useNavigate();
    return (
        <AuthLayout>
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ marginTop: 2, marginBottom: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <Typography component="h1" variant="h5">
                        Parking List
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    { parkingListData(allParkingList, navigate) }
                </Grid>
            </Container>
        </AuthLayout>
    );
}

const parkingListData = (allParkingLists, navigate) => {
    return (
        allParkingLists.map(dataObj => ( 
            <Grid item xs={4} key={hexToDecimal(dataObj.timestamp._hex)}>
                <Paper sx={{ p:1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                        <div style={{color: "#1976d2"}}>
                            # <b>{ hexToDecimal(dataObj.parkingId._hex) }</b>
                        </div>
                        <Typography component="h1" variant="h5" style={{color: "#0fb896"}}>
                            { dataObj.parkingName }
                        </Typography>
                    </Box>
                    <div>
                        { hexToDecimal(dataObj.parkingAmount._hex) } { dataObj.amountUnit } / hour
                    </div>
                    <div>
                        <b>{ dataObj.parkingAddress }, { dataObj.parkingCity }, { dataObj.parkingState }, { dataObj.parkingCountry }, PinCode: { dataObj.parkingZipCode }</b>
                    </div>
                    <div>
                        Parking Capacity: { hexToDecimal(dataObj.parkingCapacity._hex) }
                    </div>
                    <div>
                        We accept: { dataObj.vehicleType }
                    </div>
                    <div>
                        <Button onClick={() => navigate('/book-parking?parkingData='+JSON.stringify(dataObj))} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                            Book Now
                        </Button>
                    </div>
                </Paper>
            </Grid>
        ))
    )
};

export default ParkingList;