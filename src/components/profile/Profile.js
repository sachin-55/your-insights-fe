import React from 'react';
import Titlebar from '../titlebar';
import { Box } from 'theme-ui';
import Button from '../button';
import axios from'axios';
import {useHistory,useParams} from 'react-router-dom';
import DialogBox from '../dialogbox';
import UpdateNameAndEmail from './_updateNameAndEmail';
import UpdatePassword from './_updatePassword';
import UploadProfilePicture from './_uploadProfilePicture';

const Profile = ({onLogout}) => {
    const [confirmLogout , setConfirmLogout] = React.useState(false);
    const [loading,setLoading] = React.useState(false)
    const [data,setData] = React.useState('');
    const {userId} = useParams();


    React.useEffect(()=>{
        const url = process.env.API_URL;
        const token = localStorage.getItem('jwtToken');
        const config = {
          headers: { 
            'authorization': `Bearer ${token}`
           }
        }
       
     axios.get(`${url}/api/users/${userId}`, config)
        .then((response)=>{
          if(response.data){
            setData(response.data.data.user);
        }
        
      })
    },[]);


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
              
                <Box sx={{backgroundColor:'primary',paddingLeft:'4',flex:'1',display:'flex',flexDirection:'column',alignItems:'flex-start',flexBasis:'100px'}}>
                  

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
                <Box sx={{backgroundColor:'transparent',paddingLeft:'4',flex:'3',width:'100%',marginBottom:3}}>
                <Box sx={{width:'100%',position:'relative'}}>
                    {confirmLogout === true?<DialogBox width='75%' loading={loading} closeDialog={()=>setConfirmLogout(false)} title={'Logout'} message={'Are you sure you want to logout?'} action={logout  }/>:null}
                </Box>

                    

                   {data?
                   <>
                    <UploadProfilePicture data={data}/>
                    <UpdateNameAndEmail data={data}/>
                   </> 
                   :<h1>Please Wait ...</h1>}
                    <UpdatePassword />

                </Box>
            </Box>
        </>
    );
}

export default Profile;
