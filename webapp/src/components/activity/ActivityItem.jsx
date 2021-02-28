import React from "react";
import Moment from "react-moment";
import { FaTrashAlt } from "react-icons/fa";

import "./ActivityItem.css";

export const ActivityItem = (props) => {
  return (
    <div className="activity-item">
      <div className="activity-item-type">{props.activityType === "1" ? "💧" : "💩"}</div>

      <div className="activity-item-content-date">
        <Moment format="hh:mm A" date={props.date}></Moment>
        <Moment format="YYYY/MM/DD" date={props.date}></Moment>
      </div>

      <div
        className="remove-button"
        onClick={props.onDelete.bind(null, props.id)}
      >
        <FaTrashAlt />
      </div>
    </div>
  );
};
