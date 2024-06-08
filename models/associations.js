const User = require('./userModel');
const Profile = require('./profileModel');
const Image = require('./imageUserModel');

User.hasOne(Profile, { foreignKey: 'userId' });
Profile.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Image, { foreignKey: 'userId' });
Image.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Profile,
    Image
}