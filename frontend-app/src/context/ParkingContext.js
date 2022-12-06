import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../constant/constant";

const { ethereum } = window;
export const ParkingContext = React.createContext();

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    return transactionContract;
}

export const ParkingProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    // const [accountBalance, setAccountBalance] = useState("");
    const [allParkingList, setAllParkingList] = useState([]);
    const [formData, setFormData] = useState({ 
        parkingName: "", parkingAddress: "", parkingCity: "", parkingState: "", parkingCountry: "", parkingZipCode: "",
        parkingCapacity: 0,  parkingAmount: 0, amountUnit: "", parkingDetails: "", vehicleType: [],
        isError: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e, name) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
            isError: false
        });
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const accounts = await ethereum.request({ method : "eth_accounts"});
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllParkingListData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    }
    
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const accounts = await ethereum.request({ method : "eth_requestAccounts"});
            if (accounts.length) { 
                setCurrentAccount(accounts[0]);
                getAllParkingListData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    }

    const getAllParkingListData = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const parkingContract = getEthereumContract();
            const parkingList = await parkingContract.getAllParkingList();
            setAllParkingList(parkingList);
            console.log("parkingList", parkingList);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    const createNewParking = async() =>{
        try{
            if(!currentAccount) connectWallet();
            setIsLoading(true);
            const { 
                parkingName, parkingAddress, parkingCity, parkingState, parkingCountry, parkingZipCode,
                parkingCapacity,  parkingAmount, amountUnit, parkingDetails, vehicleType 
            } = formData;
            console.log("createNewParking", vehicleType);
            let vehicleTypeStr = vehicleType.toString();
            console.log(vehicleTypeStr);
            const parkingContract = getEthereumContract();

            const pangHashData = await parkingContract.addParkingToBlockchain(
                parkingName, parkingAddress, parkingCity, parkingState, parkingCountry, parkingZipCode, parkingCapacity, parkingAmount, amountUnit,
                parkingDetails, vehicleTypeStr
            );
            await pangHashData.wait();
            setIsLoading(false);
            console.log("pangHashData", pangHashData);
            getAllParkingListData();
        }  catch (error) {
            setIsLoading(true);
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    return(
        <ParkingContext.Provider value={{ currentAccount, connectWallet, allParkingList, formData, setFormData, handleChange, createNewParking, isLoading }}>
            {children}
        </ParkingContext.Provider>
    );
};