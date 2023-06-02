import React from 'react';
import Titlebar from "../titlebar";
import { Box,Avatar, useThemeUI } from 'theme-ui';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import './blog.scss';
import Comment from '../comment';
import { formatISO } from 'date-fns';

const Blog = ({loggedIn}) => {
const {theme}=useThemeUI();
    const [data,setData]=React.useState('');
    const {blogId} = useParams();
    const con ="  ";
    let createdDate ;
    let fullname;
    if(data){
        const options = {year: 'numeric', month: 'long', day: 'numeric',hour12:false,hour:'2-digit',minute:'2-digit',second:'2-digit',timeZone:'Asia/Kathmandu' };
         createdDate =data.createdAt.toLocaleString('en-us',options).replace('T','  Time:').replace('Z',"");
         console.log(data.user.fullname);
         
    }

React.useEffect(()=>{
    const url = process.env.API_URL;
    const token = localStorage.getItem('jwtToken');
  
    const config = {
      headers: { 
        'authorization': `Bearer ${token}`
       }
    }
   
    axios.get(`${url}/api/blogs/${blogId}`, config)
    .then((response)=>{
      if(response.data){
        setData(response.data.blog);

    }else{
        console.log(response);
        
    }
      
  })

},[]);

    return (
        <>
        {data?
            <Box sx={{width:'75%', backgroundColor:'gray',margin:'0 auto'}}>
                <Box 
                className="blog-title"
                sx={{borderBottom:`5px solid ${theme.colors.primary}`,textAlign:'center',padding:[3,2],lineHeight:[1] ,fontWeight:'bold',fontSize:[4,6],
                color:theme.colors.secondary }}>
									{data.title}
                </Box>
                <Box sx={{backgroundColor:'accent',color:'white',display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:2,padding:'3'}}>
                       <Box className="avatar-container-blog">
                            <Avatar src={data.user.photo} sx={{width:'100px',height:'100px',borderRadius:'50%'}}/>
                                {/* <svg width="0" height="0">
                                    <defs>
                                        <clipPath id="myClip">
                                        <circle cx="100" cy="100" r="40" />
                                        <circle cx="60" cy="60" r="40" />
                                        </clipPath>
                                    </defs>
                                </svg> */}

                       </Box>
                        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',fontSize:'3',color:'gray', marginLeft:'10px'}}>
                            <Box sx={{textTransform:'capitalize'}}>{data.user.fullname}</Box>
                            <Box sx={{fontSize:'14px'}}>
                                 {data && formatISO(new Date(data.createdAt),{representation:'date'})}
                            {/* {createdDate.split('GMT')[0] */}
                            </Box>
                        </Box>
                   </Box>
                <Box sx={{width:'80%',margin:'0 auto',paddingTop:'4',paddingBottom:'4'}}>
                        {/* <Box dangerouslySetInnerHTML={{__html:data.content}}/> */}
                        <ReactQuill
                            value={data.content}
                            readOnly={true}
                            theme={"bubble"}
                            />

                </Box>
                <Box sx={{}}>
                    <Box sx={{backgroundColor:'primary',textAlign:'center',fontSize:4,color:'accent',textShadow:'1px 1px black'}}>
                        Comments
                    </Box>
                    <Comment/>
                </Box>
            </Box>
            :null}
        </>
    );
}

export default Blog;
