import React, { useCallback, useState, useRef, useMemo } from "react";
import { debounce } from "lodash";
import { Field, Input, InputProps } from "@welldigital/components";
import { useFormContext } from "hooks";
import { useProduct } from "app/store/hooks";
import AddressAPI from "utils/api/AddressAPI";
import AddressListPopper from "components/AddressListPopper";
import { analytics } from "@welldigital/ui-common";
import { eventsBuilder } from "utils/events";

export const validateGPAddress = (value: InputProps["value"]) => {
  if (!value) {
    return "Please enter your GP address";
  }
  return true;
};

interface Props {
  onSearchError: (message: string) => void;
}

export const AddressLookupGP: React.FC<Props> = ({ onSearchError }) => {
  const [gpLookupAddresses, setGpLookupAddresses] = useState([]);
  const inputRef = useRef<HTMLInputElement | null>();
  const { form } = useFormContext();
  const product = useProduct();

  const handleGPAddressLookupTracking = useCallback(
    (errorMessage?: string) => {
      analytics.trackEvent({
        flow: "ed",
        event: errorMessage
          ? eventsBuilder.orderDetailsForm.newUser.gpLookupFailed
          : eventsBuilder.orderDetailsForm.newUser.gpLookup,
        metadata: {
          ...(errorMessage ? { error: errorMessage } : {}),
        },
      });
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [product]
  );

  const fetchGpAddresses = useCallback(
    async (query: string) => {
      try {
        const response = await AddressAPI.getAddressByGP(query);
        const data = response.data?.data;

        setGpLookupAddresses(data ?? []);
        handleGPAddressLookupTracking();
      } catch (err) {
        onSearchError(
          "An error occured when searching for GP details, please try again"
        );
        handleGPAddressLookupTracking("Failed to fetch addresses");
      }
    },
    [onSearchError, handleGPAddressLookupTracking]
  );

  const handleAddressSelect = useCallback(
    (address) => {
      form.setValue(
        "gpDetails",
        `${address.name}, ${address.addressLine1}, ${address.addressLine2}${
          address.addressLine2 ? ", " : ""
        }${address.city}, ${address.postcode}`
      );
      setGpLookupAddresses([]);
    },
    [form]
  );

  const searchAddresses = useCallback(
    (query: string) => {
      fetchGpAddresses(query);
    },
    [fetchGpAddresses]
  );

  const debouncedAddressSearchHandler = useMemo(
    () => debounce(searchAddresses, 300),
    [searchAddresses]
  );

  const resetAddressList = useCallback(() => {
    setGpLookupAddresses([]);
  }, []);

  return (
    <>
      <Field
        name={"gpDetails"}
        label={"GP name, address, postcode"}
        component={Input}
        validate={validateGPAddress}
        required
        onChange={debouncedAddressSearchHandler}
        inputRef={inputRef}
        inputProps={{
          style: { minWidth: "120px" },
          autoComplete: "off",
          form: {
            autoComplete: "off",
          },
        }}
        disabled={false}
        defaultValue={""}
      />
      <AddressListPopper
        isOpen={gpLookupAddresses.length > 0}
        anchorEl={inputRef.current}
        addressList={gpLookupAddresses}
        onClickAddress={handleAddressSelect}
        onClickAway={resetAddressList}
      />
    </>
  );
};

export default AddressLookupGP;
