import axios from 'axios';
import React, { useEffect, useState } from 'react'


const UserId = (props) => {
    let [state4,updateState4]=useState({name:''});
    let [state3,updateState3]=useState();
    let fetchData3 = async () => { 
        let val =await axios.get(`/userss/${props.value}`)
        updateState4(val.data);
      }
      useEffect(()=>{
        fetchData3();
      },[])
  return (
    <>
    <h6>{state4.name} ({state4.email})</h6> 
    </>
  )
}

export default UserId;