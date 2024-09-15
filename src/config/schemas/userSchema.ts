export const userSchema = {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'ID do usuário',
      },
      username: {
        type: 'string',
        description: 'Nome de usuário',
      },
      email: {
        type: 'string',
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
        description: 'Data de criação',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Data de atualização',
      },
    },
    required: ['id', 'username', 'email', 'password'],
  };