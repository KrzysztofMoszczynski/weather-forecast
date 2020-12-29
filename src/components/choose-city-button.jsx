import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  chooseCityButton: {
    backgroundColor: "#C4C4C4",
    borderRadius: 13,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: 600,
  },
});

const ChooseCityButton = () => {
  const classes = useStyles();

  return (
    <div>
      <Link to='/' style={{ textDecoration: "none" }}>
        <Button className={classes.chooseCityButton}>
          Check weather for other city
        </Button>
      </Link>
    </div>
  );
};

export default ChooseCityButton;
