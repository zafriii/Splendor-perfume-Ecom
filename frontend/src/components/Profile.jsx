import React from 'react'
import { useAuth } from '../store/Auth'
import UserLocationMap from './UserLocationMap';
import { NavLink } from 'react-router-dom';
import './profile.css'
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

function Profile({darkMode, toggleDarkMode}) {

const {user, isLoggedin} = useAuth();


  return (
    <>
  
    <div className='profile'>
         
        <UserLocationMap/>

        <div className="personal-details">

            Personal details

            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone no: {user.phone}</p>

            <NavLink to='/update_profile'>
                <button>Update Profile</button>
            </NavLink>

        </div>

    </div>
      
    
    </>
  )
}

export default Profile