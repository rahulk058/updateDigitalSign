import React, { useState } from 'react';
import './Schedule.css';
import PublishIcon from '@material-ui/icons/Publish';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { endOfToday, format, set } from 'date-fns';
import TimeRange from 'react-timeline-range-slider';

function Schedule() {
  const now = new Date();
  const getTodayAtSpecificHour = (hour = 12) =>
    set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });

  const selectedStart = getTodayAtSpecificHour();
  const selectedEnd = getTodayAtSpecificHour(14);

  const startTime = getTodayAtSpecificHour(7);
  const endTime = endOfToday();

  const disabledIntervals = [
    { start: getTodayAtSpecificHour(16), end: getTodayAtSpecificHour(17) },
    { start: getTodayAtSpecificHour(7), end: getTodayAtSpecificHour(12) },
    { start: getTodayAtSpecificHour(20), end: getTodayAtSpecificHour(24) },
  ];

  const [selectedInterval, setSelectedInterval] = useState([
    selectedStart,
    selectedEnd,
  ]);
  const [error, setError] = useState(false);

  const errorHandler = ({ error }) => setError({ error });

  const onChangeCallback = (selectedInterval) => {
    setSelectedInterval(selectedInterval);
    console.log(selectedInterval);
  };

  return (
    <div>
      <div className="header">
        <h1>Schedules and settings</h1>
      </div>
      <div className="form">
        <label>Group name</label>
        <span style={{ color: 'red' }}>*</span>
        <input
          type="text"
          className="form-control formEdit text-muted"
          style={{ width: '80%' }}
        ></input>
        <label style={{ marginTop: '3%' }}>Your base playlist is</label>
        <input
          type="text"
          className="form-control formEdit text-muted"
          style={{ width: '80%' }}
        ></input>
        <label style={{ marginTop: '3%', marginBottom: '5%' }}>
          Screens in this group
        </label>
        <br></br>
        <button style={{ marginRight: '2%' }} className="btn btn-success">
          <PublishIcon />
          Publish
        </button>
        <button className="btn btn-danger">
          <DeleteOutlineOutlinedIcon />
          Remove this group
        </button>
      </div>
      <div className="form">
        <button
          style={{ width: '90%' }}
          className="btn btn-light btn-lg btn-block"
        >
          {' '}
          + Add Schedule
        </button>
      </div>
      <div className="form">
        <span>Selected Interval: </span>
        {selectedInterval.map((d, i) => (
          <span key={i}>{format(d, 'dd MMMM, HH:mm ')}</span>
        ))}

        <TimeRange
          error={error}
          ticksNumber={36}
          selectedInterval={selectedInterval}
          timelineInterval={[startTime, endTime]}
          onUpdateCallback={errorHandler}
          onChangeCallback={onChangeCallback}
          disabledIntervals={disabledIntervals}
        />
      </div>
    </div>
  );
}

export default Schedule;
