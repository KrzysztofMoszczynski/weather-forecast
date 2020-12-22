import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    height: 200,
    width: 300,
    backgroundColor: "#00031F",
    color: "#F8F8F8",
    borderRadius: 10,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  label: {
    verticalAlign: "top",
    fontSize: 30,
  },
  value: {
    verticalAlign: "bottom",
    fontSize: 40,
  },
});

const SmallBox = ({ label, value, units }) => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <p className={classes.label}>{label}</p>
      <p className={classes.value}>{value + " " + units}</p>
    </div>
  );
};

export default SmallBox;
