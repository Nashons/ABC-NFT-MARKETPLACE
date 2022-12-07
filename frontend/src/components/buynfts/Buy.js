import React, { useState } from 'react';
import MarketplaceJSON from "../../Marketplace.json";
import { useParams } from 'react-router-dom';
import './buy.css'
import Navbar from '../navbar/Navbar';
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from '../Spinner/Spinner';
import Web3Modal from "web3modal";
import { providerOptions } from "../navbar/providerOptions";

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions, // required
});


const Buy = () => {
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [currAddress, updateCurrAddress] = useState("0x");
    const [btnBusy, setBtnBusy] = useState(false);



async function getNFTData(tokenId) {
   
    const ethers = require("ethers");
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    const tokenURI = await contract.tokenURI(tokenId);
    const listedToken = await contract.getListedTokenForId(tokenId);
    const imageUri = tokenURI.slice(7);
    const data = await fetch(`https://nftstorage.link/ipfs/${imageUri}`)
    const json = await data.json()
    const str = json.image;
    const mylink = str.slice(7);
    const imageX = ((`https://nftstorage.link/ipfs/${mylink}`).replace("#", "%23"));
    console.log(listedToken);

    let item = {
        price: json.price,
        tokenId: tokenId,
        seller: listedToken.seller,
        owner: listedToken.owner,
        image: imageX,
        name: json.name,
        description: json.description,
    }
    console.log(item);
    updateData(item);
    updateDataFetched(true);
    console.log("address", addr)
    updateCurrAddress(addr);
}

async function buyNFT(tokenId) {
    try {
        setBtnBusy(true)
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = await web3Modal.connect();
        const library = new ethers.providers.Web3Provider(provider);
        const signer = library.getSigner();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer);
        const salePrice = ethers.utils.parseUnits(data.price, 'ether')
        //run the executeSale function
        let transaction = await contract.executeSale(tokenId, { value: salePrice });
        toast.info("Buying this NFT... Please Wait")
        await transaction.wait();

        toast.success('You successfully bought the NFT!');
        setBtnBusy(false)
        window.location.reload();
              
    }
    catch(e) {
        if (e) {
            toast.error("Failed "+e)
            setBtnBusy(false)             
        }
        console.log("here is the error ", e)     
        
    }
}
    const params = useParams();
    const tokenId = params.tokenId;
    if(!dataFetched)
        getNFTData(tokenId);
  return (
      <section id='nftpage'>
          <Navbar/>
          <div className='buypage'>
              <div> 
                  <img src={data.image}  alt="" className='nftarea' />
              </div>
              <div className='descr'>                 
                  <div className='nftname'>{ data.name}</div>
                  <div className='nftDescription'>{ data.description}</div>
                 <div className='Royalties'>Royalties: 5% send back to the creator</div>
                 <div className='nftprice'>Price: {data.price} ETH</div>
              </div>
            {/*<button className='buyBtn' onClick={buyNFT}>Buy</button>*/}
               { currAddress === data.owner || currAddress === data.seller ?
                <div className="owner">You are the owner of this NFT</div>:<button onClick={() => buyNFT(tokenId)}className="buyBtn">{btnBusy ? <Spinner /> : "Buy this NFT"}</button>
            }
          </div>
           <ToastContainer
        theme="colored"
        style={{ overflowWrap: "anywhere" }}
        position="bottom-right"
      />  
      </section>
  )
}

export default Buy