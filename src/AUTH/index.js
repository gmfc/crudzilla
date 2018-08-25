export default (req, res, next) => {
  if (req.session.logged) {
    next()
  } else {
    res.redirect('/login')
  }
}
