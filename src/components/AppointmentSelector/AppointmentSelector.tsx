import React, { useState, useEffect, useCallback } from "react";
import { Typography, Theme, makeStyles } from "@material-ui/core";
import AppointmentSlots from "./components/AppointmentSlot/AppointmentSlot";
import { Availability, FetchAvailabilityInput } from "./types";
import DatePicker from "./components/DatePicker";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
  },
  opaque: {
    opacity: 0.4,
  },
  item: {
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    display: "block",
  },
}));

export interface AppointmentSelectorStateProps {
  now?: Date;
  minDate?: Date;
  appointments: Availability[];
  selectedAppointment?: Availability;
  isFetching: boolean;
  selectedServiceId: string;
  selectedLocationId?: string;
}

export interface AppointmentSelectorDispatchProps {
  fetchAvailability(input: FetchAvailabilityInput): void;
  setAppointment(a: Availability): void;
}

export type AppointmentSelectorProps = AppointmentSelectorStateProps &
  AppointmentSelectorDispatchProps;

const AppointmentSelector: React.FC<AppointmentSelectorProps> = (props) => {
  const dateTimeNow = new Date();
  const initialSelectedDate: Date = props.minDate || props.now || dateTimeNow;
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  const {
    fetchAvailability,
    selectedLocationId,
    selectedServiceId,
    isFetching,
    appointments,
  } = props;

  const loadAvailability = useCallback(() => {
    const fetchAvailabilityInput: FetchAvailabilityInput = {
      locationId: selectedLocationId,
      serviceId: selectedServiceId,
      start: selectedDate,
      end: selectedDate,
    };
    fetchAvailability(fetchAvailabilityInput);
  }, [fetchAvailability, selectedLocationId, selectedServiceId, selectedDate]);

  useEffect(() => {
    loadAvailability();
  }, [loadAvailability, selectedDate]);

  const classes = useStyles();

  const getDaysAppointments = useCallback((): Availability[] => {
    if (!appointments?.length) {
      return [];
    }
    return props.appointments.filter(
      (x) => new Date(x.startTime).getDate() === selectedDate.getDate()
    );
  }, [props, selectedDate, appointments]);

  const onDateClick = useCallback(
    (selectedDate: Date | null) => {
      setSelectedDate(selectedDate || initialSelectedDate);
    },
    [setSelectedDate, initialSelectedDate]
  );

  const daysAppointments = getDaysAppointments();

  const getErrorMessage = useCallback(() => {
    if (!daysAppointments.length && !isFetching) {
      return "There are no available appointments on your selected date";
    }
    return "";
  }, [daysAppointments, isFetching]);

  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <Typography variant={"body2"}>Select a date</Typography>
        <DatePicker
          date={selectedDate}
          minDate={props.minDate}
          errorMessageOverride={getErrorMessage()}
          handleDateChange={onDateClick}
        />
      </div>
      <div className={classes.item}>
        <Typography variant={"body2"}>Select a time</Typography>
        <AppointmentSlots
          appointments={daysAppointments}
          selectedAppointment={props.selectedAppointment}
          setAppointment={props.setAppointment}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
};

export default AppointmentSelector;
