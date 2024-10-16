import  { useState, useEffect } from 'react'
import apiInstance from '../../axios/axios';
import UserData from './UserData';


function UseProfileData() {
    const [profile, setProfile] = useState([])

    // const axios = apiInstance
    const userData = UserData()

    useEffect(() => {
        apiInstance.get(`user/profile/${userData?.user_id}/`).then((res) => {
            setProfile(res.data);
        })
    }, [userData?.user_id])
    return profile
}

export default UseProfileData