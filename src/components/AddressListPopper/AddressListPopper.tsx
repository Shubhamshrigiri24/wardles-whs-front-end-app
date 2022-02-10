import React, { useCallback, useState, useEffect } from "react";
import {
  Popper,
  List,
  ListItemText,
  ListItem,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";
import { OrderCustomerDetails } from "app/store/reducer/order/types";

const POPPER_INITIAL_WIDTH = 300;
const POPPER_MAX_HEIGHT = 300;

type Address = Pick<
  OrderCustomerDetails,
  "addressLine1" | "addressLine2" | "city" | "postcode"
> & { name?: string };

interface Props {
  isOpen: boolean;
  onClickAway: () => void;
  onClickAddress: (address: Address) => void;
  addressList: Address[];
  anchorEl?: HTMLInputElement | null;
}

export const AddressListPopper: React.FC<Props> = ({
  isOpen,
  onClickAway,
  onClickAddress,
  addressList,
  anchorEl,
}) => {
  const [popperWidth, setPopperWidth] = useState(POPPER_INITIAL_WIDTH);

  const handleAddressClick = useCallback(
    (address: Address) => () => {
      onClickAddress(address);
    },
    [onClickAddress]
  );

  useEffect(() => {
    setPopperWidth(anchorEl?.scrollWidth ?? POPPER_INITIAL_WIDTH);
  }, [anchorEl]);

  return isOpen ? (
    <ClickAwayListener onClickAway={onClickAway}>
      <Popper
        open={isOpen}
        anchorEl={anchorEl as HTMLElement}
        placement={"bottom"}
        style={{ width: popperWidth, zIndex: 10 }}
      >
        <Paper
          elevation={4}
          style={{ maxHeight: POPPER_MAX_HEIGHT, overflowY: "scroll" }}
        >
          <List component={"nav"}>
            {addressList.map((address) => {
              return (
                <ListItem
                  button
                  onClick={handleAddressClick(address)}
                  key={`${address.name}+${address.addressLine1}+${address.addressLine2}+${address.postcode}`}
                >
                  {address.name ? (
                    <ListItemText
                      primary={address.name}
                      secondary={`${address.addressLine1}, ${
                        address.addressLine2
                      }${address.addressLine2 ? ", " : ""}${address.city}, ${
                        address.postcode
                      }`}
                    />
                  ) : (
                    <ListItemText
                      primary={`${address.addressLine1}, ${
                        address.addressLine2
                      }${address.addressLine2 ? ", " : ""}${address.city}, ${
                        address.postcode
                      }`}
                    />
                  )}
                </ListItem>
              );
            })}
          </List>
        </Paper>
      </Popper>
    </ClickAwayListener>
  ) : null;
};

export default AddressListPopper;
