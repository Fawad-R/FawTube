import React, { useState } from 'react'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase.jsx'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { storage } from './Firebase.jsx'
import { useEffect } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Upload = () => {
  let Navigate=useNavigate();
    let [state1, updateState1] = useState(undefined);
    let [state4, updateState4] = useState(undefined);
    let [state2, updateState2] = useState({ videoTitle: '', videoDescription: '', tags: '' });
    let [state3, updateState3] = useState(false);
    let [state5, updateState5] = useState(false);
    let [state6, updateState6] = useState();
    let [state7, updateState7] = useState(0);
    let [state8, updateState8] = useState(0);


let uploading = async(file,urlType) => {

// Upload file and metadata to the object 'images/mountains.jpg'
let name = new Date().getTime()+ file.name;
const storageRef = ref(storage, name );
// , metadata
const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed',
  (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // console.log('Upload is ' + progress + '% done');
    state1?updateState7(progress):<></>
    if(state5)
    {
      updateState8(progress);
    }
    switch (snapshot.state) {
      case 'paused':
        // console.log('Upload is paused');
        break;
      case 'running':
        // console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    switch (error.code) {
      case 'storage/unauthorized':
        break;
      case 'storage/canceled':
        break;


      case 'storage/unknown':
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      // console.log('File available at', downloadURL);
      updateState2((prev)=>{
        return {...prev,[urlType]:downloadURL}
    })

    });
  }
);
}

let fetchUser=async()=>{
  let id=JSON.parse(localStorage.getItem("user"));
  try {
    // console.log(id);
    let val=await axios.get(`/user/${id}`);
    // console.log(val);
    if (!val.status===200) {
      // updateState1(val.data);
      alert("PLease login first to further proceed")
      Navigate('/signin');
    }
    // else
    // {
    // }
  } catch (error) { 
    alert(error)
    Navigate('/signin');
  }
}  
useEffect(()=>{
  fetchUser();
},[])
    useEffect(()=>{
        state3 && uploading(state1,"videoUrl");
    },[state1])
    useEffect(()=>{
        state5 && uploading(state4,"imageUrl");
    },[state4])

   
    
    let inputEventImg = (e) => {
        updateState1(e.target.files[0])
        updateState3(true);
    }
    let inputEventImg2 = (e) => {
        updateState4(e.target.files[0])
        updateState5(true);
    }
    let inputEvent = (e) => {
        if(e.target.name==='tags')
        {
            let params=e.target.value.split(",");
            updateState2({ ...state2, [e.target.name]: params })
        }
        else
        {
            updateState2({ ...state2, [e.target.name]: e.target.value })
        }
    
    }
    let SubmitBtn = async (e) => {
        e.preventDefault();
        let val=await fetch('/video',{
            method:"POST",
            headers:{
                "content-Type":"application/json"
            },
            body:JSON.stringify({...state2})
        })
        if(val.status===200)
        {
          toast.success("Sucessfully, uploaded!!!");
          Navigate('/')
        }
        else 
        {
          toast.error("Error! can't upload");
        }
    }
    return (
        <>
        <ToastContainer/>
            <div className="upload">
                <form className='uploadForm' action="" method="post">
                    <h1>Upload a new video</h1>
                    <label htmlFor="">Video:</label>
                    <input  type="file" name="video" id="video" accept="video/*" onChange={inputEventImg} />
                    Upload is  {Math.round(state7)}  % done
                    <input className='input' type="text" onChange={inputEvent} placeholder='Video Title' name="videoTitle" id="videoTitle" />
                    <textarea onChange={inputEvent} placeholder='Video Description' name="videoDescription" id="videoDescription" cols="30" rows="10"></textarea>
                    <input className='input' type="text" onChange={inputEvent} placeholder='separare tags with commas' name="tags" id="tags" />
                    <label htmlFor="">ThumbNail:</label>
                    <input type="file" name="image" id="image" accept="image/*" onChange={inputEventImg2} />
                    Upload is  {Math.round(state8)}  % done
                    {state7 ===100 && state8===100? <input className='input' type="submit" value="Upload" onClick={SubmitBtn} id='UploadBtn' />:"Waiting for video and img to upload"}
                    <img src={state6} alt="" />
                </form>

            </div>
        </>
    )
}

export default Upload