import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { context1 } from '../App'
import img from './1.jpg'
import Mainbody from './Mainbody'
import Sidebar from './Sidebar'
const Navbar = () => {
  let {state10,dispatch}=useContext(context1)
  let {user}=useSelector(state=>state.user)
  let [state1,updateState1]=useState();
  let searching=async(e)=>{
    updateState1(e.target.value)
  }
  let searched=async(e)=>{
    e.preventDefault();
    // dispatch({type:state1,payload:true});
  }
    return (
        <>

<nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Faw Tube</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          {/* <a className="nav-link active" aria-current="page" href="#">Home</a> */}
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
            
          <NavLink className="nav-link" to="/upload">Upload</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/setting"><img src={img} className="dp_Img nav-link" /></NavLink>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" onChange={searching} placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" onClick={searched} type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div className='Home'>
    <div className='Left'>
        <Sidebar />
    </div>
    <div className='Right'>
<Mainbody key={'state1'} state1={state1}/>
    </div>

    </div>
        </>

    )
}

export default Navbar