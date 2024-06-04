const User = require('./userModel');
const Profile = require('./profileModel');
const Image = require('./imageUserModel');

// Associações One-to-One
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

// Associações One-to-Many
User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Profile, Image };
