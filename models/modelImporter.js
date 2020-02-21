const Ingredient = require('../models/Ingredient.js');
const CookingMethod = require('../models/CookingMethod.js');
const Dish = require('../models/Dish.js');
const Group = require('../models/Group.js');
const GroupList = require('../models/GroupList.js');
const PrivateList = require('../models/PrivateList.js');
const Task = require('../models/Task.js');
const User = require('../models/User.js');
const Comment = require('../models/Comment');
const List = require('../models/List');

module.exports = {
  Ingredient, CookingMethod, Comment, Dish, Group, GroupList, PrivateList, Task, User, List
};