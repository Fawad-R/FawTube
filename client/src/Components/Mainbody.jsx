import React, { useEffect, useContext  } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Data } from '../Data'
import { collection, getDocs } from "firebase/firestore";
import {db } from '../Pages/Firebase.jsx'
import { context1 } from '../App'
import axios from 'axios'
import { useState } from 'react';
import { format } from 'timeago.js';
import Navbar from './Navbar';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Mainbody = (props) => {
  let Navigate=useNavigate()
  // console.log(props);
  // let context= useContext(context1);
  // <Navbar />
  let {state10,dispatch}=useContext(context1)
  
  let [state1,updateState1]=useState([]);
  let [state4,updateState4]=useState([]);
  let [state5,updateState5]=useState([]);
  
  useEffect(()=>{
    let fetchSearch=(async(req,res)=>{
      let val=await axios.get(`/search?q=${props.state1}`);
      // console.log('state5', val.data); 
      updateState5(val.data);
    })   
    fetchSearch();
  },[])
  useEffect(()=>{
    let fetchFunc=(async(req,res)=>{
try {
  let val=await axios.get('/random');
  // console.log(val.data); 
  if(val.status===200)
  {
    updateState1(val.data);
  }
  if(val.length===0)
  {
    toast.error("Please login first to further proceed!");
    Navigate('/signin')
  }
} catch (error) {
  toast.error("Please login first to further proceed!");
  Navigate('/signin')
}

    })
    fetchFunc();
    let fetchData3 = async () => { 
      state1.map((ele,ind)=>{
        // let func=async()=>{
        // return
        
          let val =  axios.get(`/users/${ele._id}`)
          // console.log('2Comment', val);
          updateState4(val.data);
        // }
        // func();
      })
      // updateState5(val.data.subscribedUsers);

    }
    fetchData3();

  },[])
  // useEffect(()=>{
  // },[])
  return (
    <>
      <div className='Mainbody'>
        <div className='Mainbody1'>
          {
            // Data.map((ele, ind) => {
              // state5 !==[]?
              state5.length !==0?
              state5.map((ele, ind) => {
                return (
                  <>
                  <div key={ele._id}>
                    <div key={ele._id}  className='Mainbody2'>
                      {/* {console.log('ele',ele)} */}
                      {/* <img className='thumbnail_Img' src={ele.thumbnail} alt="" /> */}
                      <img className='thumbnail_Img' src={ele.imageurl} alt="" />
                      {/* {console.log(ele.img)} */}
                      <div className='Mainbody3'>
                        <div>
                      <img className='dp_Img' src={ele.imageurl} alt="" />
                          {/* <img className='dp_Img' src={ele.img} alt="" /> */}
                        </div>
                        <div className='Mainbody4'>
                          {/* <NavLink to={`/VideoScreen/${ele.id}`} className='NavLink Mainbody4_title'>{ele.title}</NavLink> */}
                          <NavLink key={ele._id} to={`/VideoScreen/${ele._id}`} className='NavLink Mainbody4_title'>{ele.videoTitle}</NavLink>
                          {/* <h6 className='Mainbody4_channel'>{state4.name}</h6> */}
                          {/* <h6 className='Mainbody4_channel'>{val[ind].channel}</h6> */}
                          
                          <div className='Mainbody5'>
                            <h6 className='Mainbody5_views'>{ele.views} views </h6>
                            {/* <h6 className='Mainbody5_views'>{ele.videoTitle} </h6> */}
                            <h6 className='Mainbody5_uploadTime'>{format(ele.createdAt)} </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
  
                  </>
                )
              })
            // }
              :
              state1.map((ele, ind) => {
                // let val=axios.get(`/videos/${state1[ind].userId}`)
              return (
                <>
                <div key={ele._id}>
                  <div   className='Mainbody2'>
                    {/* {console.log('ele2',ele)} */}
                    {/* <img className='thumbnail_Img' src={ele.thumbnail} alt="" /> */}
                    <img className='thumbnail_Img' src={ele.imageUrl} alt="" />
                    {/* {console.log(ele.img)} */}
                    <div className='Mainbody3'>
                      <div>
                    <img className='dp_Img' src={ele.imageUrl} alt="" />
                        {/* <img className='dp_Img' src={ele.img} alt="" /> */}
                      </div>
                      <div className='Mainbody4'>
                        {/* <NavLink to={`/VideoScreen/${ele.id}`} className='NavLink Mainbody4_title'>{ele.title}</NavLink> */}
                        <NavLink key={ele._id} to={`/VideoScreen/${ele._id}`} className='NavLink Mainbody4_title'>{ele.videoTitle}</NavLink>
                        {/* <h6 className='Mainbody4_channel'>{state4.name}</h6> */}
                        {/* <h6 className='Mainbody4_channel'>{val[ind].channel}</h6> */}
                        
                        <div className='Mainbody5'>
                          <h6 className='Mainbody5_views'>{ele.views} views </h6>
                          {/* <h6 className='Mainbody5_views'>{ele.videoTitle} </h6> */}
                          <h6 className='Mainbody5_uploadTime'>{format(ele.createdAt)}  </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default Mainbody