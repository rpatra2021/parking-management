import React, {useContext} from "react";
import { Route, Routes } from "react-router-dom";
import AccountConnect from './components/connectAccount';
import Dashboard from './components/dashboard';
import CreateParking from './components/parking/createParking';
import ParkingList from './components/parking/parkingList';
import BookParking from './components/booking/bookParking';
import ParkingBookingList from './components/booking/parkingBookingList';
import CssBaseline from '@mui/material/CssBaseline';
import Missing from './components/notFound';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ParkingContext} from "./context/ParkingContext";

const theme = createTheme();

const App = () => {
    const {connectWallet, currentAccount} = useContext(ParkingContext);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
                {!currentAccount && (
                    <Route path="/" element={<AccountConnect />} />
                )}

                {currentAccount && (
                    <Route path="/" element={<Dashboard />} />
                )}

                {currentAccount && (
                    <Route path="/parking-list" element={<ParkingList />} />
                )}
                {currentAccount && (
                    <Route path="/create-parking" element={<CreateParking />} />
                )}
                {currentAccount && (
                    <Route path="/book-parking" element={<BookParking />} />
                )}
                {currentAccount && (
                    <Route path="/booking-list" element={<ParkingBookingList />} />
                )}
                <Route path="*" element={<Missing />} />
            </Routes>
        </ThemeProvider>
    )
}

export default App;
