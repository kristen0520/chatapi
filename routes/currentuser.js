module.exports = (app) => {

  app.get('/currentuser', (req, res) => {
    res.send(req.user)
  })

}
