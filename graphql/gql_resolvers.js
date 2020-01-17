// rff-demo gql_resolvers.js
// provides resolvers for apollo server in express

const config = require('../utils/config.js');
const { UserInputError, AuthenticationError, PubSub } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pubsub = new PubSub();

const { Ingredient, CookingMethod, Comment, Dish, Group,
  GroupList, PrivateList, Task, User, List } = require('../models/modelImporter');

// helper functions and constants for resolvers

// constants
const dishFields = ['cookingMethods', 'proteins', 'carbs', 'spices', 'addedBy'];

// dish finder based on arguments
const findDishes = async (args) => {
  const dishes = await Dish.find({}).populate(dishFields);
  switch (args) {
  // 4 arguments
  case args.carb && args.method && args.protein && args.spice:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.cookingMethods.find(m => m.name === args.method) &&
        dish.proteins.find(p => p.name === args.protein) &&
        dish.spices.find(s => s.name === args.spice)
    );
    // 3 arguments
  case args.carb && args.method && args.protein:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.cookingMethods.find(m => m.name === args.method) &&
        dish.proteins.find(p => p.name === args.protein)
    );
  case args.carb && args.method && args.spice:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.cookingMethods.find(m => m.name === args.method) &&
        dish.spices.find(s => s.name === args.spice)
    );
  case args.carb && args.protein && args.spice:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.proteins.find(p => p.name === args.protein) &&
        dish.spices.find(s => s.name === args.spice)
    );
  case args.method && args.protein && args.spice:
    return dishes.filter(dish =>
      dish.cookingMethods.find(m => m.name === args.method) &&
        dish.proteins.find(p => p.name === args.protein) &&
        dish.spices.find(s => s.name === args.spice)
    );
    // 2 arguments
  case args.carb && args.method:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.cookingMethods.find(m => m.name === args.method)
    );
  case args.carb && args.protein:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.proteins.find(p => p.name === args.protein)
    );
  case args.carb && args.spice:
    return dishes.filter(dish =>
      dish.carbs.find(c => c.name === args.carb) &&
        dish.spices.find(s => s.name === args.spice)
    );
  case args.method && args.protein:
    return dishes.filter(dish =>
      dish.cookingMethods.find(m => m.name === args.method) &&
        dish.proteins.find(p => p.name === args.protein)
    );
  case args.method && args.spice:
    return dishes.filter(dish =>
      dish.cookingMethods.find(m => m.name === args.method) &&
        dish.spices.find(s => s.name === args.spice)
    );
  case args.protein && args.spice:
    return dishes.filter(dish =>
      dish.proteins.find(p => p.name === args.protein) &&
        dish.spices.find(s => s.name === args.spice)
    );
    // 1 argument
  case args.carb:
    return dishes.filter(dish => dish.carbs.find(c => c.name === args.carb));
  case args.method:
    return dishes.filter(dish => dish.cookingMethods.find(m => m.name === args.method));
  case args.protein:
    return dishes.filter(dish => dish.proteins.find(p => p.name === args.protein));
  case args.spice:
    return dishes.filter(dish => dish.spices.find(s => s.name === args.spice));
    // 0 arguments
  default:
    return dishes;
  }
};

// user finder based on arguments
const findUsers = async (args) => {
  // 1
  if (args.username) return await User.find({ username: args.username }).populate('groups');
  if (args.active) return await User.find({ active: args.active }).populate('groups');
  if (args.role) return await User.find({ role: args.role }).populate('groups');
  if (args.group) return await User.find({ groups: args.group }).populate('groups');
  // 0
  return await User.find({}).populate('groups');
};

// group finder based on arguments
const findGroups = async (args) => {
  let groups;
  switch (args.all) {
  case true:
    groups = await Group.find({}).populate('creator');
    return groups;
  case false:
    groups = await Group.find({
      _id: {
        $in: args.groups
      }
    }).populate('creator');
    return groups;
  default:
    groups = await Group.find({
      _id: {
        $in: args.groups
      }
    }).populate('creator');
    return groups;
  }
};

