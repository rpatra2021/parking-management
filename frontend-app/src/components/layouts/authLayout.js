import React, {useContext} from "react";

import { Navigate, useLocation } from "react-router-dom";
import Header from './header';
import {ParkingContext} from "../../context/ParkingContext";

const AuthLayout = ({children, pageName}) => {
    const {currentAccount} = useContext(ParkingContext);
    const location = useLocation();
    if(!currentAccount){
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return <Header page={pageName} children={children}/>;
};

export default AuthLayout;