import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import AuthLayout  from '../layouts/authLayout';
import {ParkingContext} from "../../context/ParkingContext";
const hexToDecimal = hex => parseInt(hex, 16);

function BookParking() {
    const {formDataBooking, setFormDataBooking, handleChangeBookParking, createNewBooking, isBookingProcessing } = useContext(ParkingContext);
    const [parkingFor, setParkingForData] = React.useState('');
    let navigate = useNavigate();
    const search = useLocation().search;
    const parkingDataStr=new URLSearchParams(search). get('parkingData');
    const dataObj = JSON.parse(parkingDataStr);
    const acceptedCarTypes = dataObj[12].split(',');

    useEffect(() => {
        setFormDataBooking({
            ...formDataBooking,
            parkingId: hexToDecimal(dataObj[1].hex), 
            parkingName: dataObj[2], 
            parkingAddress: dataObj[3] + "," + dataObj[4] + "," + dataObj[5] + "," + dataObj[6] + "," + dataObj[7], 
            bookingHour: 1,
            parkingCharge: hexToDecimal(dataObj[9].hex), parkingChargeUnit: dataObj[10], parkingFor: "",
            isError: false
        });
    }, []);

    const submitBookingFormHandler = async (e) => {
        e.preventDefault();
        createNewBooking();
    }

    const handleChangeParkingFor = (e, name) => {
        setParkingForData(e.target.value);
        handleChangeBookParking(e, name);
    };
    
    const handleChangeBookingHour = (e, name) => {
        setFormDataBooking({
            ...formDataBooking,
            bookingHour: parseInt(e.target.value),
            parkingCharge: hexToDecimal(dataObj[9].hex) * parseInt(e.target.value), 
        });
    };
    return (
        <AuthLayout>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Box sx={{ marginBottom: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                    <Typography component="h1" variant="h5">
                        Book Parking
                    </Typography>
                    <Typography component="h5" variant="h6">
                        { hexToDecimal(dataObj[9].hex) + " " + dataObj[10] } / hour
                    </Typography>
                </Box>
                
                <Box component="form" onSubmit={submitBookingFormHandler}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div> 
                        <TextField sx={{ m: 1, width: '58ch' }}  disabled
                            margin="normal" required fullWidth id="parking-id" label="Parking Id" inputProps={ { readOnly: true, } }
                            name="parkingId" value={formDataBooking.parkingId} onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }} disabled
                            margin="normal" required fullWidth id="parking-id" label="Parking Name" inputProps={ { readOnly: true, } }
                            name="parkingName" value={formDataBooking.parkingName} onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '118ch' }} disabled
                            margin="normal" required fullWidth id="parking-address" label="Parking Address" multiline rows={2} inputProps={ { readOnly: true, } }
                            name="parkingAddress" value={ formDataBooking.parkingAddress } onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '25ch' }}
                            margin="normal" required fullWidth id="parking-hour" label="Booking Hour" type="number" inputProps={{ min: 1, max: 24 }}
                            name="bookingHour" autoFocus value={formDataBooking.bookingHour} onChange={handleChangeBookingHour}
                        />

                        <TextField sx={{ m: 1, width: '25ch' }} disabled
                            margin="normal" required fullWidth id="parking-charge" label="Parking Charge" type="number" inputProps={ { readOnly: true, } }
                            name="parkingCharge" value={formDataBooking.parkingCharge} onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '25ch' }} disabled
                            margin="normal" required fullWidth id="parking-charge-unit" label="Parking Charge Unit"
                            name="parkingChargeUnit" value={formDataBooking.parkingChargeUnit} onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '37ch' }}
                            margin="normal" required fullWidth id="parking-for" select label="Parking For"
                            name="parkingFor" autoFocus  onChange={handleChangeParkingFor} value={parkingFor} 
                        >
                        {acceptedCarTypes.map((option) => (
                            <MenuItem key={option} value={option}> {option} </MenuItem>
                        ))}
                        </TextField>
                    </div>
                    <div>
                        {!isBookingProcessing && (
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Book Now
                            </Button>
                        )}
                        {isBookingProcessing && (
                            <Button disabled fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Booking ...
                            </Button>
                        )}
                    </div>
                </Box>
            </Container>
        </AuthLayout>
    );
}

export default BookParking;