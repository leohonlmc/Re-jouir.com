import React from "react";
import moment from "moment";

function formatDateString(dateString) {
  return moment(dateString).fromNow();
}

export default formatDateString;
