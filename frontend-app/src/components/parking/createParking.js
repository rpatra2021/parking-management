import React, {useContext} from "react";

import { 
    Container, Grid, Paper, Box, Typography, Avatar, TextField, Button, MenuItem, 
    FormGroup, FormControlLabel, Checkbox, FormControl, FormLabel
} from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import {ParkingContext} from "../../context/ParkingContext";
import {currencies} from "../../constant/constant";
import AuthLayout  from '../layouts/authLayout';


const CreateParking = () => {
    const {formData, handleChange, setFormData, createNewParking, isLoading, vehicleTypeArrange, setVehicleTypeArrange} = useContext(ParkingContext);
    const [currency, setCurrency] = React.useState('');
    const handleCurrencyChange = (e, name) => {
        setCurrency(e.target.value);
        handleChange(e, name);
    };

    const handleCheckboxChange = (e) => {
        let vehicleDataArrangeArray = vehicleTypeArrange.split(',');
        const index = vehicleDataArrangeArray.indexOf('');
        if (index > -1) { vehicleDataArrangeArray.splice(index, 1); }
        if(e.target.checked){
            vehicleDataArrangeArray.push(e.target.name);
        } else {
            const index = vehicleDataArrangeArray.indexOf(e.target.name);
            if (index > -1) {
                vehicleDataArrangeArray.splice(index, 1);
            }
        }
        setVehicleTypeArrange(vehicleDataArrangeArray.toString());
    };
    const submitLoginFormHandler = async (e) => {
        e.preventDefault();
        createNewParking();
    }

    return (
        <AuthLayout>
            <Container component="main" maxWidth="lg"> 
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LocalParkingIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create Parking
                    </Typography>
                </Box>

                {/* noValidate */}
                <Box component="form" onSubmit={submitLoginFormHandler}  sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-name" label="Parking Name"
                            name="parkingName" autoFocus value={formData.parkingName} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-city" label="Parking City"
                            name="parkingCity" autoFocus value={formData.parkingCity} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-state" label="Parking State"
                            name="parkingState" autoFocus value={formData.parkingState} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-country" label="Parking Country"
                            name="parkingCountry" autoFocus value={formData.parkingCountry} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '118ch' }}
                            margin="normal" required fullWidth id="parking-address" label="Parking Address" multiline rows={2}
                            name="parkingAddress" autoFocus value={formData.parkingAddress} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-pincode" label="Parking Address PinCode"
                            name="parkingZipCode" autoFocus value={formData.parkingZipCode} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-capacity" label="Parking Capacity" type="number" InputProps={{ inputProps: { min: 0 } }}
                            name="parkingCapacity" autoFocus value={formData.parkingCapacity} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-amount" label="Parking Amount/hour" type="number" InputProps={{ inputProps: { min: 0 } }}
                            name="parkingAmount" autoFocus value={formData.parkingAmount} onChange={handleChange}
                        />

                        <TextField sx={{ m: 1, width: '58ch' }}
                            margin="normal" required fullWidth id="parking-amount-unit" select label="Parking Amount Unit"
                            name="amountUnit" autoFocus  onChange={handleCurrencyChange} value={currency} 
                        >
                        {currencies.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}
                        </TextField>

                        <TextField sx={{ m: 1, width: '118ch' }}
                            margin="normal" required fullWidth id="parking-details" label="Parking Details" multiline rows={2}
                            name="parkingDetails" autoFocus value={formData.parkingDetails} onChange={handleChange}
                        />

                        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormLabel component="legend">Vehicle Types we accept *</FormLabel>
                            <FormGroup >
                                <FormControlLabel name="Motorcycle" control={<Checkbox />} label="Motorcycle" onChange={handleCheckboxChange} />
                                <FormControlLabel name="Car" control={<Checkbox />} label="Car" onChange={handleCheckboxChange} />
                                <FormControlLabel name="Limo" control={<Checkbox />} label="Limo" onChange={handleCheckboxChange} />
                                <FormControlLabel name="SUV" control={<Checkbox />} label="SUV" onChange={handleCheckboxChange} />
                                <FormControlLabel name="Van" control={<Checkbox />} label="Van" onChange={handleCheckboxChange} />
                                <FormControlLabel name="MiniBus" control={<Checkbox />} label="MiniBus"  onChange={handleCheckboxChange} />
                                <FormControlLabel name="Truck" control={<Checkbox />} label="Truck" onChange={handleCheckboxChange} />
                                <FormControlLabel name="Bus" control={<Checkbox />} label="Bus" onChange={handleCheckboxChange} />
                                <FormControlLabel name="Long Truck" control={<Checkbox />} label="Long Truck" onChange={handleCheckboxChange} />
                            </FormGroup>
                        </FormControl>
                    </div>
                    
                    <div>
                        {!isLoading && (
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Create
                            </Button>
                        )}

                        {isLoading && (
                            <Button disabled fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                Saving ...
                            </Button>
                        )}
                    </div>
                </Box>

            </Container>
        </AuthLayout>
    );
}

export default CreateParking;