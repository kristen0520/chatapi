module.exports = (app) => {

  app.get('/', (req, res) => {
    console.log(req.session)
    res.send("chat app api")
  })

}
