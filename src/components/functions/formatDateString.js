import React from "react";

function formatDateString(dateString) {
  const currentDateTime = new Date();
  const targetDateTime = new Date(dateString);
  const timeDifference = currentDateTime - targetDateTime;

  if (timeDifference < 60000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} seconds ago`;
  } else if (timeDifference < 3600000) {
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes} minutes ago`;
  } else if (timeDifference < 86400000) {
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours} hours ago`;
  } else if (timeDifference < 2592000000) {
    const days = Math.floor(timeDifference / 86400000);
    return `${days} days ago`;
  } else {
    const months = Math.floor(timeDifference / 2592000000);
    return `${months} months ago`;
  }
}

export default formatDateString;
