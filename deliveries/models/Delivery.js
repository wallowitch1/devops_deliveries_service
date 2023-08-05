const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Delivery = sequelize.define('Delivery', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memo: {
      type: DataTypes.STRING,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    delivery_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
     },
    delivery_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
}, {
  timestamps: false // timestamps 옵션을 false로 설정
});

  return Delivery;
};
