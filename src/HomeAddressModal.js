// Modal for Select prescriber page.

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import HelpIcon from "./Assets/HelpIcon.svg";
import Cross from "./Assets/Cross.svg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LiveHelpOutlinedIcon from "@material-ui/icons/LiveHelpOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 330,
  bgcolor: "background.paper",
  borderRadius: "8px",
  p: 4,
};

export default function HomeAddressModal() {
  const [open1, setOpen1] = React.useState(false);

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

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
        onClick={handleOpen1}
      >
        Who is my prescriber?
      </Button>
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box mb={2} sx={{ display: "flex" }}>
            <img src={HelpIcon} alt="" />
            <img
              onClick={handleClose1}
              style={{ paddingLeft: "82%" }}
              src={Cross}
              alt=""
            />
          </Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Who is my prescriber?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your prescriber is the place that approves your appliance
            prescriptions. This might be your GP surgery, a nurse prescriber, or
            a prescribing hub, for example.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Search for your prescriber and select from the list. If you can't
            find your prescriber, you can enter their details manually and we
            will try to add your prescriber into our system.
          </Typography>
          <Button
            onClick={handleClose1}
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
            // type="submit"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
