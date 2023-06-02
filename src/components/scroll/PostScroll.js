import React from "react";
import { Container,Box,Text } from "theme-ui";
import Card from '../card';
import axios from 'axios';


const PostScroll = ({setNewPost}) => {
const [data,setData] = React.useState('');
const [loading,setloading]=React.useState(true);

React.useEffect(()=>{
  if(!data){

  const url = process.env.API_URL;
  const token = localStorage.getItem('jwtToken');

  const config = {
    headers: { 
      'authorization': `Bearer ${token}`
     }
  }

 axios.get(`${url}/api/blogs/`, config)
  .then((response)=>{
    if(response.data){
      setloading(false);
      setData(response.data.blogs)
    }else{
      console.log(response);
      
    }
  })
} 
},[]);

const createBlogCards = ()=>{
  let cards;
    if(data.length>0){
    cards =data.map(el=><Card key={el._id} id={el._id} title={el.title} content={el.content} createdAt={el.createdAt} userData={el.user} viewOnly={false}/>) 

  }else{
    cards='No Blogs Found. Create a New Blog'
  }
    return cards;
}


  return(
  <React.Fragment>
    <Container sx={{ width: "75vw",minHeight:'70vh', backgroundColor: "gray",display:'flex',justifyContent:'space-around',flexWrap:'wrap',alignItems:'center',padding:4,margin:'32px auto' }}>
      {loading === true ?<Text sx={{fontWeight:'500', fontSize:'32px'}}>Loading Your's Insights ...</Text>
      :
      <>
   {loading === false &&
   data && data.length===0&& 
   <Text mb={4} sx={{fontWeight:'500' , fontSize:'20px'}}>No Blogs Found. Create a New Blog.</Text>}
      <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid black',boxShadow:' 0px 0px 20px 3px rgba(0,0,0,0.5)',marginBottom:'5',width:'40%',minWidth:'300px',height:'400px',backgroundColor:'gray', cursor:'pointer', fontSize:'2rem', fontWeight:'bold', borderRadius:'10px'}}
        onClick={() => setNewPost(true)}
      >
        + Create New Post
      </Box>
      {data && data.length>0 && createBlogCards()}
      </>
      }
    </Container>
   
  </React.Fragment>
);
}


export default PostScroll;
