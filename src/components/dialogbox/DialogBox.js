import React from 'react';
import {Box,Container} from 'theme-ui';
import BackDimLight from '../dimbackground';
import Button from '../button';

const DialogBox = ({closeDialog,title,message,action,loading,width='100%'}) => {
    return (
       <>
        <Container
        sx={{
            width: `${width}`,
            backgroundColor: "gray",
            position: "absolute",
            top: 6,
            marginBottom: "20px",
            zIndex: 40,
        }}
        >
        <Box sx={{width:'100%',backgroundColor:'highlight',paddigTop:'3',textAlign:'center',color:'gray',fontSize:3 }}>
            {title}
        </Box>
        <Box sx={{width:'100%',textAlign:'center',fontSize:3}}>
            {message}
        </Box>
            <Box sx={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <Button
                sx={{
                    margin: 4,
                    backgroundColor: "rgba(20,200,0,0.9)",
                    cursor: "pointer",
                    outline: "none",
                    '&:hover':{
                        backgroundColor:"rgba(25,200,50,1)"
                    }
                }}
                onClick={action}
                loading={loading}
                >
                {title}
                </Button>
                <Button
                sx={{
                    margin: 4,
                    backgroundColor: "rgba(200,0,0,0.9)",
                    cursor: "pointer",
                    outline: "none",
                    '&:hover':{
                        backgroundColor:"rgba(255,10,50,1)"
                    }
                }}
                onClick={closeDialog}
                >
                Cancel
                </Button>
            </Box>
        </Container>
        <BackDimLight onClose={closeDialog} />



       </>
    );
}

export default DialogBox;
