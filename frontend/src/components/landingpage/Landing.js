import React from 'react';
import "./landing.css";

const Landing = () => {
  return (
      <section id='landing'>
          <div className='landing_page'>
              <div className='ellipse1'/>
              <div className='ellipse2'/>
              <div className='ellipse3'/>
              <div className='ellipse4'/>
              <div className='ellipse5' />
              <div className='Discover'>Discover & Buy NFT <br/>Artworks</div>
              <div className='buysmall'>Buy, create and Sell NFTs on the<br /> most well known coinbase NFT<br /> market place</div>
              <a href='Home'><button className='exploreBtn'>Explore</button></a>
              <div className='howDiv'>                  
                  <div className='howBigFont'>To Explore, Buy, Creating... How this works!</div>
                  <div className='howsmallFont'>Make sure your have a CoinBase wallet extension on your Browser<br/>Click on explore button and connect to your wallet on top left corner button <br/>On The Collections provided, your can click on exiting nFTs to Buy and Own them<br/>What about Listing your own artwork? <br/>click on Create Your NFT button to upload Your NFTs to the Market Place for selling</div>
              </div>


          </div>
      </section>
  )
}

export default Landing