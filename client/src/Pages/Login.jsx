import React,{useState} from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { json, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginFailure, LoginStart, LoginSucess } from '../redux/userSlice';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Login = () => {
  let dispatch=useDispatch();
   let [state1,updateState1]= useState({})
   let Navigate=useNavigate();
  let RegBtn=async(e)=>{
      dispatch(LoginStart())
      e.preventDefault();
      let {email,password}=state1;
      let val=await fetch('/login',{
        method:"POST",
        headers:{
        "content-Type":"application/json"},
        body:JSON.stringify({email,password})
      })
      if(val.status===200)
      {
        toast.success('Sucessfully, Logged in!')
        let value=await axios.get(`/use/use/use/use/${state1.email}`);
        if (value.status===200) {
          localStorage.setItem('FawUser',JSON.stringify(true))
          Navigate('/');
          localStorage.setItem("user",JSON.stringify(value.data._id))
        }
      }
      else
      {
        toast.error('Wrong info! Please try again ')
      }
      
    }
    let inputEvent=(e)=>{
      if(e.target.name==='email')
    {
      let val=e.target.value;
      updateState1({ ...state1, [e.target.name]: val.toLowerCase() })
    }
    else
    {
      updateState1({ ...state1, [e.target.name]: e.target.value })
    }
      // updateState1({...state1,[e.target.name]:e.target.value})
    }
  return (
    <div>
        <div >
        <ToastContainer />
                <form className='uploadForm Login' action="" method="post">
        {/* <NavLink to='/'>Go to Home </NavLink> */}
        <div>
        <ArrowBackIcon style={{"cursor":"pointer"}} onClick={()=>{
          Navigate('/')
        }}> </ArrowBackIcon>Home
        </div>
                    <h1>Login</h1>                    
                    <input type="text" onChange={inputEvent} placeholder='email' name='email' />
                    <input type="password" onChange={inputEvent} placeholder="password" name='password' id="" />
                    <input type="submit" onClick={RegBtn} value="Login" id='UploadBtn' />
                    <h6>Don't have an account? </h6>
                    <NavLink to='/register' >Register here</NavLink>
                </form>

            </div>
    </div>
  )
}

export default Login;