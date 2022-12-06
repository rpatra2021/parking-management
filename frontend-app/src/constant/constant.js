import parkingJsn from "./Parking.json";

export const contractAbi = parkingJsn.abi;
// export const contractAddress = process.env.CONTRACT_ADDRESS;
export const contractAddress = "0xF752a7Cd489Fb6008b9f598Bb7e37FB5dae0fbE6";

export const currencies = [
    // {
    //     value: 'ETH',
    //     label: 'Ξ(ETH)',
    // },
    {
        value: 'INR',
        label: '₹(INR)',
    },
    {
        value: 'USD',
        label: '$(USD)',
    },
];