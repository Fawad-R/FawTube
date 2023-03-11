import React, { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { json, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, uploadString } from "firebase/storage";
import { storage } from './Firebase.jsx'


const Register = () => {
  let [state1, updateState1] = useState({})
  let [state2, updateState2] = useState()
  let [state3, updateState3] = useState(false)
  let [state4, updateState4] = useState(0)

  let Navigate = useNavigate();
  let RegBtn = async (e) => {
    e.preventDefault();
    // let { email, name, password } = state1;
    let val = await fetch('/user', {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      },
      // body: JSON.stringify({ email, name, password })
      body: JSON.stringify(state1 )
    })
    if (val.status === 200) {
      toast.success('Sucessfully,Registered!')
      Navigate('/signin');
    }
    else {
      toast.error('Wrong info! Please try again ')
    }

  }
  let inputEvent = (e) => {
    if(e.target.name==='email')
    {
      let val=e.target.value;
      updateState1({ ...state1, [e.target.name]: val.toLowerCase() })
    }
    else
    {
      updateState1({ ...state1, [e.target.name]: e.target.value })
    }
  }
  let inputEventImg = (e) => {
    updateState2(e.target.files[0])
    updateState3(true);
  }
  useEffect(() => {
    state3 && uploading(state2, "img");
  }, [state3])

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
        updateState4(progress)
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
          updateState1((prev)=>{
            // console.log('prev',prev);
            return {...prev,[urlType]:downloadURL}
        })
    
        });
      }
    );
    }
    
  return (
    <div>
      <div >

        <ToastContainer />
        <form className='Login uploadForm' action="" method="post">
          <div>
            <ArrowBackIcon style={{ "cursor": "pointer" }} onClick={() => {
              Navigate('/')
            }}> </ArrowBackIcon>Home
          </div>
          <h1>Register</h1>
          <input onChange={inputEventImg} type="file" name="img" id="img" />
          <p> Uploading {Math.round(state4)} %</p>
          <input type="text" onChange={inputEvent} placeholder='email' name='email' />
          <input type="text" onChange={inputEvent} placeholder='username' name='name' />
          <input type="password" onChange={inputEvent} placeholder="password" name='password' id="" />
          <input type="password" onChange={inputEvent} placeholder="cpassword" name='cpassword' id="" />
          {state4===100? <input type="submit" onClick={RegBtn} value="Register" id='UploadBtn' /> : 'Waiting for img to upload'}
        </form>

      </div>
    </div>
  )
}

export default Register