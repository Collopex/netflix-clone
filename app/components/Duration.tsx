'use client';

import React from 'react';

const pad = (value: number) => `0${value}`.slice(-2);

const format = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};

type DurationProps = {
  seconds: number;
};

const Duration = ({ seconds }: DurationProps) => {
  return <time dateTime={`P${Math.round(seconds)}S`}>{format(seconds)}</time>;
};

export default Duration;
