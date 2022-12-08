import parkingJsn from "./Parking.json";

export const contractAbi = parkingJsn.abi;
// export const contractAddress = process.env.CONTRACT_ADDRESS;
export const contractAddress = "0xa4D71e00aA801E18542Ad27eb330A0730D9185a8";

export const currencies = [
    {
        value: 'ETH',
        label: 'Ξ(ETH)',
    },
    // {
    //     value: 'INR',
    //     label: '₹(INR)',
    // },
    {
        value: 'USD',
        label: '$(USD)',
    },
];

export const idCards = [
    {
        value: 'Adhar Card',
    },
    {
        value: 'Driving License',
    },
    {
        value: 'Passport',
    },
    {
        value: 'Voter card',
    },
];