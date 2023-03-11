import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import HistoryIcon from '@mui/icons-material/History';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import GamepadIcon from '@mui/icons-material/Gamepad';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FeedIcon from '@mui/icons-material/Feed';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import ReportIcon from '@mui/icons-material/Report';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import axios from 'axios';
import Movie from '../Pages/Movie';
import { context1 } from '../App';
import Sports from '../Pages/Sports';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {

  let Navigate=useNavigate()
  let [state1,updateState1]=useState([]);
  let {state,dispatch}= useContext(context1);
  let tag='sports';
  let getUser=JSON.parse(localStorage.getItem('FawUser'))
  // console.log('getUser',getUser);
// useEffect(()=>{
// let func=async()=>{
//   let val=await axios.get('/tags?tags=movie,movies');
//   console.log(val);
// }
// func()
// },[])
// let FetchTags=async(e)=>{
//   let val=await axios.get(`/tags?tags=${e}`);
//   console.log(val);
// }
let SignOut = async (e) => {
  try {
    e.preventDefault();
    let val = await axios.get(`/signout`);
    if (val.status === 200) {
      localStorage.setItem("user", JSON.stringify(null))
      localStorage.setItem("FawUser", JSON.stringify(null))
      toast.success("Sucessfully,logged out!!!");
      alert("Sucessfully,logged out!!!")
      Navigate('/signin')
    }
    else {
      toast.error("Error!!!");
    }
  } catch (error) {
    toast.error("Error!!!");
  }
}
  return (
    <>
    <div className='Sidebar'>
        <div className='Sidebar1'>
        <a className="NavLink" href='/'><HomeIcon style={{"marginRight":"7%"}} />   Home </a>
        <a className="NavLink" href='/subscription'><SubscriptionsIcon style={{"marginRight":"7%"}} />   Subsc </a>
        </div>
        <div className='Sidebar2'>
        {/* <NavLink className="NavLink" to='/library'><LibraryAddIcon style={{"marginRight":"7%"}} /> Library </NavLink>
        <NavLink className="NavLink" to='/history'><HistoryIcon style={{"marginRight":"7%"}} /> History </NavLink> */}
        </div>
        <div className='Sidebar5'>
       { getUser===true? 
       <NavLink style={{"marginTop":"0%"}} to="" id="signin" onClick={SignOut} className="NavLink" >Sign out </NavLink> 
        :
        <>
        <p style={{"marginBottom":"0%"}}>To enjoy login here</p>
        <NavLink style={{"marginTop":"0%"}} id="signin" className="NavLink" to='/signin'>Sign in </NavLink> 
        </>
}
        </div> 
        <div className='Sidebar3'> 
        {/* <Movie tags={'movies'}/>  */}
        <a className="NavLink" href='/movie' ><LocalMoviesIcon style={{"marginRight":"7%"}} />  Movies </a>
        {/* <NavLink className="NavLink" onClick={()=>{<Movie tags={'movies'}/>}}><LocalMoviesIcon  style={{"marginRight":"7%"}} />  Movies </p> */}
        {/* <NavLink className="NavLink" to=''  onClick={()=>{dispatch({type:"true"}); Navigate('/tagss') } }><LocalMoviesIcon value={'movies,Movie'}  style={{"marginRight":"7%"}} /> Movies </NavLink> */}
        {/* <NavLink className="NavLink" to='/tags'><LocalMoviesIcon style={{"marginRight":"7%"}} /> Movies </NavLink> */}
        {/* ?tags=cricket,Sports,football */}
        {/* <Sports defaultValue={tag}/> */}
        <a className="NavLink" href='/sports' > <SportsVolleyballIcon style={{"marginRight":"7%"}} /> Sports </a>
        <a className="NavLink" href='/gameing'><GamepadIcon style={{"marginRight":"7%"}} /> Gaming </a>
        <a className="NavLink" href='/Music'><MusicNoteIcon style={{"marginRight":"7%"}} /> Music </a>
        <a className="NavLink" href='/news'><FeedIcon style={{"marginRight":"7%"}} /> News </a>
        <a className="NavLink" href='/explore'><ExploreIcon style={{"marginRight":"7%"}} /> Memes </a>
        {/* <NavLink className="NavLink" to=''><LiveTvIcon style={{"marginRight":"7%"}} /> Live </NavLink> */}
        </div>
        <div className='Sidebar4'>
        <NavLink className="NavLink" to='/setting'><SettingsSuggestIcon style={{"marginRight":"7%"}} /> Settings </NavLink>
        {/* <NavLink className="NavLink" to='/report'><ReportIcon style={{"marginRight":"7%"}} /> Report </NavLink> */}
        {/* <NavLink className="NavLink" to='/help'><LiveHelpIcon style={{"marginRight":"7%"}} /> Help </NavLink>
        <NavLink className="NavLink" to=''><DarkModeIcon style={{"marginRight":"7%"}}  /> Dark mode </NavLink> */}
        </div> 
    </div>
    </>
  )
}

export default Sidebar