import moment from 'moment'
// https://github.com/tcort/handlebars-dateformat/blob/master/test/handlebars-dateformat.test.js
export default (date, format, utc) => {
  return (utc === true) ? moment(date).utc().format(format) : moment(date).format(format)
}
