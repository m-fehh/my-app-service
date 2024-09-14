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

  // Método para definir a senha com hash
  public async setPassword(password: string): Promise<void> {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }

  // Método para verificar se o usuário está ativo
  public isActiveUser(): boolean {
    return this.isActive ?? true; 
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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], 
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
  }
);

export default User;
