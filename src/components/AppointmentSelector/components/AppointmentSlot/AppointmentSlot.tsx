import React, { useState, useCallback } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import {
  FormControl,
  MenuItem,
  Select,
  CircularProgress,
} from "@material-ui/core";
import { Availability } from "../../types";
import { getAppointmentKey } from "../../utils";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  input: {
    minWidth: "150px",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  loadingSpinnerCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

// Height of  select items are 36px
const APPOINTMENT_SLOT_ITEM_HEIGHT = 36;

// CX want the height of the Select to be limited to 6.5 items
// with the .5 to show there's more times if the list is scrollable
const MenuProps = {
  PaperProps: {
    style: {
      // Select box has padding at the top of 8px hence the offset
      maxHeight: 8 + APPOINTMENT_SLOT_ITEM_HEIGHT * 6.5,
    },
  },
};

function getSlotLabel(availability: Availability) {
  const startDate = new Date(availability.startTime);
  const endDate = new Date(availability.endTime);
  return format(startDate, "HH:mm") + " - " + format(endDate, "HH:mm");
}

export interface AppointmentSlotsProps {
  appointments: Availability[];
  selectedAppointment?: Availability;
  setAppointment(a: Availability): void;
  isLoading?: boolean;
}

const AppointmentSlots: React.FC<AppointmentSlotsProps> = (props) => {
  const classes = useStyles();
  const { appointments, setAppointment } = props;
  const [appointmentSelectorValue, setAppointmentSelectorValue] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      const appointment = appointments.find((a: Availability) => {
        return event.target.value === getAppointmentKey(a);
      });
      if (!appointment) {
        return;
      }
      setAppointment(appointment);
      setAppointmentSelectorValue(getAppointmentKey(appointment));
    },
    [setAppointment, setAppointmentSelectorValue, appointments]
  );

  if (props.isLoading && appointmentSelectorValue !== "loading") {
    setAppointmentSelectorValue("loading");
  }

  const isDisabled = !appointments.length || props.isLoading;
  return (
    <div className={classes.root}>
      <FormControl variant={"outlined"}>
        <Select
          inputProps={{
            "data-testid": "appointmentSlot/appointment-select",
          }}
          className={classes.input}
          onClick={handleChange}
          autoWidth
          disabled={isDisabled}
          value={appointmentSelectorValue}
          MenuProps={MenuProps}
        >
          {props.isLoading && (
            <MenuItem
              data-testid={`appointmentSlot/listItem-loading`}
              value={"loading"}
              alignItems={"center"}
            >
              <div className={classes.loadingSpinnerCenter}>
                <CircularProgress size={"1em"} />
              </div>
            </MenuItem>
          )}

          {!props.isLoading &&
            appointments.map((value) => {
              const rowKey = getAppointmentKey(value);
              return (
                <MenuItem
                  data-testid={`appointmentSlot/listItem-${rowKey}`}
                  key={rowKey}
                  value={rowKey}
                >
                  {getSlotLabel(value)}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
};

export default AppointmentSlots;
