import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { Data } from '../Data'
import axios from 'axios'
import UserId from './UserId'
import { format } from 'timeago.js';
const Sports = (props) => {
  let [state4, updateState4] = useState([]);
  useEffect(()=>{
    fetchData3();
  },[])
  let fetchData3 = async () => { 
    let val = await axios.get(`/userss/${props.state1.userId}`)
    updateState4(val.data);
   }

  return (
    <>
          {
                <>
                  <div className='Mainbody2'>
                    <img className='thumbnail_Img' src={props.state1.imageUrl} alt="" />
                    <div className='Mainbody3'>
                      <div>
                        <img className='dp_Img' src={props.state1.imageUrl} alt="" />
                      </div>
                      <div className='Mainbody4'>
                        <NavLink key={props.state1._id} to={`/VideoScreen/${props.state1._id}`} id="Mainbody4_title" style={{"maxWidth": "192px","display": "block"}} className='NavLink Mainbody4_title' >{props.state1.videoTitle}</NavLink>
                        <h6 className='Mainbody4_channel'>{state4.name}</h6>
                        <div className='Mainbody5'>
                          <h6 className='Mainbody5_views'>{props.state1.views} views</h6>
                          <h6 className='Mainbody5_uploadTime'>{format(props.state1.createdAt)} </h6>
                        </div>
                      </div>
                    </div> 
                  </div>

                </>
            }

    </>
  )
}

export default Sports