import React from "react";
import { Container } from "theme-ui";
import Card from '../card';
import axios from 'axios';


const PostScroll = () => {
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
    <Container sx={{ width: "75vw",minHeight:'70vh', backgroundColor: "gray",display:'flex',justifyContent:'space-around',flexWrap:'wrap',paddingTop:5,paddingBottom:5 }}>
      
      {loading === true ?<h1>Loading ...</h1>:createBlogCards()}
    </Container>
   
  </React.Fragment>
);
}


export default PostScroll;
