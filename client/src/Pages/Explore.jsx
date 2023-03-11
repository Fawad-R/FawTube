import React from 'react'
import { NavLink } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import { Data } from '../Data'
const Explore = () => {
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
            Data.map((ele, ind) => {
              return (
                <>
                  < div key={ele._id} className='Mainbody2'>
                    {/* {console.log(ele)} */}
                    <img className='thumbnail_Img' src={ele.thumbnail} alt="" />
                    <div className='Mainbody3'>
                      <div>
                        <img className='dp_Img' src={ele.dp} alt="" />
                      </div>
                      <div className='Mainbody4'>
                        <NavLink key={ele._id} to={`/VideoScreen/${ele._id}`} className='NavLink Mainbody4_title'>{ele.title}</NavLink>
                        <h6 className='Mainbody4_channel'>{ele.channel}</h6>
                        <div className='Mainbody5'>
                          <h6 className='Mainbody5_views'>{ele.views} views</h6>
                          <h6 className='Mainbody5_uploadTime'>{ele.uploadTime} </h6>
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

export default Explore