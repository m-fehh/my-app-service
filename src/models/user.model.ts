import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeMaster } from '../config/database';
import bcrypt from 'bcrypt';

// Interface para o User Model com campos obrigatórios e opcionais
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  isActive?: boolean;
 
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface para criação de um novo usuário
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Classe do modelo User estendendo Model
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isActive?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  // Método para verificar se a senha fornecida corresponde ao hash
  public async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  // Método para definir a senha com hash (usado em hooks)
  public static async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}

// Inicializar o modelo User
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'UQ_username',
        msg: 'O nome de usuário deve ser único.',
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: 'UQ_email',
        msg: 'O email deve ser único.',
      },
      validate: {
        isEmail: {
          msg: 'Forneça um endereço de email válido.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: 'A senha deve ter entre 8 e 100 caracteres.',
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeMaster,
    modelName: 'User',
    tableName: 'users',
    schema: 'app',
    timestamps: true,
    hooks: {
      beforeSave: async (user: User) => {
        if (user.changed('password')) {
          user.password = await User.hashPassword(user.password);
        }
      },
      // Hook para garantir que o índice de unicidade não cause conflitos
      beforeSync: async () => {
        try {
          await sequelizeMaster.query(`
            IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_username' AND object_id = OBJECT_ID('app.users'))
            BEGIN
              ALTER TABLE app.users ADD CONSTRAINT UQ_username UNIQUE (username);
            END;
            IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'UQ_email' AND object_id = OBJECT_ID('app.users'))
            BEGIN
              ALTER TABLE app.users ADD CONSTRAINT UQ_email UNIQUE (email);
            END;
          `);
          console.log('Índices verificados com sucesso.');
        } catch (error) {
          console.error('Erro ao verificar ou criar índices:', error);
        }
      },
    },
  }
);

export default User;
