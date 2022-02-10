import React, { FC } from "react";
import { Grid, Box, SvgIcon } from "@material-ui/core";
import { Typography } from "@welldigital/components";
import { useStyles } from "./styles";

export type DeliveryStatusProps = {
  Icon?: typeof SvgIcon;
  label: string;
  value: string;
  uniform?: boolean;
};

export const DeliveryStatus: FC<DeliveryStatusProps> = ({
  label,
  value,
  Icon,
  uniform = false,
}) => {
  const classes = useStyles({ uniform });
  return (
    <Grid container justify={"space-between"} wrap={"nowrap"}>
      <Grid item xs>
        <Box display={"flex"} alignItems={"center"}>
          {Icon && <Icon fontSize={"small"} className={classes.icon} />}
          <Typography className={classes.label}>{label}</Typography>
        </Box>
      </Grid>
      <Grid item xs={"auto"}>
        <Typography className={classes.value} align={"right"} noWrap>
          {value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DeliveryStatus;
