// Definição do esquema User
const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
      description: 'ID único do usuário',
    },
    username: {
      type: 'string',
      description: 'Nome de usuário do usuário',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'Email do usuário',
    },
    password: {
      type: 'string',
      description: 'Senha do usuário',
    },
    isActive: {
      type: 'boolean',
      description: 'Status ativo do usuário',
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora de criação do usuário',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Data e hora da última atualização do usuário',
    },
  },
  required: ['username', 'email', 'password'],
};

export default userSchema;
