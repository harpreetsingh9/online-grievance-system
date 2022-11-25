import React, { useState } from 'react';
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';


export default function Otp() {
  const navigate = useNavigate();
  const location = useLocation();
  const {data} = location.state; 

  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  const [otp, setOtp] = useState('');
  const changeHandler= (e) =>{
    setOtp(e.target.value);
  }
  const otpData = {
    data,
    otp
  }
  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/verify", otpData);
      setError({ status: true, msg: res.data[1], type: 'success' })
      if(res.data[0] === true ){
        navigate('/dashboard');
      }
      else{
        alert("Invalid otp");
      }
    } catch(err){
      console.log(err);
    }
  }

  return (
    <>
    <form>
    <div class="container height-100 d-flex justify-content-center align-items-center">
    <div class="position-relative">
        <div class="card p-2 text-center">
            <h6>Please enter the one time password <br /> to verify your account</h6>
            <div> <span>A code has been sent to</span> <small></small> </div>
            <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
               <input  class="m-2 text-center form-control rounded" type="text" value={otp} onChange = {changeHandler} id="first" maxlength="6" />
             </div>
            <div class="mt-4"> <button onClick={submitHandle} type="submit" class="btn btn-danger px-4 validate">Validate</button> </div>
        </div>
    </div>
</div>
</form>
    </>
  )
}