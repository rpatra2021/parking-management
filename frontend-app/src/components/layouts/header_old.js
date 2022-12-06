import React, {useContext} from "react";
import './header.css';
import {ParkingContext} from "../../context/ParkingContext";
import {shortenAddress} from "../../utils/shortenAddress";

const Header = () => {
    const {connectWallet, currentAccount} = useContext(ParkingContext);
    return (
        <header>
            <span>Application header</span>
            <span style={{ float: 'right' }}> 
                {!currentAccount && (
                    <button className="connect-wallet-btn" onClick={ connectWallet }>Connect Wallet</button>
                )}
                {currentAccount && (
                    <span className="wallet-connected"> 
                        Connected ({ shortenAddress(currentAccount) })
                    </span>
                )}
            </span>
        </header>
    )
}

export default Header