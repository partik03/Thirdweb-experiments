import { ConnectWallet } from "@thirdweb-dev/react";
// import "./styles/Home.css";
import {Route,Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";
// import {Homepage} from "./pages/Homepage";
export default function Home() {
  return (
        // <div className="connect">
        //   <ConnectWallet />
        // </div>
      <div className="relative sm:-8 bg-[#13131a] min-h-screen w-screen  flex flex-row">
        <div className="sm:flex hidden relative mr-10">
          <Sidebar/>
        </div>
        <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
          <Navbar/>
          <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/create-campaign" element={<CreateCampaign/>}/>
            <Route path="/campaign-details/:id" element={<CampaignDetails/>}/>
          </Routes>
        </div>
      </div>
        
  );
}
