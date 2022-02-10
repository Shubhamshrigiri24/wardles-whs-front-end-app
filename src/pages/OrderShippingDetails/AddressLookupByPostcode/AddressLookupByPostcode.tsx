import React, { useCallback, useState, useRef } from "react";
import { Button, Field, Input } from "@welldigital/components";
import AddressListPopper from "components/AddressListPopper";
import { POSTCODE_PATTERN } from "utils/regex";
import { useFormContext } from "hooks";
import AddressAPI from "utils/api/AddressAPI";
import { OrderCustomerDetails } from "app/store/reducer/order/types";
import {
  AddressValues,
  PostcodeAddress,
} from "pages/OrderShippingDetails/types";
import { validatePostcode } from "pages/OrderShippingDetails/helpers";
import { useStyles } from "pages/OrderShippingDetails/styles";

interface Props {
  onSearchError: (message: string) => void;
  isDisabled: boolean;
  handlePostcodeSearch?: (success: boolean, errorMessage?: string) => void;
}

export const AddressLookupByPostcode: React.FC<Props> = ({
  onSearchError,
  isDisabled,
  handlePostcodeSearch = () => {},
}) => {
  const [postcode, setPostcode] = useState("");
  const [postcodeLookupAddresses, setPostcodeLookupAddresses] = useState<
    Pick<
      OrderCustomerDetails,
      "addressLine1" | "addressLine2" | "city" | "postcode"
    >[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>();
  const { form } = useFormContext();
  const classes = useStyles();

  const resetAddressList = useCallback(() => {
    setPostcodeLookupAddresses([]);
  }, []);

  const fetchAddressesByPostalcode = useCallback(async () => {
    setIsSearching(true);
    try {
      if (POSTCODE_PATTERN.test(postcode)) {
        const response = await AddressAPI.getAddressByPostcode(postcode);
        const data = response.data;

        if (data.addresses) {
          const adaptedAddresses = (data.addresses as PostcodeAddress[]).map(
            (address) => {
              return {
                city: address.city,
                postcode: address.postcode,
                addressLine1: address.line1,
                addressLine2: address.line2,
              };
            }
          );
          setPostcodeLookupAddresses(adaptedAddresses);
        }
        handlePostcodeSearch(true);
      } else {
        handlePostcodeSearch(false, "Invalid postcode provided");
        onSearchError("The postcode you entered is invalid");
      }
    } catch (err) {
      handlePostcodeSearch(false, "Failed to fetch addresses");
      onSearchError(
        "An error occured when searching for addresses, please try again"
      );
    }
    setIsSearching(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postcode, onSearchError]);

  const searchAddresses = useCallback(() => {
    fetchAddressesByPostalcode();
  }, [fetchAddressesByPostalcode]);

  const handleAddressSelect = useCallback(
    (lookupAddress: AddressValues) => {
      ["addressLine1", "addressLine2", "city"].forEach((field) =>
        form.setValue(field, lookupAddress[field as keyof AddressValues])
      );
      setPostcodeLookupAddresses([]);
    },
    [form]
  );

  return (
    <div className={classes.flexContainer}>
      <div className={classes.flexItemLeft}>
        <Field
          name={"postcode"}
          label={"Postcode"}
          component={Input}
          validate={validatePostcode}
          required
          onChange={setPostcode}
          inputRef={inputRef}
          inputProps={{
            style: { minWidth: "120px" },
          }}
          disabled={isDisabled}
          defaultValue={""}
        />
        <AddressListPopper
          onClickAway={resetAddressList}
          addressList={postcodeLookupAddresses}
          isOpen={postcodeLookupAddresses.length > 0}
          // @ts-ignore
          onClickAddress={handleAddressSelect}
          anchorEl={inputRef.current}
        />
      </div>
      <div>
        <Button
          fullWidth
          className={classes.searchButton}
          color={"default"}
          variant={"outlined"}
          disabled={!postcode || isDisabled}
          loading={isSearching}
          onClick={searchAddresses}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default AddressLookupByPostcode;
