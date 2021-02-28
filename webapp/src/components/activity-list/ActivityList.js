import { backendUrl } from "../../config/env";

import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { ActivityItem } from "../activity/ActivityItem";

import "./ActivityList.css";
import ErrorAlert from "../error-alert/ErrorAlert";

export const ActivityList = () => {
  const [loadedActivities, setLoadedActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const state = {
    loading: true,
    hasActivity: false,
    activities: [],
  };

  async function removeActivityHandler(activityId) {
    axios
      .delete(`${backendUrl}/activity/${activityId}`)
      .then((response) => {
        setLoadedActivities((prevActivity) => {
          return loadedActivities.filter((item) => item._id !== activityId);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function createActivity(type) {
    axios
      .post(`${backendUrl}/activity/`, { type: type })
      .then((response) => {
        setLoadedActivities((prevActivity) => {
          const updatedActivities = [response.data.activity, ...prevActivity];
          return updatedActivities;
        });
      })
      .catch((error) => {
        console.error(error);
        setError(
          error.message ||
            "Adding activity failed - the server responded with an error."
        );
      });
  }

  useEffect(function () {
    async function loadActivity() {
      const res = await axios.get(backendUrl + "/activity");
      if (res && res.data && res.data.length > 0) {
        setLoadedActivities(res.data);
        setIsLoading(false);
      }
    }

    loadActivity();
  }, []);

  return (
    <section id="activity-list">
      {error && <ErrorAlert errorText={error} />}
      <h3>Add New Activity</h3>
      <div className="activity-button-container">
        <button className="activity-button" onClick={() => createActivity("1")}>
          💧
        </button>
        <button className="activity-button" onClick={() => createActivity("2")}>
          💩
        </button>
      </div>

      <h3>Latest Activities</h3>
      {loadedActivities.length === 0 && (
        <p>No Activities found. Start adding some!</p>
      )}
      <ul>
        {loadedActivities.map((activity) => (
          <ActivityItem
            key={activity._id}
            id={activity._id}
            activityType={activity.activityType}
            date={activity.createdAt}
            onDelete={removeActivityHandler}
          />
        ))}
      </ul>
    </section>
  );
};

export default ActivityList;
