import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Box, Typography, Button, TextField, MenuItem } from '@mui/material';
import AuthLayout  from '../layouts/authLayout';
import {ParkingContext} from "../../context/ParkingContext";
import {idCards} from "../../constant/constant";
const hexToDecimal = hex => parseInt(hex, 16);

function BookParking() {
    const {formDataBooking, setFormDataBooking, handleChangeBookParking, createNewBooking, isBookingProcessing } = useContext(ParkingContext);
    const [parkingFor, setParkingForData] = React.useState('');
    let navigate = useNavigate();
    const search = useLocation().search;
    const parkingDataStr=new URLSearchParams(search). get('parkingData');
    const dataObj = JSON.parse(parkingDataStr);
    const acceptedCarTypes = dataObj[12].split(',');
    const [userIdCard, setUserIdCard] = React.useState('');

    useEffect(() => {
        setFormDataBooking({
            ...formDataBooking,
            receiverAccountId: dataObj[0],
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

    const handleChangeIdCardType = (e, name) => {
        setUserIdCard(e.target.value);
        setFormDataBooking({
            ...formDataBooking,
            idType: e.target.value,
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
                            name="parkingId" value={formDataBooking.parkingId}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }} disabled
                            margin="normal" required fullWidth id="parking-id" label="Parking Name" inputProps={ { readOnly: true, } }
                            name="parkingName" value={formDataBooking.parkingName}
                        />

                        <TextField sx={{ m: 1, width: '118ch' }} disabled
                            margin="normal" required fullWidth id="parking-address" label="Parking Address" multiline rows={2} inputProps={ { readOnly: true, } }
                            name="parkingAddress" value={ formDataBooking.parkingAddress }
                        />

                        <TextField sx={{ m: 1, width: '40ch' }}
                            margin="normal" required fullWidth id="parking-hour" label="Booking Hour" type="number" inputProps={{ min: 1, max: 24 }}
                            name="bookingHour" autoFocus value={formDataBooking.bookingHour} onChange={handleChangeBookingHour}
                        />

                        <TextField sx={{ m: 1, width: '40ch' }} disabled
                            margin="normal" required fullWidth id="parking-charge" label="Parking Charge" type="number" inputProps={ { readOnly: true, } }
                            name="parkingCharge" value={formDataBooking.parkingCharge}
                        />

                        <TextField sx={{ m: 1, width: '34ch' }} disabled
                            margin="normal" required fullWidth id="parking-charge-unit" label="Parking Charge Unit"
                            name="parkingChargeUnit" value={formDataBooking.parkingChargeUnit}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-for" select label="Parking For"
                            name="parkingFor" autoFocus  onChange={handleChangeParkingFor} value={parkingFor} 
                        >
                        {acceptedCarTypes.map((option) => (
                            <MenuItem key={option} value={option}> {option} </MenuItem>
                        ))}
                        </TextField>

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="vehicle-registration-no" label="Vehicle Registration Number"
                            name="vehicleRegistrationNo" value={formDataBooking.vehicleRegistrationNo} onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '45ch' }}
                            margin="normal" required fullWidth id="booking-by" label="Booking by user's name"
                            name="bookingBy" value={ formDataBooking.bookingBy } onChange={handleChangeBookParking}
                        />

                        <TextField sx={{ m: 1, width: '25ch' }}
                            margin="normal" required fullWidth id="id-card-type" select label="Select id card type"
                            name="idType" autoFocus  onChange={handleChangeIdCardType} value={userIdCard} 
                        >
                        {idCards.map((option) => (
                            <MenuItem key={option.value} value={option.value}> {option.value} </MenuItem>
                        ))}
                        </TextField>

                        <TextField sx={{ m: 1, width: '44ch' }}
                            margin="normal" required fullWidth id="id-card-number" label="Id Card Number"
                            name="idCardNumber" value={ formDataBooking.idCardNumber } onChange={handleChangeBookParking}
                        />
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