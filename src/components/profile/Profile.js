import React from 'react';
import Titlebar from '../titlebar';
import { Box } from 'theme-ui';
import Button from '../button';
import axios from'axios';
import {useHistory} from 'react-router-dom';
import DialogBox from '../dialogbox';

const Profile = ({onLogout}) => {
    let [fields,setFields]=React.useState('Upload Profile Image');
    const [confirmLogout , setConfirmLogout] = React.useState(false);
    const [loading,setLoading] = React.useState(false)

    const history=useHistory();

    const handleLogout = (e)=>{
        e.preventDefault();
        setConfirmLogout(true);
    }

const logout=async ()=>{
    const url = process.env.API_URL;
  const token = localStorage.getItem('jwtToken');
    setLoading(true)
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
      localStorage.setItem("user", '');

      onLogout();
      setLoading(false);
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
    {confirmLogout === true?<DialogBox width='75%' loading={loading} closeDialog={()=>setConfirmLogout(false)} title={'Logout'} message={'Are you sure you want to logout?'} action={logout  }/>:null}
            </Box>
        </>
    );
}

export default Profile;
