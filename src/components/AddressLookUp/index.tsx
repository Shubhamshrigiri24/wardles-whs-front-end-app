import React, { useCallback, useState } from "react";
import {
  TextField,
  makeStyles,
  Button,
  Grid,
  Popper,
  List,
  ListItemText,
  ListItem,
  Paper,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { PostcodeLookupAddress } from "../../app/store/reducer/shared";

const useStyles = makeStyles((theme) => ({
  input: {
    width: "100%",
  },
  searchButton: {
    width: "100%",
    height: "100%",
    maxHeight: "56px",
  },
  popper: {
    border: "1px solid #AFB7BC",
    backgroundColor: theme.palette.background.paper,
    zIndex: 99,
    borderRadius: "1px 1px 8px 8px",
    maxHeight: 350,
    overflowY: "auto",
  },
}));

export interface AddressLookUpProps {
  fetchAddressesByPostcode(p: string): void;

  postCodeLookUpAddresses: PostcodeLookupAddress[];

  setAddress(postcodeLookupAddress: PostcodeLookupAddress): void;

  className?: string;
  error: string;
  inputRef?: any;
}

const AddressLookUp: React.FC<AddressLookUpProps> = (props) => {
  const {
    fetchAddressesByPostcode,
    postCodeLookUpAddresses,
    setAddress,
    className,
    error,
    inputRef,
  } = props;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [open, setOpen] = useState<boolean>(false);
  const [postcode, setPostcode] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePostCodeChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const pc = event.target.value;
      setPostcode(pc);
    },
    [setPostcode]
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [popperWidth, setPopperWidth] = useState<undefined | number>(0);

  const onSearchClick = useCallback(() => {
    setAnchorEl(document.getElementById("postcode-input"));
    setPopperWidth(document.getElementById("postcode-input")?.scrollWidth);
    setOpen(true);
    fetchAddressesByPostcode(postcode);
  }, [setOpen, fetchAddressesByPostcode, postcode]);

  const onPostcodeSelectClick = useCallback(
    (postCodeAddress: PostcodeLookupAddress) => () => {
      setAddress(postCodeAddress);
      setOpen(false);
    },
    [setOpen, setAddress]
  );

  const handleClickAway = useCallback(() => {
    setOpen(false);
  }, []);

  const classes = useStyles();
  return (
    <Grid container spacing={2} className={className}>
      <Grid item xs={isMobile ? 12 : 9}>
        <TextField
          className={classes.input}
          label={"Postcode"}
          variant={"outlined"}
          name={"postcode"}
          onChange={handlePostCodeChange}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            "data-testid": "postcode",
          }}
          id={"postcode-input"}
          error={!!error}
          helperText={error}
          inputRef={inputRef}
        />
        {open && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Popper
              open={open && postCodeLookUpAddresses.length > 0}
              anchorEl={anchorEl}
              placement={"bottom"}
              className={classes.popper}
              style={{ width: popperWidth }}
            >
              <Paper elevation={10}>
                <List component={"nav"}>
                  {postCodeLookUpAddresses.map((address) => {
                    return (
                      <ListItem
                        button
                        onClick={onPostcodeSelectClick(address)}
                        key={`${address.postcode}+${address.line1}`}
                      >
                        <ListItemText
                          primary={`${address.line1}, ${address.line2}${
                            address.line2 ? ", " : ""
                          }${address.city}, ${address.postcode}`}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Paper>
            </Popper>
          </ClickAwayListener>
        )}
      </Grid>
      <Grid item xs={isMobile ? 6 : 3}>
        <Button
          data-testid={"addressLookUp/search-button"}
          variant={"outlined"}
          color={"default"}
          className={classes.searchButton}
          onClick={onSearchClick}
          disabled={postcode.length < 3 || !!error}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddressLookUp;