// list counter
const countLists = async (args, user) => {
  if (args.all) {
    return List.collection.countDocuments();
  } else {
    const p = await PrivateList.find({ owner: user._id }).countDocuments();
    const g = user.groups.map(g => GroupList.find({ group: g }).countDocuments()).reduce();
    return p+g;
  }
};

// task counter
const countTasks = async (args) => {
  let count = 0;
  if (args.all) return Task.collection.countDocuments();
  if (args.countType === 'user' || args.countType === 'total') {
    const lists = await PrivateList.find({ owner: args.userID });
    for (let l = 0; l < lists.length; l++) {
      count += await Task.find({ listID: lists[l]._id.toString() }).countDocuments();
    }
  }
  if (args.countType === 'group' || args.countType === 'total') {
    for (let g = 0; g < args.groupIDs.length; g++) {
      const lists = await GroupList.find({ group: args.groupIDs[g] });
      for (let l = 0; l < lists.length; l++) {
        count += await Task.find({ listID: lists[l]._id.toString() }).countDocuments();
      }
    }
  }
  return count;
};

// task finder
const findTasks = async (listID) => {
  return await Task.find({ listID: listID }).populate('creator');
};

// dish - ingredient usage mappers
const updateUsage = async (dishID, type, set) => {
  switch (type) {
  case 'CARB':
    await removeUsage('CARB', dishID);
    for(let c = 0; c < set.length; c++) {
      const carb = await Ingredient.findById(set[c]);
      carb.uses = [...carb.uses, dishID];
      await carb.save();
    }
    break;
  case 'METHOD':
    await removeUsage('METHOD', dishID);
    for(let m = 0; m < set.length; m++) {
      const method = await CookingMethod.findById(set[m]);
      method.uses = [...method.uses, dishID];
      await method.save();
    }
    break;
  case 'PROTEIN':
    await removeUsage('PROTEIN', dishID);
    for(let p = 0; p < set.length; p++) {
      const protein = await Ingredient.findById(set[p]);
      protein.uses = [...protein.uses, dishID];
      await protein.save();
    }
    break;
  case 'SPICE':
    await removeUsage('SPICE', dishID);
    for(let s = 0; s < set.length; s++) {
      const spice = await Ingredient.findById(set[s]);
      spice.uses = [...spice.uses, dishID];
      await spice.save();
    }
    break;
  default:
    break;
  }
};
const removeUsage = async (type, dishID) => {
  let set;
  switch (type) {
  case 'CARB':
    set = await Ingredient.find({ uses: dishID });
    await set.forEach(c => {
      c.uses = c.uses.filter(u => {
        return u !== dishID;
      });
      c.save();
    });
    break;
  case 'METHOD':
    set = await CookingMethod.find({ uses: dishID });
    await set.forEach(m => {
      m.uses = m.uses.filter(u => {
        return u !== dishID;
      });
      m.save();
    });
    break;
  case 'PROTEIN':
    set = await Ingredient.find({ uses: dishID });
    await set.forEach(p => {
      p.uses = p.uses.filter(u => {
        return u !== dishID;
      });
      p.save();
    });
    break;
  case 'SPICE':
    set = await Ingredient.find({ uses: dishID });
    await set.forEach(s => {
      s.uses = s.uses.filter(u => {
        return u !== dishID;
      });
      s.save();
    });
    break;
  default:
    break;
  }
};
const dishRemover = async (dishID) => {
  await removeUsage('CARB', dishID);
  await removeUsage('METHOD', dishID);
  await removeUsage('PROTEIN', dishID);
  await removeUsage('SPICE', dishID);
  await removeUsage('NOTE', dishID);
  await Dish.findByIdAndRemove(dishID);
};

