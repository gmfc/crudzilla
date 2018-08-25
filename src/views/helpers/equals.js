export default (lvalue, rvalue, options) => {
  if (arguments.length < 3) { throw new Error('Handlebars Helper equal needs 2 parameters') }
  if ((lvalue + '') === (rvalue + '')) { // TODO: melhorar isso ai
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
