const convertTimestampToDate = (timestamp) => {
  var date = new Date(timestamp);
  return date.toLocaleDateString();
};

export default convertTimestampToDate;
