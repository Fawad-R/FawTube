import axios from 'axios';
import React,{useEffect,useState} from 'react'
import Mainbody from '../Components/Mainbody'
import Sidebar from '../Components/Sidebar'
import Sports from './Sports';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
  let Navigate=useNavigate();
  let [state1,updateState1]=useState([]);
  useEffect(()=>{
    let fetchData3 = async () => { 
      try {
        let val = await axios.get(props.value);
        updateState1(val.data);
      if(val.status===200)
      {
        toast.success("Sucessfully,fetching");
      }
      else 
      {
        toast.error("Error!");
      }
    } catch (error) {
      toast.error("Please login first to further proceed!");
      Navigate('/signin')
      }
    }
    fetchData3();
  },[])
  return (
    <>
     {/* <ToastContainer/> */}
     <div className='Home'>
    <div className='Left'>
        <Sidebar />
    </div>
    <div className='Right'>
    <div className='Mainbody'>
        <div className='Mainbody1'>
     {state1.map((ele,ind)=>{ 
       return  <Sports key={ele._id} state1={ele}/> 
      })  
} 
</div>
      </div>
      </div>
      </div>
    </>
  )
}

export default Home