const User = require('./userModel');
const Profile = require('./profileModel');

// Associações One-to-One
User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Profile };
