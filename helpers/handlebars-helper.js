const handlebars = require('handlebars')

const helpers = handlebars.registerHelper('formatDate', (date) => {
  const formattedDate = new Date(date);
  const year = formattedDate.getFullYear();
  const month = formattedDate.getMonth() + 1;
  const day = formattedDate.getDate();
  return year + '-' + month + '-' + day;
});


module.exports = { helpers }