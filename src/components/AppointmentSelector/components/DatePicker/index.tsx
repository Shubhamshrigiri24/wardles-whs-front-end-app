import React, { useState, useCallback } from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { parseSelectedDate } from "../../utils";
import { Theme, makeStyles } from "@material-ui/core/styles";

const now = new Date();

export interface DatePickerProps {
  date: MaterialUiPickersDate;
  handleDateChange: (selectedDate: Date | null) => void;
  errorMessageOverride?: string;
  minDate?: Date;
}

const useStyles = makeStyles((theme: Theme) => ({
  datePicker: {
    width: "240px",
  },
}));

export default function DatePicker(props: DatePickerProps) {
  const { errorMessageOverride, handleDateChange: handleDateChangeParent } =
    props;
  const [errorMessage, setErrorMessage] = useState("");

  const classes = useStyles();
  const minDate = props.minDate ?? now;

  const handleDateChange = useCallback(
    (date: MaterialUiPickersDate, value?: string | null | undefined) => {
      if (!date) {
        setErrorMessage("Please select a date");
        return;
      }
      const selectedDate = parseSelectedDate(date);
      if (!selectedDate) {
        setErrorMessage("Invalid date");
        return;
      }
      let minDateMinHour = new Date(minDate);
      minDateMinHour.setHours(0, 0, 0, 0);
      if (selectedDate < minDateMinHour) {
        setErrorMessage("Date must be in the future");
        return;
      }
      setErrorMessage("");
      handleDateChangeParent(selectedDate);
    },
    [setErrorMessage, handleDateChangeParent, minDate]
  );

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        data-testid={"keyboardDatePicker"}
        className={classes.datePicker}
        margin={"normal"}
        id={"date-picker-dialog"}
        label={"dd/mm/yyyy"}
        format={"dd/MM/yyyy"}
        value={props.date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          "aria-label": "change date",
        }}
        minDate={minDate}
        error={!!errorMessage || !!errorMessageOverride}
        helperText={errorMessage || errorMessageOverride}
        variant={"inline"}
      />
    </MuiPickersUtilsProvider>
  );
}
