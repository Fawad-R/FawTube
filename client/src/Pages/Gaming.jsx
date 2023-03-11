import React,{useEffect,useState} from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { Data } from '../Data'
import axios from 'axios'
const Sports = (props) => {
  // console.log(props);
  // console.log(props.defaultValue);
  let [state1,updateState1]=useState([]);
  let [state2, updateState2] = useState([]);
  useEffect(()=>{
    let fetchData3 = async () => { 
      let val = await axios.get('tags?tags=games,gaming,gameingpc')
      // console.log('2Comment', val.data);
      updateState1(val.data);
    }
    fetchData3();
  },[])

  // let fetchData4 = async () => { 
  //   let val = await axios.get(`/users/${useparamsId.title}`)
  //   console.log('2Comment', val);
  //   updateState4(val.data);
  //   updateState5(val.data.subscribedUsers);
  // }
  // fetchData4();
  // console.log(state2);
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
                  <div key={ele._id} className='Mainbody2'>
                    {/* {console.log(ele)} */}
                    <img className='thumbnail_Img' src={ele.imageUrl} alt="" />
                    <div className='Mainbody3'>
                      <div>
                        <img className='dp_Img' src={ele.imageUrl} alt="" />
                      </div>
                      <div className='Mainbody4'>
                        <NavLink key={ele._id} to={`/VideoScreen/${ele._id}`} className='NavLink Mainbody4_title'>{ele.videoTitle}</NavLink>
                        <h6 className='Mainbody4_channel'>{ele.channel}</h6>
                        <div className='Mainbody5'>
                          <h6 className='Mainbody5_views'>{ele.views} views</h6>
                          <h6 className='Mainbody5_uploadTime'>{ele.uploadTime} </h6>
                          {/* {()=> updateState2(ele._id)} */}
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