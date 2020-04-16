import React from "react";
import { Container, Box, Label, Input, Textarea } from "theme-ui";
import BackDimLight from "../dimbackground";
import Button from "../button";
import Editor from '../editor';
import axios from 'axios';
import {  useLocation ,useHistory} from "react-router-dom";

const CreatePost = ({ closePost,initialTitle,initialContent,id,type }) => {
  const [title,setTitle] = React.useState(initialTitle);
  const [content, setContent] = React.useState(initialContent);
  const [files, setFiles] = React.useState([]);
  const [loading,setLoading]= React.useState(false);
const history=useHistory();

  const onTitleChange =(e)=>{
    const target = e.target;
    setTitle(target.value);
    
  }

  const onEditorChange = value => {
    setContent(value);
    
  };

  const onFilesChange = files => {
    setFiles(files);
    
  };
  
const handleSubmit=async e=>{
  e.preventDefault();
  
  setLoading(true);
  const url = process.env.API_URL;
  const token = localStorage.getItem('jwtToken');

  const config = {
    headers: { 
      'authorization': `Bearer ${token}`
     }
  }
  const data={
    title,
    content,
  }
try{
  await axios.post(`${url}/api/blogs`,data, config)
  .then((response)=>{
    if(response.data){
      setLoading(false)
      window.location.reload(true);
    }
    
})
}catch(err){
  setLoading(false);
alert(err.response.data.message)
}

}

const handleEdit=async (e)=>{
  e.preventDefault();
  setLoading(true)
  const url = process.env.API_URL;
  const token = localStorage.getItem('jwtToken');

  const config = {
    headers: { 
      'authorization': `Bearer ${token}`
     }
  }
  const data={
    title,
    content,
  }   
  try{
  await axios.patch(`${url}/api/blogs/${id}`,data, config)
  .then((response)=>{
    if(response.data){
      setLoading(false)
      // history.push('/home');
      window.location.reload(true);


    }
    
})
  }catch(err){
    setLoading(false);
alert(err.response.data.message)
  }
}

  return(
  <>
    <Container
      sx={{
        width: "75vw",
        backgroundColor: "gray",
        position: "absolute",
        top: 'auto',
        left: "50vw",
        marginLeft:'-37vw',
        marginBottom: "20px",
        zIndex: 40,
        boxShadow: "0px 0px 20px 10px inset black",
        borderRadius: 10
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          marginTop: 3,
          fontSize: 4,
          fontWeight: 500
        }}
      >
        {type==='create'?'Create New Post':'Edit Post'}
      </Box>
      <Box
       
        sx={{ width: "90%", margin: "0 auto" }}
      >
        <Label htmlFor="postTitle">Post Title</Label>
        <Input name="postTitle" value={title} mb={3} sx={{ outline: "none" }} onChange={onTitleChange}/>
        <Label htmlFor="post">Post</Label>
        <Editor
        initialContent={initialContent}
        placeholder="Start Posting Something"
        onEditorChange={onEditorChange}
        onFilesChange={onFilesChange}
      />
      {type==='create'? <Button
          type="submit"
          onClick={handleSubmit}
          sx={{ margin: 4, cursor: "pointer", outline: "none" }}
          loading={loading}
        >
          Submit
        </Button>
        : <Button
        sx={{ margin: 4, cursor: "pointer", outline: "none" }}
        onClick={handleEdit}
        loading={loading}

      >
        Update
      </Button>}
       
        <Button
          sx={{
            margin: 4,
            backgroundColor: "rgba(200,0,0,0.9)",
            cursor: "pointer",
            outline: "none"
          }}
          onClick={closePost}
        >
          Cancel
        </Button>
      </Box>
    </Container>
    <BackDimLight onClose={closePost} />
  </>
);
}

export default CreatePost;
CreatePost.defaultProps = {
  initialContent: "",
  initialTitle: "",
  id:"",
}