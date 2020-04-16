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
    if(data){
        const options = {year: 'numeric', month: 'long', day: 'numeric' };
         createdDate =Date(data.createdAt).toLocaleString('en-us',options);
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
            {/* <Titlebar loggedIn/> */}
            <Box sx={{width:'75%', backgroundColor:'gray',margin:'0 auto'}}>
                <Box 
                className="blog-title"
                sx={{borderBottom:'5px solid #ED6A5A',boxShadow:' 0px 0px 10px black',textAlign:'center',textTransform:'uppercase' ,fontWeight:'bold',fontSize:6,
                color:'rgb(100, 100, 100)',textShadow:'2px 2px 10px black'}}>
									{data.title}
                </Box>
                <Box sx={{backgroundColor:'accent',color:'white',textAlign:'right',marginTop:2,paddingRight:'2'}}>{createdDate}</Box>

                <Box sx={{width:'80%',margin:'0 auto',paddingTop:'4',paddingBottom:'4'}}>
                        {/* <Box dangerouslySetInnerHTML={{__html:data.content}}/> */}
                        <ReactQuill
                            value={data.content}
                            readOnly={true}
                            theme={"bubble"}
                            />

                </Box>
            </Box>
        </>
    );
}

export default Blog;