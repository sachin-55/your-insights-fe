import React from 'react';
import { Box, Avatar } from 'theme-ui';
import './comment.scss';
import { Link } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const Comment = () => {
    const [leaveComment,setLeaveComment] = React.useState('');
    const [comments,setComments] = React.useState([]);

    const {blogId} = useParams();

    React.useEffect(()=>{
        const url = process.env.API_URL;
        const token = localStorage.getItem('jwtToken');
        const config = {
          headers: { 
            'authorization': `Bearer ${token}`
           }
        }
       
        axios.get(`${url}/api/comments/${blogId}`, config)
        .then((response)=>{
          if(response.data){
            setComments(response.data.data.comments);
    
        }else{
            console.log(response);
            
        }
    });
    
    },[comments]);

    const handleKeyPress=(e)=>{
            const url = process.env.API_URL;
            const token = localStorage.getItem('jwtToken');
            const config = {
              headers: { 
                'authorization': `Bearer ${token}`
               }
            }

            const data={
                comment:leaveComment,
                blogId,
                userId:JSON.parse(localStorage.getItem('user'))._id,
            }
           
            axios.post(`${url}/api/comments/`, data,config)
            .then((response)=>{
              if(response.data){
                  
                setComments((comments)=>[...comments,response.data.comment]);
            }else{
                console.log(response);
                
            }
        });

        setLeaveComment('');
    }

    return (
        <Box sx={{backgroundColor:'accent',width:'100%',padding:'10px'}}>
      {localStorage.getItem('jwtToken')==='loggedout' || !localStorage.hasOwnProperty("jwtToken") ?
         <Box sx={{backgroundColor:'primary',width:'100%',padding:'10px',borderRadius:'5px',textAlign:'center',fontSize:3}} mb='2'>
            Please <Link to='/?login'>Login</Link> To Comment
        </Box>
        :
         <Box>
             <h3>Leave a comment...</h3>
             <input  placeholder='Comment' type='text' name='leaveComment' value={leaveComment} onChange={(e)=>setLeaveComment(e.target.value)} className='leaveComment'/>
            <button onClick={handleKeyPress} className='post-btn'>Post</button>
         </Box>
        }
         <Box sx={{backgroundColor:'primary',width:'100%',padding:'10px',borderRadius:'5px'}}>
         {comments.length>0? 
            <ul className='comments-list'>
            {   
            
                comments.map(comment=>(
                    <li key={comment._id}>
                        <div>
                            <Avatar src={comment.commentedBy.photo}/>
                        </div>
                        <div>
                           
                            <div className='date'>
                                {comment.commentDate.split('T')[0] } {comment.commentDate.split('T')[1].split(':')[0]}:{comment.commentDate.split('T')[1].split(':')[1]}
                            </div>
                            <div className='username'>
                                {comment.commentedBy.fullname}
                            </div>
                            <div className='comment'>
                                {comment.comment}
                            </div>
                        </div>
                    </li>
                ))
            }
            </ul>
            :
            <Box sx={{backgroundColor:'primary',width:'100%',padding:'10px',borderRadius:'5px',textAlign:'center',fontSize:1}}>
                No Comments!<br/>
                Be First To Comment.
            </Box>
            }
         </Box>
        </Box>
    );
}

export default Comment;
