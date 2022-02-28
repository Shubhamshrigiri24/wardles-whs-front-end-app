import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpIcon from '../../src/Assets/HelpIcon.svg'
import Cross from '../../src/Assets/Cross.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LiveHelpOutlinedIcon from '@material-ui/icons/LiveHelpOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 408,

    bgcolor: 'background.paper',
    borderRadius: "8px",

    p: 4,
};

export default function GetEmail() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div >
             
        <Button color="primary" size="large" style={{textTransform:"none" ,display:"flex",flexDirection:"row",justifyContent:"start" ,paddingRight:"30%"}} fullWidth startIcon={<LiveHelpOutlinedIcon/>} endIcon={<ArrowForwardIosIcon/>}  onClick={handleOpen}>Didn’t get an email?</Button>
           
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style} >
                <Box mb={2} sx={{display:"flex"}}>
                        <img src={HelpIcon}alt="" />
                        <img onClick={handleClose} style={{paddingLeft:"82%"}}  src={Cross} alt="" />
                    </Box>
                
                        
                        <Typography  id="modal-modal-title" variant="h6" component="h2" >
                            Didn’t get an email?
                        </Typography>

                        <Typography  id="modal-modal-description" sx={{ mt: 2 }}>
                            Try resending the email and check your junk or spam folders.

                        </Typography>

                        <Typography mb={2} id="modal-modal-description" sx={{ mt: 3 }}>
                            If you still can't see an email from us after a few minutes, use the help button at the top of the screen.

                        </Typography>


                        <Button onClick={handleClose} variant="contained" size="large" disableElevation style={{ marginTop: "10px", background: "#FFCD00", color: "#07283C", fontFamily: "Roboto", fontSize: "16px", textTransform: "none", solid: "#07283C", borderRadius: "2px", fontWeight: "bold" }} fullWidth type="submit">Close</Button>
                    </Box>
                
            </Modal>
        </div>
    );
}
