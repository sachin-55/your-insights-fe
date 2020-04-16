import React from 'react';
import Titlebar from "../titlebar";
import { Box } from 'theme-ui';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import './blog.scss';

const Blog = ({loggedIn}) => {

    const [data,setData]=React.useState('');
    const {blogId} = useParams();
    const con ="  ";
    let createdDate ;
    let fullname;
    if(data){
        const options = {year: 'numeric', month: 'long', day: 'numeric',timeZone:'Asia/Kathmandu' };
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

    }
      
  })

},[]);

    return (
        <>
        {data?
            <Box sx={{width:'75%', backgroundColor:'gray',margin:'0 auto'}}>
                <Box 
                className="blog-title"
                sx={{borderBottom:'5px solid #ED6A5A',boxShadow:' 0px 0px 10px black',textAlign:'center',textTransform:'uppercase' ,fontWeight:'bold',fontSize:6,
                color:'rgb(100, 100, 100)',textShadow:'2px 2px 10px black'}}>
									{data.title}
                </Box>
                <Box sx={{backgroundColor:'accent',color:'white',display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:2,paddingRight:'2'}}>
                        <Box sx={{textTransform:'capitalize',paddingLeft:'5'}}>By:{data.user.fullname}</Box>
                        <Box>Date: {createdDate.split('GMT')[0]}</Box>
                   </Box>

                <Box sx={{width:'80%',margin:'0 auto',paddingTop:'4',paddingBottom:'4'}}>
                        {/* <Box dangerouslySetInnerHTML={{__html:data.content}}/> */}
                        <ReactQuill
                            value={data.content}
                            readOnly={true}
                            theme={"bubble"}
                            />

                </Box>
            </Box>
            :null}
        </>
    );
}

export default Blog;
