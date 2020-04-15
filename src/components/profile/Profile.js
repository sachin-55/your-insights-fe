import React from 'react';
import Titlebar from '../titlebar';
import { Box } from 'theme-ui';
import Button from '../button';
import axios from'axios';
import {useHistory} from 'react-router-dom';

const Profile = ({loggedIN}) => {
    let [fields,setFields]=React.useState('Upload Profile Image');
    const history=useHistory();
const handleLogout=async ()=>{
    const url = process.env.API_URL;
  const token = localStorage.getItem('jwtToken');
    
  const config = {
    headers: { 
      'authorization': `Bearer ${token}`
     }
  }
try{
  await axios.get(`${url}/api/users/logout`, config)
  .then((response)=>{
    if(response.data){
      localStorage.setItem("jwtToken", response.data.token);
      history.push('/');
    }
    
})
}catch(err){
  setLoading(false);
    alert(err.response.data.message)
}
}

    return (
        <>
            <Box sx={{width:'75%',minHeight:'90vh',margin:'0 auto',backgroundColor:'gray',display:'flex',flexDirection:'row'}}>
                <Box sx={{backgroundColor:'primary',paddingLeft:'4',flex:1,display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                    <Button 
                        onClick={()=>setFields('Upload Profile Image')}
                        sx={{outline:'none',cursor:'pointer',marginTop:'4','&:hover':{textDecoration:'underline' }}}>
                        Upload Profile Image
                        </Button>
                    <Button 
                        onClick={()=>setFields('Change Name or Email')}
                        sx={{outline:'none',cursor:'pointer','&:hover':{textDecoration:'underline' }}}>
                        Change Name/Email
                        </Button>
                    <Button 
                        onClick={()=>setFields('Change Password')}
                        sx={{outline:'none',cursor:'pointer','&:hover':{textDecoration:'underline' }}}>
                        Change Password
                        </Button>


                    <Button 
                        onClick={()=>setFields('View and Update your Profile')}
                        sx={{outline:'none',cursor:'pointer',marginTop:'6','&:hover':{textDecoration:'underline' }}}>
                        View Profile
                        </Button>
                        <Button 
                        onClick={handleLogout}
                        sx={{outline:'none',cursor:'pointer',marginTop:'6','&:hover':{textDecoration:'underline' }}}>
                        Logout
                        </Button>

                </Box>
                <Box sx={{backgroundColor:'secondary',paddingLeft:'4',flex:3}}>
                    {fields}
                </Box>
            </Box>
        </>
    );
}

export default Profile;