// removes documents & references from other documents or nullifies them
const dependencyRemover = async (type, id) => {
  const nullUser = await User.findOne({ username: 'null' });
  let dishes;
  let lists;
  let carbs;
  let methods;
  let proteins;
  let spices;
  let groups;
  let tasks;
  let comments;
  switch (type) {
  case 'CARB':
    dishes = await Dish.find({ carbs: id });
    dishes.forEach(d => {
      d.carbs = d.carbs.filter(c => {
        return c !== id;
      });
      d.save();
    });
    await Ingredient.findByIdAndDelete(id);
    break;
  case 'METHOD':
    dishes = await Dish.find({ methods: id });
    dishes.forEach(d => {
      d.methods = d.methods.filter(m => {
        return m !== id;
      });
      d.save();
    });
    await CookingMethod.findByIdAndDelete(id);
    break;
  case 'PROTEIN':
    dishes = await Dish.find({ proteins: id });
    dishes.forEach(d => {
      d.proteins = d.proteins.filter(p => {
        return p !== id;
      });
      d.save();
    });
    await Ingredient.findByIdAndDelete(id);
    break;
  case 'SPICE':
    dishes = await Dish.find({ spices: id });
    dishes.forEach(d => {
      d.spices = d.spices.filter(s => {
        return s !== id;
      });
      d.save();
    });
    await Ingredient.findByIdAndDelete(id);
    break;
  case 'LIST_PRIVATE':
    await PrivateList.findByIdAndDelete(id);
    await Task.find({ listID: id }).deleteMany();
    await Comment.find({ listID: id }).deleteMany();
    break;
  case 'LIST_GROUP':
    await GroupList.findByIdAndDelete(id);
    await Task.find({ listID: id }).deleteMany();
    await Comment.find({ listID: id }).deleteMany();
    break;
  case 'GROUP':
    await Group.findByIdAndDelete(id);
    lists = await GroupList.find({ group: id });
    await lists.forEach(l => Task.find({ listID: l._id }).deleteMany());
    await lists.forEach(l => l.delete());
    break;
  case 'USER':
    /* user removal triggers following:
        - user removal
        - user lists removal -> lists tasks removal
        - all user created contents 'addedBy' & 'creator' changed to 'null'
      */
    await User.findByIdAndDelete(id);
    lists = await PrivateList.find({ owner: id });
    await lists.forEach(l => Task.find({ listID: l._id }).deleteMany());
    await lists.forEach(l => l.delete());
    // nullification starts . . .
    groups = await Group.find({ creator: id });
    await groups.forEach(g => {
      g.creator = nullUser._id;
      g.save();
    });
    carbs = await Ingredient.find({ type: 'carb', addedBy: id });
    await carbs.forEach(c => {
      c.addedBy = nullUser._id;
      c.save();
    });
    methods = await CookingMethod.find({ addedBy: id });
    await methods.forEach(m => {
      m.addedBy = nullUser._id;
      m.save();
    });
    dishes = await Dish.find({ addedBy: id });
    await dishes.forEach(d => {
      d.addedBy = nullUser._id;
      d.save();
    });
    proteins = await Ingredient.find({ type: 'protein', addedBy: id });
    await proteins.forEach(p => {
      p.addedBy = nullUser._id;
      p.save();
    });
    spices = await Ingredient.find({ type: 'spice', addedBy: id });
    await spices.forEach(s => {
      s.addedBy = nullUser._id;
      s.save();
    });
    tasks = await Task.find({ creator: id });
    await tasks.forEach(t => {
      t.creator = nullUser._id;
      t.save();
    });
    comments = await Comment.find({ addedBy: id });
    await comments.forEach(c => {
      c.addedBy = nullUser._id;
      c.save();
    });
    break;
  default:
    break;
  }
};

// user creation - password hashing
const hash = (password) => {
  return bcrypt.hash(password, 10);
};

