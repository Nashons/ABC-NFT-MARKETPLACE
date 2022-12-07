/** @format */

import React, { useEffect, useRef, useState } from "react";
import "./createnft.css";
import { useIPFS } from "./IPFSContextProvider";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Marketplace from "../../Marketplace.json";
import { ethers } from "ethers";
import { Spinner } from "../Spinner/Spinner";
import Navbar from "../navbar/Navbar";

const CreateNft = () => {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [btnBusy, setBtnBusy] = useState(false);

  const { IPFSuploading, IPFSerror, IPFSupload, metadataURL } = useIPFS();

  const inputFileRef = useRef(null);

  function inputFileHandler() {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      inputFileRef.current.click();
    }
  }

  async function mintNFThandler() {
    const { name, description, price } = formParams;

    if (!name) {
      return toast.warning("NFT Name should not be empty");
    } else if (!description) {
      return toast.warning("NFT Description should not be empty");
    } else if (!selectedFile) {
      return toast.warning("Select a file to upload");
    } else if (!price) {
      return toast.warning("price should be included");
    }

    try {
      setBtnBusy(true);
      if (formParams.price < 0.01) {
        toast.error("minimum price is 0.01");
      } else {
        await IPFSupload(
          {
            name,
            description,
            price,
          },
          selectedFile
        );
      }
    } catch (error) {
      if (error) {
        toast.error("failed " + error.message);
        setBtnBusy(false);
      }
    }
  }

  const MintNfts = async () => {
    try {
      await mintNFThandler();
      if (metadataURL === null) {
        await mintNFThandler();
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      let listingPrice = await contract.getListPrice();
      listingPrice = listingPrice.toString();
      let transaction = await contract.createToken(
        metadataURL,
        ethers.utils.parseEther(formParams.price.toString()),
        {
          value: listingPrice,
        }
      );
      toast.info(
        "Please wait.. minting may take upto 5 mins for complete transaction"
      );
      await transaction.wait();
      updateFormParams({ name: "", description: "", price: "" });
      toast.success("Mint Successfull !");
      setBtnBusy(false);
    } catch (error) {
      if (error) {
        toast.error("failed " + error.message);
        setBtnBusy(false);
      }
    }
  };

  useEffect(() => {
    if (IPFSuploading) {
      toast.info("Uploading NFT data To IPFS");
    }
  }, [IPFSuploading]);

  useEffect(() => {
    if (IPFSerror) {
      toast.error(IPFSerror.message);
    }
  }, [IPFSerror]);

  return (
    <section id="createnft">
      <Navbar />
      <div className="createnftpage">
        <div className="createnftpage_content">
          <div className="name">NFT Name </div>
          <input
            type="text"
            placeholder="your NFT name"
            className="inputname"
            value={formParams.name}
            id={formParams.name}
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
          ></input>

          <div className="description">NFT Description</div>
          <textarea
            minLength="10"
            required
            cols="10"
            rows="5"
            type="text"
            placeholder="your NFT details"
            className="textarea"
            id={formParams.description}
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            }
          ></textarea>

          <div className="price">price (In ETH)</div>
          <input
            type="number"
            placeholder="min 0.01 ETH"
            className="inputprice"
            pattern="^\d*(\.\d{0,4})?$"
            step=".01"
            id={formParams.price}
            value={formParams.price}
            onChange={(e) =>
              updateFormParams({ ...formParams, price: e.target.value })
            }
          ></input>

          <div className="selectfile">
            upload NFT <br />
            <input
              ref={inputFileRef}
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              onClick={inputFileHandler}
            ></input>
          </div>
          <button className="uploadbtn" onClick={MintNfts}>
            {btnBusy ? <Spinner /> : "ListNFT"}
          </button>
        </div>
      </div>
      <ToastContainer
        theme="colored"
        style={{ overflowWrap: "anywhere" }}
        position="bottom-right"
      />
    </section>
  );
};

export default CreateNft;
