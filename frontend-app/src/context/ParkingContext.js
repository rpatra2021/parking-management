import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../constant/constant";
import {GetUSDExchangeRate, GetETHExchangeRate} from "../utils/shortenAddress";
const { ethereum } = window;
export const ParkingContext = React.createContext();

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);
    return transactionContract;
}

export const ParkingProvider = ({children}) => {
    const [usdExRate, setUsdExRate] = useState();
    const [ethExRate, setEthExRate] = useState();
    const [currentAccount, setCurrentAccount] = useState("");
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
    };
    const [formDataBooking, setFormDataBooking] = useState({
        parkingId: "", parkingName: "", parkingAddress: "", bookingHour: 1, 
        parkingCharge: 0, parkingChargeUnit: "", parkingFor: "", vehicleRegistrationNo: "",
        bookingBy: "", idType: "", idCardNumber: "", receiverAccountId: "",
        isError: false,
    });
    const handleChangeBookParking = (e, name) => {
        setFormDataBooking({
            ...formDataBooking,
            [e.target.name]: e.target.value,
            isError: false
        });
    };
    const [isBookingProcessing, setIsBookingProcessing] = useState(false);
    const [allBookingList, setAllBookingList] = useState([]);


    useEffect(() => {
        checkIfWalletIsConnected();
        GetUSDExchangeRate().then((res) => {
            setUsdExRate(parseFloat(res).toFixed(2));
            //// console.log("usd", parseFloat(res).toFixed(2));
        });
        GetETHExchangeRate().then((res) => {
            setEthExRate(parseFloat(res).toFixed(8));
            //// console.log("eth", parseFloat(res).toFixed(8));
        });
    }, []);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const accounts = await ethereum.request({ method : "eth_accounts"});
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
                getAllParkingListData();
                getAllBookingListData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };
    
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const accounts = await ethereum.request({ method : "eth_requestAccounts"});
            if (accounts.length) { 
                setCurrentAccount(accounts[0]);
                getAllParkingListData();
                getAllBookingListData();
            }
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    const getAllParkingListData = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const parkingContract = getEthereumContract();
            const parkingList = await parkingContract.getAllParkingList();
            const reversed = [...parkingList].reverse();
            setAllParkingList(reversed);
        } catch (error) {
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    const getAllBookingListData = async () => {
        try {
            if (!ethereum) return alert("Please install metamask to your browser");
            const parkingContract = getEthereumContract();
            const bookingList = await parkingContract.getAllBookingList();
            const reversed = [...bookingList].reverse();
            setAllBookingList(reversed);
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
            let vehicleTypeStr = vehicleType.toString();

            const parkingContract = getEthereumContract();
            const pangHashData = await parkingContract.addParkingToBlockchain(
                parkingName, parkingAddress, parkingCity, parkingState, parkingCountry, parkingZipCode, parkingCapacity, parkingAmount, amountUnit,
                parkingDetails, vehicleTypeStr
            );
            await pangHashData.wait();
            setIsLoading(false);
            getAllParkingListData();
        }  catch (error) {
            setIsLoading(true);
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    const createNewBooking = async() =>{
        try{
            if(!currentAccount) connectWallet();
            setIsBookingProcessing(true);
            const { 
                parkingId, parkingName, parkingAddress, bookingHour, parkingCharge, parkingChargeUnit, parkingFor, vehicleRegistrationNo, 
                bookingBy, idType, idCardNumber, receiverAccountId
            } = formDataBooking;

            let parkingChargeAtEth = parkingCharge;
            if(parkingChargeUnit == "USD"){
                //// console.log("usd to eth exchange rate", ethExRate);
                let parkingChargeUSD = parkingCharge;
                parkingChargeAtEth = parkingChargeUSD * ethExRate;
            }

            const parseAmount = ethers.utils.parseEther(String(parkingChargeAtEth));
            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: receiverAccountId,
                    gas: '0xC350', //50000 GWEI
                    value: parseAmount._hex
                }]
            });

            const parkingContract = getEthereumContract();
            const bookingHashData = await parkingContract.addBookingToBlockchain(
                receiverAccountId, parkingName, parkingAddress, parkingId, bookingHour, parseAmount,
                parkingFor, vehicleRegistrationNo, bookingBy, idType, idCardNumber
            );
            await bookingHashData.wait();
            setIsBookingProcessing(false);
            getAllBookingListData();
        }  catch (error) {
            setIsBookingProcessing(false);
            console.log(error);
            throw new Error("No Ethereum object");
        }
    };

    return(
        <ParkingContext.Provider value={{ 
            currentAccount, connectWallet, allParkingList, formData, setFormData, handleChange, createNewParking, isLoading,
            formDataBooking, setFormDataBooking, handleChangeBookParking, createNewBooking, isBookingProcessing, allBookingList
        }}>
            {children}
        </ParkingContext.Provider>
    );
};