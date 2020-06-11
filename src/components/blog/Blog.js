import React from 'react';
import Titlebar from "../titlebar";
import { Box,Avatar } from 'theme-ui';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import './blog.scss';
import Comment from '../comment';

const Blog = ({loggedIn}) => {

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
                sx={{borderBottom:'5px solid #ED6A5A',textAlign:'center',textTransform:'uppercase' ,fontWeight:'bold',fontSize:6,
                color:'rgb(100, 100, 100)' }}>
									{data.title}
                </Box>
                <Box sx={{backgroundColor:'accent',color:'white',display:'flex',flexDirection:'row',justifyContent:'flex-start',alignItems:'center',marginTop:2,paddingRight:'2'}}>
                       <Box className="avatar-container-blog">
                            <Avatar src={data.user.photo} sx={{width:'150px',height:'150px',borderRadius:'20px'}}/>
                                {/* <svg width="0" height="0">
                                    <defs>
                                        <clipPath id="myClip">
                                        <circle cx="100" cy="100" r="40" />
                                        <circle cx="60" cy="60" r="40" />
                                        </clipPath>
                                    </defs>
                                </svg> */}

                       </Box>
                        <Box sx={{display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start',fontSize:'3',color:'gray'}}>
                            <Box sx={{textTransform:'capitalize'}}>{data.user.fullname}</Box>
                            <Box>Date: {createdDate.split('GMT')[0]}</Box>
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
