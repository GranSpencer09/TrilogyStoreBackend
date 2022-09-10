// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');
const Tag = require('./Tag');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: { isDecimal: true}

    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate :{isNumeric: true}
    },
    category_id : {
        type: DataTypes.INTEGER,
      }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

Product.belongsTo(Category, {
  foreignKey: "category_id", targetKey: "id"    // Good
});

Product.belongsToMany(Tag);



Product.belongsToMany(Tag, {through: "ProductTag", foreignKey: "product_id"});
Tag.belongsToMany(Product, {through: "ProductTag", foreignKey: "tag_id"});

module.exports = Product;