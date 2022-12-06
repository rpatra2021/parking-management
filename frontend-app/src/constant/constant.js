import parkingJsn from "./Parking.json";

export const contractAbi = parkingJsn.abi;
// export const contractAddress = process.env.CONTRACT_ADDRESS;
export const contractAddress = "0x87188404426eafC3B80A29A067C439961C380364";

export const currencies = [
    {
        value: 'ETH',
        label: 'Ξ(ETH)',
    },
    {
        value: 'INR',
        label: '₹(INR)',
    },
    {
        value: 'USD',
        label: '$(USD)',
    },
];