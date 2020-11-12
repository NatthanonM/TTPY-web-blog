const formatter = {
  formatDatetime: (timestamp) => {
    const datetime = new Date(timestamp);
    const datevalues = [
      datetime.getFullYear(),
      datetime.getMonth(),
      datetime.getDate(),
      datetime.getHours() < 10
        ? "0" + datetime.getHours()
        : datetime.getHours(),
      datetime.getMinutes() < 10
        ? "0" + datetime.getMinutes()
        : datetime.getMinutes(),
    ];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[[datevalues[1]]]} ${datevalues[0]}, ${datevalues[2]} ${
      datevalues[3]
    }:${datevalues[4]}`;
  },
};

export default formatter;
