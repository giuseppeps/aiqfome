const User = require('../model/User');

module.exports = {
  async register(req, res) {
    const {email, password} = req.body;
    try {
      if(await User.findOne({email})) {
        return res.status(400).send({error: 'Usuário existente'});
      }

      const user = await User.create(req.body);
      return res.send({user});

    }
    catch(err) {
      return res.status(400).send({error: 'Falha no cadastro'});
    }
  }
};