// resolvers for application, first custom type, then Query, Mutation, Subscription
const resolvers = {
  Ingredient: {
    type: (root) => root.type,
    name: (root) => root.name,
    uses: (root) => root.uses,
    addedBy: (root) => root.addedBy,
    id: (root) => root._id
  },
  Comment: {
    comment: (root) => root.comment,
    karma: (root) => root.karma,
    addedBy: (root) => root.addedBy,
    listID: (root) => root.listID,
    id: (root) => root._id
  },
  CookingMethod: {
    name: (root) => root.name,
    uses: (root) => root.uses,
    addedBy: (root) => root.addedBy,
    id: (root) => root._id
  },
  Dish: {
    name: (root) => root.name,
    cookingMethods: (root) => root.cookingMethods,
    proteins: (root) => root.proteins,
    carbs: (root) => root.carbs,
    spices: (root) => root.spices,
    karma: (root) => root.karma,
    note: (root) => root.note,
    addedBy: (root) => root.addedBy,
    id: (root) => root._id
  },
  Group: {
    title: (root) => root.title,
    active: (root) => root.active,
    removable: (root) => root.removable,
    creator: (root) => root.creator,
    id: (root) => root._id
  },
  GroupList: {
    title: (root) => root.title,
    listType: (root) => root.listType,
    removable: (root) => root.removable,
    group: (root) => root.group,
    id: (root) => root._id
  },
  PrivateList: {
    title: (root) => root.title,
    listType: (root) => root.listType,
    removable: (root) => root.removable,
    owner: (root) => root.owner,
    id: (root) => root._id
  },
  Task: {
    task: (root) => root.task,
    active: (root) => root.active,
    creator: (root) => root.creator,
    listID: (root) => root.listID,
    id: (root) => root._id
  },
  User: {
    username: (root) => root.username,
    passwordHash: (root) => root.passwordHash,
    active: (root) => root.active,
    removable: (root) => root.removable,
    role: (root) => root.role,
    groups: (root) => root.groups,
    id: (root) => root._id,
    stops: (root) => root.stops
  },
  Query: {
    me: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      return User.findById(decodedToken.id);
    },
    userCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        return User.collection.countDocuments();
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    users: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        return await findUsers(args);
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    groupCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user && (user.role === 'admin' || user.role === 'owner')) {
        return Group.collection.countDocuments();
      } else if (user) {
        return user.groups.length;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    groups: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return await findGroups({ all: false, groups: user.groups });
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    allGroups: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        return await findGroups({ all: true });
      } else if (user) {
        return await findGroups({ all: false, groups: user.groups });
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    listCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return await countLists({ ...args, all: false }, user);
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    allListCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        return await countLists({ ...args, all: true }, { ...user });
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    privateLists: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return await PrivateList.find({ owner: user._id }).populate('owner');
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    groupLists: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let lists = [];
        for (let g = 0; g < user.groups.length; g++) {
          const gl = await GroupList.find({ group: user.groups[g] }).populate('group');
          lists = [...lists, ...gl];
        }
        return lists;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    taskCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        if (args.countType === 'user') return await countTasks({ ...args, all: false, userID: user._id.toString() });
        if (args.countType === 'group') return await countTasks({ ...args, all: false, groupIDs: user.groups.map(g => g.toString()) });
        if (args.countType === 'total') return await countTasks({ ...args, all: false, userID: user._id.toString(), groupIDs: user.groups.map(g => g.toString()) });
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    allTaskCount: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        return await countTasks({ ...args, all: true });
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    tasks: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return await findTasks(args.listID);
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    carbCount: async () => await Ingredient.find({ type: 'carb' }).countDocuments(),
    allCarbs: async () => await Ingredient.find({ type: 'carb' }).populate('addedBy'),
    dishCount: async () => await Dish.collection.countDocuments(),
    allDishes: async () => await Dish.find({}).populate(dishFields),
    methodCount: async () => await CookingMethod.collection.countDocuments(),
    allMethods: async () => await CookingMethod.find({}).populate('addedBy'),
    proteinCount: async () => await Ingredient.find({ type: 'protein' }).countDocuments(),
    allProteins: async () => await Ingredient.find({ type: 'protein' }).populate('addedBy'),
    spiceCount: async () => await Ingredient.find({ type: 'spice' }).countDocuments(),
    allSpices: async () => await Ingredient.find({ type: 'spice' }).populate('addedBy'),
    dishes: async (root, args) => await findDishes(args),
    comments: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        return await Comment.find({ listID: args.id }).populate('addedBy');
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    }
  },
  Mutation: {
    addIngredient: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let ingredient = new Ingredient({
          type: args.type,
          name: args.name,
          uses: [],
          addedBy: user._id.toString()
        });
        try {
          ingredient = await ingredient.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('INGREDIENT_ADDED', { ingredientEvent: ingredient });
        return ingredient;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeIngredient: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        const ingredient = await Ingredient.findById(args.id);
        try {
          await dependencyRemover(ingredient.type, args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('INGREDIENT_REMOVED', { ingredientEvent: ingredient });
        return ingredient;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    addDish: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let dish = new Dish({
          name: args.name,
          cookingMethods: args.cookingMethods,
          carbs: args.carbs,
          proteins: args.proteins,
          spices: args.spices,
          karma: 0,
          note: args.note,
          addedBy: user._id.toString()
        });
        try {
          await dish.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('DISH_ADDED', { dishEvent: dish });
        dish = await Dish.findOne({ name: args.name }).populate(dishFields);
        return dish;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    updateDish: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let dish = await Dish.findById(args.id);
        if (args.name) dish.name = args.name;
        if (args.carbs) dish.carbs = args.carbs;
        if (args.methods) dish.cookingMethods = args.methods;
        if (args.proteins) dish.proteins = args.proteins;
        if (args.spices) dish.spices = args.spices;
        if (args.karma) dish.karma = args.karma;
        if (args.note) dish.note = args.note;
        try {
          await dish.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        if (args.carbs) await updateUsage(args.id, 'CARB', args.carbs);
        if (args.methods) await updateUsage(args.id, 'METHOD', args.methods);
        if (args.proteins) await updateUsage(args.id, 'PROTEIN', args.proteins);
        if (args.spices) await updateUsage(args.id, 'SPICE', args.spices);
        dish = await Dish.findOne({ _id: args.id }).populate(dishFields);
        await pubsub.publish('DISH_UPDATED', { dishEvent: dish });
        return dish;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeDish: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        const dish = await Dish.findById(args.id).populate(dishFields);
        try {
          await dishRemover(args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('DISH_REMOVED', { dishEvent: dish });
        return dish;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    dishKarma: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let dish = await Dish.findById(args.id);
        if (args.vote === 'up') dish.karma += 1;
        if (args.vote === 'down') dish.karma -= 1;
        try {
          await dish.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        dish = await Dish.findOne({ _id: args.id }).populate(dishFields);
        await pubsub.publish('DISH_VOTED', { dishEvent: dish });
        return dish;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    addMethod: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let method = new CookingMethod({
          name: args.name,
          uses: [],
          addedBy: user._id.toString()
        });
        try {
          method = await method.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('METHOD_ADDED', { methodEvent: method });
        return method;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeMethod: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        const method = await CookingMethod.findById(args.id);
        try {
          await dependencyRemover('METHOD', args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('METHOD_REMOVED', { methodEvent: method });
        return method;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    addListGroup: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let list = new GroupList({
          title: args.title,
          removable: true,
          group: args.group
        });
        try {
          await list.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        list = await GroupList.findOne({ title: args.title }).populate('group');
        await pubsub.publish('LIST_ADDED_G', { listEventGroup: list });
        return list;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeListGroup: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        const list = await GroupList.findById(args.id);
        try {
          await dependencyRemover('LIST_GROUP', args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('LIST_REMOVED_G', { listEventGroup: list });
        return list;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    addListPrivate: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let list = new PrivateList({
          title: args.title,
          removable: true,
          owner: user._id.toString()
        });
        try {
          await list.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        list = await PrivateList.findOne({ title: args.title }).populate('owner');
        await pubsub.publish('LIST_ADDED_P', { listEventPrivate: list });
        return list;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeListPrivate: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        const list = await PrivateList.findById(args.id).populate('owner');
        if (list.owner.username === user.username) {
          try {
            await dependencyRemover('LIST_PRIVATE', args.id);
          } catch (e) {
            throw new UserInputError(e.message, { invalidArgs: args });
          }
          await pubsub.publish('LIST_REMOVED_P', { listEventPrivate: list });
          return list;
        } else {
          throw new AuthenticationError('Insufficient clearance!');
        }
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    addComment: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let comment = new Comment({
          comment: args.comment,
          karma: 0,
          addedBy: user._id.toString(),
          listID: args.listID
        });
        try {
          await comment.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        comment = await Comment.findOne({ comment: args.comment }).populate('addedBy');
        return comment;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeComment: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'owner' || user.role === 'admin') {
        const comment = await Comment.findById(args.id).populate('addedBy');
        try {
          await comment.remove();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        return comment;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    voteComment: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let comment = await Comment.findById(args.id);
        args.vote === 'up' ? comment.karma += 1 : comment.karma -= 1;
        try {
          await comment.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        comment = await Comment.findOne({ _id: args.id }).populate('addedBy');
        return comment;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    addTask: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let task = new Task({
          task: args.task,
          priority: args.priority,
          active: true,
          creator: user._id,
          listID: args.listID
        });
        try {
          await task.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        task = await Task.findOne({ task: args.task }).populate('creator');
        await pubsub.publish('TASK_ADDED', { taskEvent: task });
        return task;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeTask: async (root, args) => {
      let list;
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      const task = await Task.findById(args.id).populate('creator');
      const groupValid = async () => {
        list = await GroupList.findOne({ _id: task.listID.toString() });
        return list ? user.groups.includes(list.group.toString()) : false;
      };
      const userValid = async () => {
        list = await PrivateList.findOne({ _id: task.listID.toString() });
        return list ? user._id.toString() === list.owner.toString() : false;
      };
      if (await groupValid() || await userValid()) {
        try {
          await task.remove();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('TASK_REMOVED', { taskEvent: task });
        return task;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    taskPriority: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let task = await Task.findById(args.id);
        task.priority = args.priority;
        try {
          await task.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        task = await Task.findOne({ _id: args.id }).populate('creator');
        await pubsub.publish('TASK_UPDATED', { taskEvent: task });
        return task;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    taskActivation: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let task = await Task.findById(args.id);
        task.active = true;
        try {
          await task.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        task = await Task.findOne({ _id: args.id }).populate('creator');
        await pubsub.publish('TASK_UPDATED', { taskEvent: task });
        return task;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    taskDeactivation: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let task = await Task.findById(args.id);
        task.active = false;
        try {
          await task.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        task = await Task.findOne({ _id: args.id }).populate('creator');
        await pubsub.publish('TASK_UPDATED', { taskEvent: task });
        return task;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    addUser: async (root, args) => {
      let newUser = new User({
        username: args.username,
        passwordHash: await hash(args.password),
        active: true,
        removable: true,
        role: 'user',
        groups: []
      });
      try {
        newUser = await newUser.save();
      } catch (e) {
        throw new UserInputError(e.message, { invalidArgs: args });
      }
      await pubsub.publish('USER_ADDED', { userEvent: newUser });
      return newUser;
    },
    updateUser: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      let user = await User.findById(decodedToken.id);
      const correctPassword = await bcrypt.compare(args.password, user.passwordHash);
      if (user && correctPassword) {
        if (args.newPassword) {
          user.passwordHash = await hash(args.newPassword);
        }
        if (args.newUsername) {
          user.username = args.newUsername;
        }
        try {
          await user.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('USER_UPDATED', { userEvent: user });
        return user;
      } else {
        throw new AuthenticationError('Invalid authentication!');
      }
    },
    removeUser: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'owner' || user.role === 'admin') {
        const userToRemove = await User.findById(args.id);
        try {
          await dependencyRemover('USER', args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('USER_REMOVED', { userEvent: userToRemove });
        await pubsub.publish('MAJOR_DBE', { majorDBE: true });
        return userToRemove;
      } else if (user) {
        const userToRemove = await User.findById(args.id);
        const correctPassword = !userToRemove
          ? false
          : await bcrypt.compare(args.password, userToRemove.passwordHash);
        if (!correctPassword) {
          throw new AuthenticationError('Insufficient clearance!');
        } else {
          try {
            await dependencyRemover('USER', args.id);
          } catch (e) {
            throw new UserInputError(e.message, { invalidArgs: args });
          }
          await pubsub.publish('USER_REMOVED', { userEvent: userToRemove });
          await pubsub.publish('USER_DBE', { majorDBE: true });
          return userToRemove;
        }
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    activateUser: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'owner' || user.role === 'admin') {
        let userToActivate = await User.findById(args.id);
        try {
          userToActivate.active = true;
          await userToActivate.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        userToActivate = await User.findById(args.id);
        return userToActivate;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    deactivateUser: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'owner' || user.role === 'admin' || user._id.toString() === args.id) {
        let userToDeactivate = await User.findById(args.id);
        try {
          userToDeactivate.active = true;
          await userToDeactivate.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        userToDeactivate = await User.findById(args.id);
        return userToDeactivate;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    addStop: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      let user = await User.findById(decodedToken.id);
      if (user) {
        user.stops = [...user.stops, args.stop];
        try {
          await user.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('USER_UPDATED', { userEvent: user });
        return user;
      } else {
        throw new AuthenticationError('You must be logged in!');
      }
    },
    removeStop: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      let user = await User.findById(decodedToken.id);
      if (user) {
        user.stops = user.stops.filter(s => {
          if (s !== args.stop) return s;
        });
        try {
          await user.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('USER_UPDATED', { userEvent: user });
        return user;
      } else {
        throw new AuthenticationError('You must be logged in!');
      }
    },
    addGroup: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let newGroup = new Group({
          title: args.title,
          active: true,
          removable: true,
          creator: user._id
        });
        try {
          await newGroup.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        newGroup = await Group.findOne({ title: args.title }).populate('creator');
        user.groups = [...user.groups, newGroup._id.toString()];
        await user.save();
        await pubsub.publish('GROUP_ADDED', { groupEvent: newGroup });
        return newGroup;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    updateGroup: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user) {
        let group = await Group.findById(args.id).populate('creator');
        if (args.title) group.title = args.title;
        if (args.active) group.active = args.active;
        try {
          group = await group.save();
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('GROUP_UPDATED', { groupEvent: group });
        return group;
      } else {
        throw new AuthenticationError('Session error: you must be logged in!');
      }
    },
    removeGroup: async (root, args) => {
      const decodedToken = await jwt.verify(args.token, config.secret);
      const user = await User.findById(decodedToken.id);
      if (user.role === 'admin' || user.role === 'owner') {
        const group = await Group.findById(args.id);
        try {
          await dependencyRemover('GROUP', args.id);
        } catch (e) {
          throw new UserInputError(e.message, { invalidArgs: args });
        }
        await pubsub.publish('GROUP_REMOVED', { groupEvent: group });
        await pubsub.publish('GROUP_DBE', { majorDBE: true });
        return group;
      } else {
        throw new AuthenticationError('Insufficient clearance!');
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      const correctPassword = !user
        ? false
        : await bcrypt.compare(args.password, user.passwordHash);
      if (user && correctPassword) {
        return { value: `Bearer ${jwt.sign({ username: user.username, id: user._id }, config.secret)}` };
      }
      throw new AuthenticationError('Incorrect username or password!');
    }
  },
  Subscription: {
    ingredientEvent: {
      subscribe: () => pubsub.asyncIterator(['INGREDIENT_ADDED', 'INGREDIENT_REMOVED'])
    },
    dishEvent: {
      subscribe: () => pubsub.asyncIterator(['DISH_ADDED', 'DISH_REMOVED', 'DISH_UPDATED', 'DISH_VOTED'])
    },
    methodEvent: {
      subscribe: () => pubsub.asyncIterator(['METHOD_ADDED', 'METHOD_REMOVED'])
    },
    listEventGroup: {
      subscribe: () => pubsub.asyncIterator(['LIST_ADDED_G', 'LIST_REMOVED_G'])
    },
    listEventPrivate: {
      subscribe: () => pubsub.asyncIterator(['LIST_ADDED_P', 'LIST_REMOVED_P'])
    },
    taskEvent: {
      subscribe: () => pubsub.asyncIterator(['TASK_ADDED', 'TASK_REMOVED', 'TASK_UPDATED'])
    },
    userEvent: {
      subscribe: () => pubsub.asyncIterator(['USER_ADDED', 'USER_REMOVED', 'USER_UPDATED'])
    },
    groupEvent: {
      subscribe: () => pubsub.asyncIterator(['GROUP_ADDED', 'GROUP_REMOVED', 'GROUP_UPDATED'])
    },
    majorDBE: {
      subscribe: () => pubsub.asyncIterator(['GROUP_DBE', 'USER_DBE'])
    }
  }
};

module.exports = { resolvers };
