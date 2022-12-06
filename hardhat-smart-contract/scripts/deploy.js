const main = async () => {
    // this is a function factory which generate instances of that specific contracts
    const Parking = await hre.ethers.getContractFactory("Parking");
    const parkings = await Parking.deploy();
    await parkings.deployed();
    console.log("Parking deployed to address: ", parkings.address);
}
  
const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
  
runMain();