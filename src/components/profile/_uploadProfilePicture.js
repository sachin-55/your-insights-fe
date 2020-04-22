import React from 'react';
import { Box, Label, Input,Avatar,Text } from "theme-ui";
import axios from "axios";
import Button from "../button";

// const initialState = {
//     photo: "",
//   };
  

const _uploadProfilePicture = ({data}) => {
    const [photo, setPhoto] = React.useState(data.photo);
    const [afterUpload,setAfterUpload] = React.useState('');
    const [loading,setLoading] = React.useState(false);

React.useEffect(()=>{
  console.log(`After = ${afterUpload}`);
  console.log(`Data = ${photo}`);
  
},[]);

    const handleChange = e => {
        const { target } = e;
        setPhoto(target.files[0])
        setAfterUpload(URL.createObjectURL(target.files[0]))
      };

      const handleUpdate = async e => {
        e.preventDefault();
        const url = process.env.API_URL;
        const token = localStorage.getItem('jwtToken');
        setLoading(true)
        let formData = new FormData();
      
        const config = {
          headers: { 
            'content-type': 'multipart/form-data', 
            'authorization': `Bearer ${token}`
           }
        }

      formData.append("photo",photo);      
      axios.patch(`${url}/api/users/uploadProfileImage`,formData, config)
      .then((response)=>{
          if(response.data){
              setLoading(false)
              setPhoto(response.data.user.photo);
              setAfterUpload(response.data.user.photo)
              console.log(response.data.user.photo);
            localStorage.setItem('user',JSON.stringify(response.data.user));
            window.location.reload(true);  
          }
    
        }).catch(err=>{
            setLoading(false)
            alert("Error Uploading Image. Check if Image is selected")
            
        })

      }


      return (
        <>
         <Box sx={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <Avatar   className='avatar'  src={afterUpload ?  afterUpload:data.photo}  sx={{borderRadius:'50%',border:'1px solid gray',width:'200px',height:'200px'}}/> 
          <Text sx={{fontSize:'1',color:'background'}}>**Select square image if possibe else image is cropped from center</Text>
        </Box>
        <Box
        as="form"
        onSubmit={handleUpdate} 
        sx={{ width: "40%", margin: "0 auto" }}>
             <Label htmlFor="email">Upload Profile Picture</Label>
        <Input
          type="file"
          name="photo"
          mb={3}
          sx={{ outline: "none" }}
          onChange={handleChange}
        />
        <Button
          type="submit"
          sx={{ backgroundColor: "primary", outline: "none" }}
          loading={loading}
        >
          Update
        </Button>
        </Box>

        </>
    );
}

export default _uploadProfilePicture;
