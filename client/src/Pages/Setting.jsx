import React from 'react'
import img from '../Components/1.jpg'
import { useNavigate, NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { MdAccountCircle } from "react-icons/md";
const Settings = () => {
  let Navigate = useNavigate();
  let [state1, updateState1] = useState([]);
  let [state2, updateState2] = useState([]);
  let [state3, updateState3] = useState([]);
  let InputEvent = (e) => {
    updateState2({ ...state2, [e.target.name]: e.target.value })
  }
  let SubmitEvent = async (e) => {
    e.preventDefault();
    try {

      let val = await fetch(`/user/${state1._id}`,
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json"
          },
          body: JSON.stringify(state2)
        })
      if (val.status === 200) {
        toast.success("Sucessfully, Updated!!!");
        alert("Sucessfully, Updated!!!")
        Navigate('/');
      }
      else if (val.status === 402) {
        toast.warning("You can only Update yourself");
      }
      else {
        toast.error("Error! cannot update data");
      }
    } catch (error) {
      toast.error("Error! cannot update data");

    }
  }
  let fetchUser = async () => {
    let id = JSON.parse(localStorage.getItem("user"));
    try {
      // console.log(id);
      let val = await axios.get(`/user/${id}`);
      // console.log(val);
      if (val.status === 200) {
        updateState1(val.data);
      }
      else {
        alert("PLease login first to further proceed")
        Navigate('/signin');
      }
    } catch (error) {
      alert(error)
      Navigate('/signin');
    }
  }
  let DeleteAccount = async () => {
    try {

      let val = await axios.delete(`/user/${state1._id}`);
      if (val.status === 200) {
        localStorage.setItem("user", JSON.stringify(null))
        toast.success("Sucessfully, Deleted your account!!!");
        alert("Sucessfully, Deleted your account!!!")
        Navigate('/register')
      }
      else {
        toast.error("Error!!! deleting your account!!!");
      }
    } catch (error) {
      toast.error("Error!!! deleting your account!!!");

    }
  }
  let SignOut = async (e) => {
    try {
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
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <div className="Settings">
      <ToastContainer />
      <div className="SettingsMain">


      </div>
      <div className="container mt-5">

        <div className="row d-flex justify-content-center">

          <div className="col-md-12">

            <div className="card p-3 py-4">

              <div className="text-center">
                <img src={state1.img} width="90" className="rounded-circle" />
              </div>

              <div className="text-center mt-3">

                <div className="px-4 mt-1">
                  <form action="" method='POST'>
                    <div className="SettingsMain2">
                      <h5 className='SettingsMain2_h5' >Username</h5>
                      <input type="text" name="name" id="" onChange={InputEvent} placeholder={state1.name} />
                      <h5 className='SettingsMain2_h5' >Email</h5>
                      <input type="text" name="email" id="" onChange={InputEvent} placeholder={state1.email} />
                      {/* <h5 className='SettingsMain2_h5' >Password</h5>
                      <input type="text" name="password" id="" onChange={InputEvent} placeholder={state1.password} /> */}
                    </div>
                    <input type="submit" id='Update' onClick={SubmitEvent} style={{}} value="Update" />
                  </form>
                </div>

                <ul className="social-list">
                  <li><i className="fa fa-facebook"></i></li>
                  <li><i className="fa fa-dribbble"></i></li>
                  <li><i className="fa fa-instagram"></i></li>
                  <li><i className="fa fa-linkedin"></i></li>
                  <li><i className="fa fa-google"></i></li>
                </ul>

                <div className="buttons">

                  <button className="btn btn-outline-primary px-4" onClick={SignOut}>SignOut</button>
                  <button className="btn btn-primary px-4 ms-3" onClick={DeleteAccount}>Delete Account</button>
                  <div className="SettingsMain1">
                    {/* <button id="SignOut" className='SettingsMain1_h4' onClick={SignOut} >SignOut</button>
          <button id="DeleteAccount" className='SettingsMain1_h4' onClick={DeleteAccount}>Delete Account</button> */}
                  </div>

                </div>


              </div>




            </div>

          </div>

        </div>

      </div>
      {/* <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span className="font-weight-bold">Edogaru</span><span className="text-black-50">edogaru@mail.com.my</span><span> </span></div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="row mt-3">
                  <form action="" method='POST'>
                    <div className="SettingsMain2">
                      <h5 className='SettingsMain2_h5' >Username</h5>
                      <input type="text" name="name" id="" onChange={InputEvent} placeholder={state1.name} />
                      <h5 className='SettingsMain2_h5' >Email</h5>
                      <input type="text" name="email" id="" onChange={InputEvent} placeholder={state1.email} />
                      <h5 className='SettingsMain2_h5' >Password</h5>
                      <input type="text" name="password" id="" onChange={InputEvent} placeholder={state1.password} />
                    </div>
                    <input type="submit" id='Update' onClick={SubmitEvent} style={{}} value="Update" />
                    <div className="mt-5 text-center"><button className="btn btn-primary profile-button" onClick={SubmitEvent} type="button">Save Profile</button></div>
                  </form>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-md-6"><label className="labels">Name</label><input type="text" className="form-control" placeholder="first name" value="" /></div>
                <div className="col-md-6"><label className="labels">Surname</label><input type="text" className="form-control" value="" placeholder="surname" /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12"><label className="labels">Mobile Number</label><input type="text" className="form-control" placeholder="enter phone number" value="" /></div>
                <div className="col-md-12"><label className="labels">Address Line 1</label><input type="text" className="form-control" placeholder="enter address line 1" value="" /></div>
                <div className="col-md-12"><label className="labels">Address Line 2</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                <div className="col-md-12"><label className="labels">Postcode</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                <div className="col-md-12"><label className="labels">State</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                <div className="col-md-12"><label className="labels">Area</label><input type="text" className="form-control" placeholder="enter address line 2" value="" /></div>
                <div className="col-md-12"><label className="labels">Email ID</label><input type="text" className="form-control" placeholder="enter email id" value="" /></div>
                <div className="col-md-12"><label className="labels">Education</label><input type="text" className="form-control" placeholder="education" value="" /></div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" value="" /></div>
                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" value="" placeholder="state" /></div>
              </div>

            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience"><span>My videos</span></div><br />
              <div>

              </div>
            </div>
          </div>
        </div>
      </div > */}
    </div >
  )
}

export default Settings;