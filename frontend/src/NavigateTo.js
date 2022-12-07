import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Buy from './components/buynfts/Buy'
import Createnft from './components/createnfts/createnft'
import Home from './components/homepage/Home'
import Navbar from './components/navbar/Navbar'

const NavigateTo = () => {
  return (
    <div>
      <Routes>
        <Route path="nftpage:tokenId" element={<Buy />} />
        <Route path="createnft" element={<Createnft />} />
      </Routes>
      <Home />
      <Navbar />
    </div>
  );
}

export default NavigateTo