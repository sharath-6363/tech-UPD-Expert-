import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminMain from "./AdminComponent/AdminMain.js";
import AdsTechEx from "./AdminComponent/AddTechEx.js";
import ALogin from "./AdminComponent/ALogin.js";
import UpdateCategory from "./AdminComponent/UpdateCategory.js";
import ViewUpdates from "./AdminComponent/ViewUpdates.js";
import TechLogin from "./TechnologyEx/TechLogin.js";
import TechMain from "./TechnologyEx/TechMain.js";
import Homepage from "./VisitorComponent/HomePage.js";
// import TechReplay from "./TechnologyEx/TechReplay.js";
import TechUPDimfrm from "./TechnologyEx/TechUPDImofrm.js";
import UPDprofile from "./TechnologyEx/UPDprofil.js";
import Vmain from "./VisitorComponent/Vmain.js";
// import Replis from "./VisitorComponent/Replis.js";
// import SendQuery from "./VisitorComponent/SendQuery.js";
import ViewTech from "./VisitorComponent/ViewTechImfo.js";
import VLogin from "./VisitorComponent/VLogin.js";
import Vprofile from "./VisitorComponent/Vprofile.js";
import VRegister from "./VisitorComponent/VRegister.js";
import ViewTechImfo from "./VisitorComponent/ViewTechImfo.js";
import Email from "./AdminComponent/Email.js"
import { usercontext } from "./Usercontext.js";
import { Visitorcontext } from "./Visitorcontext.js";
export default function App() {
  const [userdata, setuserdata] = useState(() => {
    try {
      const item = window.localStorage.getItem("userdata");
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.log(error);
      return {};
    }
  });
  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userdata));
  }, [userdata]);

  const [viconst, setviconst] = useState(()=>{
    try{
      const item=window.localStorage.getItem("viconst");
      return item ? JSON.parse(item):{};

    }catch(error){
      console.log(error);
      return{}
    }
  });
 useEffect(()=>{
  localStorage.setItem("viconst", JSON.stringify(viconst));
 },[viconst]);
  return (
    <div>
      <Visitorcontext.Provider value={{viconst,setviconst}}>
      <usercontext.Provider value={{ userdata, setuserdata }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/aLogin" element={<ALogin />} />
            <Route path="/adminMain" element={<AdminMain />}>
              <Route index element={<AdsTechEx />} />
              <Route path="viewUpdates" element={<ViewUpdates />} />
              <Route path="updateCategory" element={<UpdateCategory />} />
              <Route path="email"element={<Email/>}/>
            </Route>
            <Route path="/techLogin" element={<TechLogin />} />
            <Route path="/techMain" element={<TechMain />}>
              {/* <Route path="techReplay" element={<TechReplay />} /> */}
              <Route index element={<TechUPDimfrm />} />
              <Route path="uPDprofil" element={<UPDprofile />} />
            </Route>

            <Route path="/vLogin" element={<VLogin />} />
            <Route path="/vRegister" element={<VRegister />} />
            <Route path="/vmain" element={<Vmain />}>
              {/* <Route path="replis" element={<Replis />} /> */}
              {/* <Route path="sendQuery" element={<SendQuery />} /> */}
              <Route index element={<ViewTech />} />
              <Route path="vprofile" element={<Vprofile />} />
              <Route path="viewTechImfo" element={<ViewTechImfo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </usercontext.Provider>
      </Visitorcontext.Provider>
    </div>
  );
}
