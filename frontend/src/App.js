import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/Pages/auth/LoginReg";
import ResetPassword from "./components/Pages/auth/ResetPassword";
import SendPasswordResetEmail from "./components/Pages/auth/SendPasswordResetEmail";
import Contact from "./components/Pages/Contact";
import Dashboard from "./components/Pages/Dashboard";
import Home from "./components/Pages/Home";
import Otp from "./components/Pages/Otp";
import Layout from "./components/Pages/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
     
        <Routes>
          <Route path="/" element={<Layout />} />
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path='/otp' element={<Otp />} />
        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;