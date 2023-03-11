import React, { createContext, useReducer } from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home'
import './App.css' 
import Navbar from './Components/Navbar'
import Upload from './Pages/Upload'
import Setting from './Pages/Setting'
import Login from './Pages/Login'
import Register from './Pages/Register'
import VideoScreen from './Pages/VideoScreen'
import Explore from './Pages/Explore'
import Subscription from './Pages/Subscription'
import Movie from './Pages/Movie'
import Gaming from './Pages/Gaming'
import Music from './Pages/Music'
import News from './Pages/News'
import Sports from './Pages/Sports'

let context1=createContext()
const App = () => {
  let initialValue;
  let reducer=((state,dispatch)=>{
    if(dispatch.type==='movies')
    {
      return dispatch.payload;
    }
    if(dispatch.type==='sports')
    {
      return dispatch.payload;
    }
    if(dispatch.type==='news')
    {
      return dispatch.payload;
    }
    if(dispatch.type==='gaming')
    {
      return dispatch.payload;
    }
    if(dispatch.type==='music')
    {
      return dispatch.payload;
    }
    return state;
  })
  let [state,dispatch]=useReducer(reducer,initialValue);
  return (
    <div>
    <>
    <context1.Provider value={{state,dispatch}}>
     
    <Routes>
    <Route path='/' element={<Navbar />}  />
    <Route path='/home' element={<Home />}  />
    <Route path='/sports' element={<Home value={"/tags?tags=cricket,Sports,football"}/>}  />
    <Route path='/upload' element={<Upload />}  />
    <Route path='/setting' element={<Setting />}  />
    <Route path='/signin' element={<Login />}  />
    <Route path='/register' element={<Register />}  />
    <Route path='/videoScreen/:title' element={<VideoScreen />}  />
    <Route path='/explore' element={<Home value={"/tags?tags=memes,comedy,funny"} />}  />
    <Route path='/subscription' element={<Subscription />}  />
    <Route path='/movie' element={<Home value={"/tags?tags=movie,movies,Movie,IslamicMovie"} />}  />
    <Route path='/gameing' element={<Home value={"tags?tags=games,gaming,gameingpc"} />}  />
    <Route path='/music' element={<Home value={"/tags?tags=Music,IslamicMusic,Nasheed,music"} />}  />
    <Route path='/news' element={<Home value={"/tags?politicalNews,politicalnews,news,News"} />}  />
    {/* <Route path='/sports' element={<Sports />}  /> */}
    </Routes>
    </context1.Provider>
    </>
    </div>
  )
}

export default App
export {context1};