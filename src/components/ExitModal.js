import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import HelpIcon from '../../src/Assets/HelpIcon.svg'
import Cross from '../../src/Assets/Cross.svg'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ExitModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button href="#contained-buttons" color="primary" size="large" style={{textTransform:"none"}} fullWidth endIcon={<ArrowForwardIosIcon/>}  onClick={handleOpen}>Help setting a strong password</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box mb={2} sx={{display:"flex"}}>
                        <img src={HelpIcon}alt="" />
                        <img style={{paddingLeft:"82%"}}  src={Cross} alt="" />
                    </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to leave this page? You’ll lose your progress
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          If you leave now, you'll lose your progress and will have to start again if you want to create an account.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt:2 }}>
          It only takes a few minutes to create an account. We'll remember your details and preferences when you sign in, making it easier and faster to use our services in future.
          </Typography>
          <Button variant="contained" size="large" disableElevation style={{background: "#FFFFFF",color:"#07283C", fontFamily:"Roboto",marginBottom:"10px",marginTop:"15px", fontSize:"16px", textTransform: "none",border: "1.5px solid #07283C",borderRadius: "2px",fontWeight:"bold"}} fullWidth type="submit">Cancel</Button>
          <Button variant="contained" size="large" disableElevation style={{background: "#FFCD00",color:"#07283C", fontFamily:"Roboto", fontSize:"16px", textTransform: "none",border: "1.5px solid #07283C",borderRadius: "2px",fontWeight:"bold"}} fullWidth type="submit">Leave page</Button>
        </Box>
      </Modal>
    </div>
  );
}
