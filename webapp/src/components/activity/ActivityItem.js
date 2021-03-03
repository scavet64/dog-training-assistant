import React from "react";
import Moment from "react-moment";
import { FaTrashAlt } from "react-icons/fa";


import "./ActivityItem.scss";
import PoopActivity from "./PoopActivity";
import PeeActivity from "./PeeActivity";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const ActivityItem = (props) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="activity-item">
      <div className="activity-item-type">{props.activityType === "1" ? <PeeActivity/> : <PoopActivity/>}</div>

      <div className="activity-item-content-date">
        <Moment format="hh:mm A" date={props.date}></Moment>
        <Moment format="YYYY/MM/DD" date={props.date}></Moment>
      </div>

      <div
        className="remove-button"
        onClick={handleClickOpen}
      >
        <FaTrashAlt />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Activity?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={props.onDelete.bind(null, props.id)} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
