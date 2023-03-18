import axios from 'axios'
import React, { useEffect, useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { Data } from '../Data';
// import Video1 from '../aa.mp4'
import { db } from './Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { format } from 'timeago.js';
import UserId from './UserId';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoScreen = () => {
  let Navigate=useNavigate();
  let subscribed = 0;
  let totalLikes = 0;
  let totalDisLikes = 0;
  let [state1, updateState1] = useState([]);
  let [state2, updateState2] = useState([]);
  let [state3, updateState3] = useState([]);
  let [state4, updateState4] = useState([]);
  let [state5, updateState5] = useState([]);
  let [state6, updateState6] = useState([]);
  let [state7, updateState7] = useState({videoId:'',desc:''});
  let [state8, updateState8] = useState();
  let [state9, updateState9] = useState(false);
  let [state10, updateState10] = useState([]);
  let useparamsId = useParams();
  let GoBack=()=>{
    Navigate('/')
  }
  useEffect(() => {
    let fetchRecommendedVideos = async () => {
      let val = await axios.get('/random');
      updateState3(val.data)
    }
    fetchRecommendedVideos();
  }, [])
  useEffect(() => {
    let fetchData = async () => {
      let val = await axios.get(`/videos/${useparamsId.title}`)
      console.log('val video',val);
      updateState1(val.data);
      updateState6(val.data.likes);
    }
    fetchData();

    let fetchData2 = async () => {
      let val = await axios.get(`/comment/${useparamsId.title}`)
      updateState2(val.data);
    }
    fetchData2();

    let fetchData3 = async () => {
      let val = await axios.get(`/users/${useparamsId.title}`)
      // console.log('val.data',val);
      updateState4(val.data);
      updateState5(val.data.subscribedUsers);
    }
    fetchData3();
    let fetchData4 = async () => {
      let val = await axios.patch(`/views/${useparamsId.title}`)
      try {
        
        if(!val.status===200)
        {
          alert('Please login for better experience!')
        }
      } catch (error) {
        if(!val.status===200)
        {
          alert('Please login for better experience!')
        }
        
      }
    }
    fetchData4();
    let fetchData5 = async () => {
      let val = await axios.get(`/comment/${useparamsId.title}`)
      updateState8(val.data);
      updateState9(true);
    }
    fetchData5();
  }, [])

  let useParamsid = useParams();

  let Like = async () => {
    let val = await fetch(`/video/${useparamsId.title}/likes`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    let val2 = await val;
    if(val2.status===200)
    {
      toast.success("Liked");
    }
    else if(val2.status===402)
    {
      toast.warning("You have already Liked this video");
    }
    else if(val2.status===403)
    {
      toast.warning("You cannot Like yourself");
    }
    else 
    {
      toast.error("Error! cannot like at the moment");
    }
  }
  let DisLike = async () => {
    let val = await fetch(`/video/${useparamsId.title}/likes/dislikes`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    let val2 = await val;
    if(val2.status===200)
    {
      toast("Disliked");
    }
    else if(val2.status===402)
    {
      toast.warning("You have already Disliked this video");
    }
    else if(val2.status===403)
    {
      toast.warning("You cannot Disliked yourself");
    }
    else
    {
      toast.error("Error! cannot dislike at the moment");
    }
  }
  let Subscribe = async () => {
    let val = await fetch(`/user/${useparamsId.title}/follow`, {
  
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
    let val2 = await val;
    if(val2.status===200)
    {
      toast.success("Subscribed");
    }
    else if(val2.status===402)
    {
      toast.warning("You are already a subscriber");
    }
    else if(val2.status===403)
    {
      toast.warning("You cannot subscribe yourself");
    }
    else
    {
      toast.error("Error! cannot subscribe");
    }
  }

  let inputComment=(e)=>{
    updateState7({...state7,[e.target.name]:e.target.value})
    
  }
  let submitComment=async(e)=>{
    
    state7.videoId=useparamsId.title;
     e.preventDefault();
    
    let val=await fetch('/comment',{
      method:"POST",
      headers:{
        "content-Type":"application/json"
      },
      body:JSON.stringify(state7)
    })
    if(val.status===200)
    {
      toast.success("Comment Submitted");
    }
    else
    {
      toast.error("Error! while submitting your comment.");
    }
  }

  let fetchUser=async()=>{
    let id=JSON.parse(localStorage.getItem("user"));
    try {
      // console.log(id);
      let val=await axios.get(`/user/${id}`);
      // console.log(val);
      if (val.status===200) {
        // updateState1(val.data);
        updateState10(val.data);
      }
      else
      {
        alert("PLease login first to further proceed")
        Navigate('/signin');
      }
    } catch (error) { 
      alert(error)
      Navigate('/signin');
    }
}
useEffect(()=>{
  fetchUser();
},[])
  return (
    <>
      <div className='Mainbody'>
      <KeyboardBackspaceIcon style={{"cursor":"pointer"}} onClick={GoBack} />Home 
      {/* <NavLink className="NavLink" to='/'>Go to home </NavLink>  */}
        <div className='Mainbody1'>
          {

            <>
              <div className='Mainbody2 VideoScreen_Mainbody2'>
                <iframe src={state1.videoUrl} style={{ "border":"none","outline":"none", "height": "95vh", "width": "99%" }} controls title="Iframe Example"></iframe>
                <div className='VideoScreen1'>
                  <div style={{"padding": "5% 1%"}}>
        
                    <p style={{ "marginBottom": "0%" }}  className=' Mainbody4_title'>{state1.videoTitle}</p>
                    <div className='VideoScreen2'>
                      <div className='Mainbody5'>
                        <h6 className='Mainbody5_views'>{state1.views} views -</h6>
                        <h6 className='Mainbody5_uploadTime'>{format(state1.createdAt)} </h6>
                      </div>
                      <div className='VideoScreen3'>
                        <ThumbUpOffAltIcon className='NavLink' id="Like" onClick={Like}/>
                        <ToastContainer />
                        <ThumbDownOffAltIcon className='NavLink' id="DisLike" onClick={DisLike}/>
           
                      </div>
                    </div>
                  </div>
                </div>

                <div className='Mainbody3'>
                  <div className='VideoScreenBody'>
                    <div className='VideoScreenBody_Left'>
                      <div className='Mainbody4'>
                        <div>
                        </div>
                        <div className='VideoScreen4'>
                          <div>
                            <img src={state4.img} className='dp_Img' alt="" />
                            <br />
                            <NavLink to=""  style={{"padding": "5% 1%"}} className='NavLink Mainbody4_title'>{state4.name}</NavLink>
                            {/* {console.log('state4',state4)} */}
                            <h6 className='Mainbody4_channel'>{state4.subscribers} subscribers</h6>
                          </div>
                          <div>
                            <button onClick={Subscribe} id="Subscribe">Subscribe</button>
                          </div>
                        </div>
                        
                        <p className='Mainbody4_channel'>{state1.videoDescription}</p>
                        <div className=''>
                          <div>
                        
                            {/* <img className='dp_Img' src={state1.imageUrl} alt="" /> */}

                            <form action="" method="post" style={{"display": "flex","justifyContent": "spaceBetween"}}>
                            <input style={{ "width": "50%", "border": "none", "padding": "10px","paddingLeft":"0px",  "borderBottom": "1px solid", "marginTop": "1%" }} onChange={inputComment} type="text" placeholder='Add a comment' name="desc" id="" />
                            <input type="submit" onClick={submitComment} id="Comment" value="Submit" />
                            </form>

                              
                          <div className="DisplayComments">
                             {
                             state9? state8.length===0?' ':state8.map((ele,ind)=>{
                                return(
                                  <>
                          <div key={ele._id} style={{ "padding":"2% 1%","display":"flex"}} className="DisplayComments">
                                  <div>
                                  <UserId key={ele.userId}  value={ele.userId} /> 
                                  <p> {ele.desc}</p>
                                  </div>
                                  <h6 className='Mainbody5_uploadTime'>{format(ele.createdAt)} </h6>
                            </div>
                                  </>
                              )}
                              )

                              :''
                            } 

                          </div>

                          </div>
                        </div>
                      </div>
                      {
                        state2.map((ele, ind) => {
                          return (
                            <>
                              <div key={ele._id} className='Mainbody4'>
                            {/* FAWADAW
                               <img src={ele.img} alt="" />  */}
                              </div>
                            </>
                          )

                        })

                      }

                    </div>

                    <div className='VideoScreenBody_Right'>
                      {

                        state3.map((ele, ind) => {
                          return (
                            <>
                              <div key={ele._id} className='Mainbody4' style={{"marginBottom":"3%"}}>
                                <img className='thumbnail_Img' src={ele.imageUrl} alt="" />
                                {/* <img className='dp' src={ele.imageUrl} alt="" /> */}

                                <a href={`/VideoScreen/${ele._id}`} style={{"maxWidth": "294px","display": "block"}} className='NavLink Mainbody4_title'>{ele.videoTitle}</a>

                                <div className='Mainbody5'>
                                  <h6 className='Mainbody5_views'>{ele.views} views -</h6>
                                  <h6 className='Mainbody5_uploadTime'>{format(ele.createdAt)} </h6>
                                </div>
                              </div>
                            </>
                          )

                        })
                      }
                    </div>
                  </div>
                </div>
              </div>
            </>
           
          }
        </div>
      </div>
    </>
  )
}

export default VideoScreen