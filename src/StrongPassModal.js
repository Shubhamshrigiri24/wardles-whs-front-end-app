import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HelpIcon from "../src/Assets/HelpIcon.svg";
import Cross from "../src/Assets/Cross.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 341,
  bgcolor: "background.paper",
  borderRadius: "8px",
  p: 4,
};

export default function StrongPassModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        href="#contained-buttons"
        color="primary"
        size="large"
        style={{ textTransform: "none" }}
        fullWidth
        startIcon={<LiveHelpOutlinedIcon />}
        endIcon={<ArrowForwardIosIcon />}
        onClick={handleOpen}
      >
        Help setting a strong password
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mb={2} sx={{ display: "flex" }}>
            <img src={HelpIcon} alt="" />
            <img
              onClick={handleClose}
              style={{ paddingLeft: "82%" }}
              src={Cross}
              alt=""
            />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Help setting a strong password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Strong passwords are unique, at least 12 characters long and contain
            upper and lowercase letters, numbers and symbols.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Try swapping letters for numbers or symbols to make your password
            harder to guess. For example, instead of S try using $.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You could also try using the first letter of each word from your
            favourite song lyric to create a word that won't be obvious to other
            people.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Avoid using personal details other people might know or common words
            like 'password'.
          </Typography>
          <Button
            onClick={handleClose}
            variant="contained"
            size="large"
            disableElevation
            style={{
              marginTop: "10px",
              background: "#FFCD00",
              color: "#07283C",
              fontFamily: "Roboto",
              fontSize: "16px",
              textTransform: "none",
              solid: "#07283C",
              borderRadius: "2px",
              fontWeight: "bold",
            }}
            fullWidth
            type="submit"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
