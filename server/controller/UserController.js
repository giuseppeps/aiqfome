const User = require('../model/User');
const Post = require('../model/Post');
const bcrypt = require('bcryptjs');

module.exports = {
  async register(req, res) {
    const {email} = req.body;
    try {
      if(await User.findOne({email})) {
        return res.status(409).send({error: 'Usuário existente'});
      }

      const user = await User.create(req.body);
      return res.send({user});

    }
    catch(err) {
      return res.status(400).send({error: 'Falha no cadastro'});
    }
  },

  async login(req, res) {
    const{email, password} = req.body;
    
    const user = await User.findOne({email}).select('+password');

    if(!user) {
      return res.status(404).send({error: 'Usuário não encontrado'});
    }

    if(!await bcrypt.compare(password, user.password)) {
      return res.status(403).send({error: 'Senha inválida'});
    }

    req.session.user = user;
    res.send({user});
  },

  async logout(req, res) {
    if(req.session) {
      req.session.destroy((err) => {
        if (err) throw err;
      });
      res.status(200).send('Usuário Deslogado');
    }
  },

  async post(req, res) {
    const posts = await Post.find().sort('-createdAt');
    return res.json(posts);
  },
  
  async insertPosts(req, res) {
    const {title, urlImage, urlRecipe} = req.body;
    try {
      if(await Post.findOne({title})) {
        return res.status(409).send({error: 'Receita já existe'});
      }

      const posts = await Post.create(req.body);
      return res.send({posts});

    }
    catch(err) {
      return res.status(400).send({error: 'Falha no cadastro'});
    }
  },
};