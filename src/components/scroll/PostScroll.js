import React from "react";
import { Container } from "theme-ui";
import Card from '../card';
import axios from 'axios';


const PostScroll = ({userData}) => {
const [data,setData] = React.useState('');

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
      setData(response.data.blogs)
    }
  })
}
},[]);

const createBlogCards = ()=>{
let cards;
  if(data.length>0){
   cards =data.map(el=><Card key={el._id} id={el._id} title={el.title} content={el.content} createdAt={el.createdAt}/>) 

}else{
  cards='Loading Blogs. . .'
}
  return cards;
}


  return(
  <React.Fragment>
    <Container sx={{ width: "75vw",minHeight:'70vh', backgroundColor: "gray",display:'flex',justifyContent:'space-around',flexWrap:'wrap',paddingTop:5,paddingBottom:5 }}>
      {createBlogCards()}
      {/* <Card title='Title' content='<h1>lol jkjkjk</h1><br><h3>This is not correct</h3>' createdAt={Date.now()}/> */}
      {/* <Card title='Title' content='<h1>lol jkjkjk</h1><br><h3>This is not correct</h3>' createdAt={Date.now()}/> */}
    </Container>
   
  </React.Fragment>
);
}


export default PostScroll;
