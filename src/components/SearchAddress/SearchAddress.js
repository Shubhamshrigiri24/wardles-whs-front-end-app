import React from "react";
import { Container } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Arrow from "../../Assets/Arrow.svg";
import { Typography } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
function SearchAddress() {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "60vh",
      }}
    >
      <div>
        <h2>Enter your home address</h2>
        <p>Use the address registered with your prescriber.</p>
        <TextField
          id="outlined-basic"
          fullWidth
          label="Search label"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Link
          component="button"
          variant="body2"
          style={{ fontSize: "17px", marginTop: "2%" }}
        >
          Enter address manually
        </Link>
        <Button
          fullWidth
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid black",
            marginBottom: "2%",
            marginTop: "2%",
            padding: "20px",
          }}
        >
          <Typography variant="Body1">
            Merchants Warehouse Castle Street
          </Typography>
          <br />
          <Typography variant="caption">
            Castlefield, Manchester, M3 4LZ
          </Typography>
        </Button>
        <Button
          fullWidth
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid black",
            marginBottom: "2%",
            marginTop: "2%",
            padding: "20px",
          }}
        >
          <Typography variant="Body1">
            Merchants Warehouse Castle Street
          </Typography>
          <br />
          <Typography variant="caption">
            Castlefield, Manchester, M3 4LZ
          </Typography>
        </Button>
        <Button
          fullWidth
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid black",
            marginBottom: "2%",
            marginTop: "2%",
            padding: "20px",
          }}
        >
          <Typography variant="Body1">
            Merchants Warehouse Castle Street
          </Typography>
          <br />
          <Typography variant="caption">
            Castlefield, Manchester, M3 4LZ
          </Typography>
        </Button>
        <Button
          fullWidth
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid black",
            marginBottom: "2%",
            marginTop: "2%",
            padding: "20px",
          }}
        >
          <Typography variant="Body1">
            Merchants Warehouse Castle Street
          </Typography>
          <br />
          <Typography variant="caption">
            Castlefield, Manchester, M3 4LZ
          </Typography>
        </Button>
        <Button
          fullWidth
          style={{
            display: "block",
            textAlign: "left",
            border: "1px solid black",
            marginBottom: "2%",
            marginTop: "2%",
            padding: "20px",
          }}
        >
          <Typography variant="Body1">
            Merchants Warehouse Castle Street
          </Typography>
          <br />
          <Typography variant="caption">
            Castlefield, Manchester, M3 4LZ
          </Typography>
        </Button>
      </div>
    </Container>
  );
}

export default SearchAddress;
