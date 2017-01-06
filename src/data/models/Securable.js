import DataType from 'sequelize';
import Model from '../sequelize';

const Securable = Model.define('Securable', {

  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true,
  },

});

export default Securable;
