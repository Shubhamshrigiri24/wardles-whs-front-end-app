import React from "react";
import {
  Dialog,
  DialogProps,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@material-ui/core";
import { Button, Typography } from "@welldigital/components";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";
import { useStyles } from "pages/OrderProductSelectionPage/components/ProductModal/styles";

export enum ModalType {
  MORE_INFO = "more info",
  DETAILS = "details",
}

export type ProductModalProps = {
  product: PriceConfig | null;
  modalType: ModalType;
  isContinueButtonEnabled: boolean;
  onClose: () => void;
  onSelect: () => void;
  onContinue: () => void;
} & DialogProps;

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  modalType,
  onClose,
  onSelect,
  onContinue,
  isContinueButtonEnabled,
  children,
  ...rest
}) => {
  const classes = useStyles();

  if (!product) return null;

  const productMeta = product.__meta__;

  const renderModalBody = (type: ModalType) => {
    switch (type) {
      case ModalType.MORE_INFO:
        return (
          <>
            <DialogContent>{children}</DialogContent>
            <Box paddingX={1} paddingY={2} className={classes.footer}>
              <DialogActions>
                <Button
                  fullWidth
                  onClick={onClose}
                  data-testid={"product-select/more-info-modal/back"}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  onClick={onSelect}
                  color={"primary"}
                  data-testid={"product-select/more-info-modal/select"}
                >
                  Select
                </Button>
              </DialogActions>
            </Box>
          </>
        );
      case ModalType.DETAILS:
        return (
          <>
            <DialogContent className={classes.detailsBackground}>
              {children}
            </DialogContent>
            <Box paddingX={1} paddingY={2} className={classes.footer}>
              <DialogActions>
                <Button
                  fullWidth
                  onClick={onClose}
                  data-testid={"product-select/details-modal/back"}
                >
                  Back
                </Button>
                <Button
                  fullWidth
                  disabled={!isContinueButtonEnabled}
                  onClick={onContinue}
                  color={"primary"}
                  data-testid={"product-select/details-modal/continue"}
                >
                  Continue
                </Button>
              </DialogActions>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog {...rest} transitionDuration={0}>
      <DialogTitle className={classes.header}>
        <Box className={classes.titleContainer}>
          <img
            src={productMeta?.imageURI}
            alt={productMeta?.productName}
            className={classes.productImage}
          />
          <Typography variant={"h2"} className={classes.title}>
            {productMeta?.productName}
          </Typography>
        </Box>
      </DialogTitle>
      {renderModalBody(modalType)}
    </Dialog>
  );
};

export default ProductModal;
