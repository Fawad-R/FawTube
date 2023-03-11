import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { Data } from '../Data'
import axios from 'axios'
import UserId from './UserId'
import { format } from 'timeago.js'
const Sports = (props) => {

  let [state1,updateState1]=useState([]);
  let [state2, updateState2] = useState([]);
  useEffect(()=>{
    let fetchData3 = async () => { 
      let val = await axios.get('/subs')
      updateState1(val.data);
    }
    fetchData3();
  },[])
  return (
    <>
     <div className='Home'>
    <div className='Left'>
        <Sidebar />
    </div>
    <div className='Right'>
      <div className='Mainbody'>
        <div className='Mainbody1'>
          {
            state1.map((ele, ind) => {
              return (
                <>
                  <div  key={ele._id} className='Mainbody2'>
                    <img className='thumbnail_Img' src={ele.imageUrl} alt="" />
                    <div className='Mainbody3'>
                      <div>
                        <img className='dp_Img' src={ele.imageUrl} alt="" />
                      </div>
                      <div className='Mainbody4'>
                        <NavLink key={ele._id} to={`/VideoScreen/${ele._id}`} className='NavLink Mainbody4_title'>{ele.videoTitle}</NavLink>
                        <h6 className='Mainbody4_channel'><UserId value={ele.userId} /></h6>
                        <div className='Mainbody5'>
                          <h6 className='Mainbody5_views'>{ele.views} view -</h6>
                          <h6 className='Mainbody5_uploadTime'> {format(ele.uploadTime)} </h6>
                          
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
      </div>

</div>

    </>
  )
}

export default Sports