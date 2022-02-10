import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import BodyText from "../BodyText";
import { FormHelperText, makeStyles, Theme } from "@material-ui/core";

export interface SexSelectorProps {
  sex: string;
  label: string;
  className: string;
  handleSexChange: (value: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  marginLeft: {
    marginLeft: theme.spacing(2),
  },
}));

export default function SexSelector(props: SexSelectorProps) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.handleSexChange(event.target.value);
  };

  return (
    <FormControl component={"fieldset"} error={!props.sex}>
      <BodyText className={props.className}>{props.label}</BodyText>
      <RadioGroup
        aria-label={"sex"}
        name={"sex1"}
        value={props.sex}
        onChange={handleChange}
      >
        <FormControlLabel value={"male"} control={<Radio />} label={"Male"} />
        <FormControlLabel
          value={"female"}
          control={<Radio />}
          label={"Female"}
        />
      </RadioGroup>
      {!props.sex && (
        <FormHelperText className={classes.marginLeft}>
          Select one of the options
        </FormHelperText>
      )}
    </FormControl>
  );
}
