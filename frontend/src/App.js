/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Buy from "./components/buynfts/Buy";
import CreateNft from "./components/createnfts/createnft";
import Landing from "./components/landingpage/Landing";
import Lost from "./components/Lost/Lost";
import NavigateTo from "./NavigateTo";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/Home/*" element={<NavigateTo />} />
        <Route path="/nftpage/:tokenId" element={<Buy />} />
        <Route path="createnft" element={<CreateNft />} />
        <Route path="*" element={<Lost />} />
      </Routes>
    </div>
  );
};

export default App;
