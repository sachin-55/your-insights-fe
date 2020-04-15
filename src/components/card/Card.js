import React from 'react';
import {Box} from 'theme-ui';
import './card.scss';
import {FaEye,FaPen,FaTrash} from 'react-icons/fa'
import Button from '../button';
import DialogBox from '../dialogbox';
import axios from 'axios';
import {useHistory,Redirect} from 'react-router-dom';
import ReactQuill from 'react-quill';
import CreatePost from '../createPost';

const Card = ({title,content,createdAt,id,userData}) => {
    const options = {year: 'numeric', month: 'long', day: 'numeric' };
    const createdDate =createdAt.toLocaleString('en-us',options);
    const [confirmDelete , setConfirmDelete] = React.useState(false);
    const [editData,setEditData]= React.useState(false);
    const [loading,setLoading] = React.useState(false)

    const history = useHistory();

    const handleView=(e)=>{
        e.preventDefault();
        history.push(`/blog/${id}`);
    }
    const handleEdit=(e)=>{
        e.preventDefault();
       setEditData(true);



    }

    const handleDelete=(e)=>{
        e.preventDefault();
        setConfirmDelete(true)
    }

    const deleteBlog=async ()=>{
        const url = process.env.API_URL;
        const token = localStorage.getItem('jwtToken');
setLoading(true)
        const config = {
            headers: { 
            'authorization': `Bearer ${token}`
            }
        }
     try{
      await  axios.delete(`${url}/api/blogs/${id}`, config)
        .then((response)=>{
            if(response.data){
                setLoading(false)
            window.location.reload(true)      
            }
    
})
     }catch (err) {
        setLoading(false)
        alert(err.response.data.message);
      }
        
    }

    return (
      <Box sx={{display:'flex',flexDirection:'column',border:'1px solid black',boxShadow:' 0px 0px 20px 3px rgba(0,0,0,0.5)',marginBottom:'5',width:'40%',minWidth:'300px',height:'400px',backgroundColor:'background'}}>
        <Box sx={{position:'relative',height:'100%',overflow:'hidden'}}>
        <Box sx={{textAlign:'center',textTransform:'uppercase',fontSize:'18px',fontWeight:'bold'}}>
            {title}
        </Box>
    <Box sx={{backgroundColor:'accent',color:'white',textAlign:'right',marginTop:2,paddingRight:'2'}}>{createdDate}</Box>
    <Box className="card-content" >
       
            <ReactQuill
                value={content}
                readOnly={true}
                theme={"bubble"}
                />
            
    </Box>    
    <Box sx={{position:'absolute',bottom:'0px', backgroundColor:'primary',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
        <Button sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(50,200,30,0.6)'}  }} onClick={handleView}><FaEye/> View</Button>
        <Button sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(0,10,250,0.6)'}  }} onClick={handleEdit} ><FaPen/> Edit</Button>
        <Button sx={{cursor:'pointer', '&:hover':{backgroundColor:'rgba(200,20,30,0.6)'}  }} onClick={handleDelete}><FaTrash/> Delete</Button>

    </Box>
    {confirmDelete === true?<DialogBox loading={loading} closeDialog={()=>setConfirmDelete(false)} title={'Delete'} message={'Are you sure you want to delete this blog?'} action={deleteBlog  }/>:null}
    </Box>

    {editData === true?<CreatePost closePost={()=>setEditData(false)} initialTitle={title} initialContent={content} id={id} type='edit'/>:null}

      </Box>
    );
}

export default Card;
