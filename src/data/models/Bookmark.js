import DataType from 'sequelize';
import Model from '../sequelize';

const Bookmark = Model.define('Bookmark', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

  name: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [0, 255],
    },
  },

  url: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isURL: true,
    },
  },

  description: {
    type: DataType.STRING,
    defaultValue: '',
    allowNull: false,
    validate: {
      len: [0, 255],
    },
  },

});

export default Bookmark;
