const User = require('../model/User');
const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    const {email} = req.body;
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
  },

  async authenticate(req, res) {
    const{email, password} = req.body;
    
    const user = await User.findOne({email}).select('+password');

    if(!user) {
      return res.status(400).send({error: 'Usuário não encontrado'})
    }

    if(!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({error: 'Senha inválida'});
    }

    res.send({user});
  }
};