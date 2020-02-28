// Dishy.js | application on demosite.

// IMPORTS
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useApolloClient, useQuery, useSubscription} from '@apollo/react-hooks';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/forms.css';
import '../core/style/elements.css';

import {ALL_CARBS} from '../core/graphql/rff/queries/q_allCarbs';
import {ALL_PROTEINS} from '../core/graphql/rff/queries/q_allProteins';
import {ALL_SPICES} from '../core/graphql/rff/queries/q_allSpices';
import {ALL_METHODS} from '../core/graphql/rff/queries/q_allMethods';
import {ALL_DISHES} from '../core/graphql/rff/queries/q_allDishes';
import {ADD_METHOD} from '../core/graphql/rff/mutations/m_addMethod';
import {ADD_INGREDIENT} from '../core/graphql/rff/mutations/m_addIngredient';
import {ADD_DISH} from '../core/graphql/rff/mutations/m_addDish';
import {DISH_ADDED} from '../core/graphql/rff/subscriptions/s_dishAdded';
import {DISH_UPDATED} from '../core/graphql/rff/subscriptions/s_dishUpdated';
import {DISH_REMOVED} from '../core/graphql/rff/subscriptions/s_dishRemoved';
import {DISH_VOTED} from '../core/graphql/rff/subscriptions/s_dishVoted';
import {INGREDIENT_ADDED} from '../core/graphql/rff/subscriptions/s_ingredientAdded';
import {INGREDIENT_UPDATED} from '../core/graphql/rff/subscriptions/s_ingredientUpdated';
import {INGREDIENT_REMOVED} from '../core/graphql/rff/subscriptions/s_ingredientRemoved';
import {METHOD_ADDED} from '../core/graphql/rff/subscriptions/s_methodAdded';
import {METHOD_UPDATED} from '../core/graphql/rff/subscriptions/s_methodUpdated';
import {METHOD_REMOVED} from '../core/graphql/rff/subscriptions/s_methodRemoved';

import {handleInfo, handleError} from '../core/store/reducers/AppReducer';
import {initDish, resetDish, addDishCarb, addDishProtein, addDishSpice,
  addDishMethod} from '../core/store/reducers/DishyReducer';

// prop mapper. maps imported state from store to usable props.
const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    dishyState: state.dishyState,
    user: state.loginState.user
  };
};

// prop mapper. maps imported functions from store to usable props.
const mapDispatchToProps = {
  initDish, resetDish, addDishCarb, addDishProtein, addDishSpice, addDishMethod,
  handleInfo, handleError
};

// Dishy. application for site.
const Dishy = (props) => {
  const client = useApolloClient();
  const carbResults = useQuery(ALL_CARBS);
  const proteinResults = useQuery(ALL_PROTEINS);
  const spiceResults = useQuery(ALL_SPICES);
  const methodResults = useQuery(ALL_METHODS);
  const dishResults = useQuery(ALL_DISHES);

  useSubscription(DISH_ADDED, {
    fetchPolicy: '',
    onSubscriptionData: ({subscriptionData}) => {
      const dish = subscriptionData.data.dishAdded;
      updateCacheWithDish('added', dish);
    }
  });
  useSubscription(DISH_UPDATED, {
    onSubscriptionData: ({subscriptionData}) => {
      const dish = subscriptionData.data.dishUpdated;
      updateCacheWithDish('updated', dish);
    }
  });
  useSubscription(DISH_VOTED, {
    onSubscriptionData: ({subscriptionData}) => {
      const dish = subscriptionData.data.dishVoted;
      updateCacheWithDish('updated', dish);
    }
  });
  useSubscription(DISH_REMOVED, {
    onSubscriptionData: ({subscriptionData}) => {
      const dish = subscriptionData.data.dishRemoved;
      updateCacheWithDish('removed', dish);
    }
  });
  useSubscription(INGREDIENT_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const ingredient = subscriptionData.data.ingredientAdded;
      switch (ingredient.type) {
      case 'carb':
        updateCacheWithCarb('added', ingredient);
        break;
      case 'protein':
        updateCacheWithProtein('added', ingredient);
        break;
      case 'spice':
        updateCacheWithSpice('added', ingredient);
        break;
      default:
        break;
      }
    }
  });
  useSubscription(INGREDIENT_UPDATED, {
    onSubscriptionData: ({subscriptionData}) => {
      const ingredient = subscriptionData.data.ingredientUpdated;
      switch (ingredient.type) {
      case 'carb':
        updateCacheWithCarb('updated', ingredient);
        break;
      case 'protein':
        updateCacheWithProtein('updated', ingredient);
        break;
      case 'spice':
        updateCacheWithSpice('updated', ingredient);
        break;
      default:
        break;
      }
    }
  });
  useSubscription(INGREDIENT_REMOVED, {
    onSubscriptionData: ({subscriptionData}) => {
      const ingredient = subscriptionData.data.ingredientAdded;
      switch (ingredient.type) {
      case 'carb':
        updateCacheWithCarb('removed', ingredient);
        break;
      case 'protein':
        updateCacheWithProtein('removed', ingredient);
        break;
      case 'spice':
        updateCacheWithSpice('removed', ingredient);
        break;
      default:
        break;
      }
    }
  });
  useSubscription(METHOD_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const method = subscriptionData.data.methodAdded;
      updateCacheWithMethod('added', method);
    }
  });
  useSubscription(METHOD_UPDATED, {
    onSubscriptionData: ({subscriptionData}) => {
      const method = subscriptionData.data.methodUpdated;
      updateCacheWithMethod('updated', method);
    }
  });
  useSubscription(METHOD_REMOVED, {
    onSubscriptionData: ({subscriptionData}) => {
      const method = subscriptionData.data.methodRemoved;
      updateCacheWithMethod('removed', method);
    }
  });

  // helper functions for subscriptions
  const updateCacheWithCarb = (eventType, carb) => {
    const includedIn = (set, object) => set.map(c => c.id).includes(object.id);
    const dataInStore = client.readQuery({query: ALL_CARBS});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allCarbs, carb)) {
        client.writeQuery({
          query: ALL_CARBS,
          data: {allCarbs: dataInStore.allCarbs.concat(carb)}
        });
        props.handleInfo(`Carb added: ${carb.name}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allCarbs, carb)) {
        client.writeQuery({
          query: ALL_CARBS,
          data: {
            allCarbs: dataInStore.allCarbs.map(c => {
              return c.id === carb.id ? carb : c;
            })}
        });
        props.handleInfo(`Carb updated: ${carb.name}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.allCarbs, carb)) {
        client.writeQuery({
          query: ALL_CARBS,
          data: {
            allCarbs: dataInStore.allCarbs.forEach(c => {
              if (c.id !== carb.id) return c;
            })}
        });
        props.handleInfo(`Carb removed: ${carb.name}`);
      }
      break;
    default:
      break;
    }
  };
  const updateCacheWithProtein = (eventType, protein) => {
    const includedIn = (set, object) => set.map(p => p.id).includes(object.id);
    const dataInStore = client.readQuery({query: ALL_PROTEINS});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allProteins, protein)) {
        client.writeQuery({
          query: ALL_PROTEINS,
          data: {allProteins: dataInStore.allProteins.concat(protein)}
        });
        props.handleInfo(`Protein added: ${protein.name}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allProteins, protein)) {
        client.writeQuery({
          query: ALL_PROTEINS,
          data: {
            allProteins: dataInStore.allProteins.map(p => {
              return p.id === protein.id ? protein : p;
            })}
        });
        props.handleInfo(`Protein updated: ${protein.name}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.allProteins, protein)) {
        client.writeQuery({
          query: ALL_PROTEINS,
          data: {
            allProteins: dataInStore.allProteins.forEach(p => {
              if (p.id !== protein.id) return p;
            })}
        });
        props.handleInfo(`Protein removed: ${protein.name}`);
      }
      break;
    default:
      break;
    }
  };
  const updateCacheWithSpice = (eventType, spice) => {
    const includedIn = (set, object) => set.map(s => s.id).includes(object.id);
    const dataInStore = client.readQuery({query: ALL_SPICES});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allSpices, spice)) {
        client.writeQuery({
          query: ALL_SPICES,
          data: {allSpices: dataInStore.allSpices.concat(spice)}
        });
        props.handleInfo(`Spice added: ${spice.name}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allSpices, spice)) {
        client.writeQuery({
          query: ALL_SPICES,
          data: {
            allSpices: dataInStore.allSpices.map(s => {
              return s.id === spice.id ? spice : s;
            })}
        });
        props.handleInfo(`Spice updated: ${spice.name}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.allSpices, spice)) {
        client.writeQuery({
          query: ALL_SPICES,
          data: {
            allSpices: dataInStore.allSpices.forEach(s => {
              if (s.id !== spice.id) return s;
            })}
        });
        props.handleInfo(`Spice removed: ${spice.name}`);
      }
      break;
    default:
      break;
    }
  };
  const updateCacheWithMethod = (eventType, method) => {
    const includedIn = (set, object) => set.map(m => m.id).includes(object.id);
    const dataInStore = client.readQuery({query: ALL_METHODS});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allMethods, method)) {
        client.writeQuery({
          query: ALL_METHODS,
          data: {allMethods: dataInStore.allMethods.concat(method)}
        });
        props.handleInfo(`Method added: ${method.name}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allMethods, method)) {
        client.writeQuery({
          query: ALL_METHODS,
          data: {
            allMethods: dataInStore.allMethods.map(m => {
              return m.id === method.id ? method : m;
            })}
        });
        props.handleInfo(`Method updated: ${method.name}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.allMethods, method)) {
        client.writeQuery({
          query: ALL_METHODS,
          data: {
            allMethods: dataInStore.allMethods.forEach(m => {
              if (m.id !== method.id) return m;
            })}
        });
        props.handleInfo(`Method removed: ${method.name}`);
      }
      break;
    default:
      break;
    }
  };
  const updateCacheWithDish = (eventType, dish) => {
    const includedIn = (set, object) => set.map(d => d.id).includes(object.id);
    const dataInStore = client.readQuery({query: ALL_DISHES});

    switch (eventType) {
    case 'added':
      if (!includedIn(dataInStore.allDishes, dish)) {
        client.writeQuery({
          query: ALL_DISHES,
          data: {allDishes: dataInStore.allDishes.concat(dish)}
        });
        props.handleInfo(`Dish added: ${dish.name}`);
      }
      break;
    case 'updated':
      if (includedIn(dataInStore.allDishes, dish)) {
        client.writeQuery({
          query: ALL_DISHES,
          data: {
            allDishes: dataInStore.allDishes.map(d => {
              return d.id === dish.id ? dish : d;
            })}
        });
        props.handleInfo(`Dish updated: ${dish.name}`);
      }
      break;
    case 'removed':
      if (includedIn(dataInStore.allDishes, dish)) {
        client.writeQuery({
          query: ALL_DISHES,
          data: {
            allDishes: dataInStore.allDishes.forEach(d => {
              if (d.id !== dish.id) return d;
            })}
        });
        props.handleInfo(`Dish removed: ${dish.name}`);
      }
      break;
    default:
      break;
    }
  };

  // subcomponent. shown when GraphQL query/mutation property 'loading' is set.
  const Loading = () => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      </div>
    );
  };
  // subcomponent. shown when GraphQL query/mutation property 'loading' is set.
  const Error = () => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      </div>
    );
  };
  // subcomponent. shown when GraphQL query/mutation property 'data' is set but has no information.
  const Empty = ({type}) => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>no {type} available</p>
        </div>
      </div>
    );
  };

  // helper function to add ingredients or methods to new dish.
  // checks whether or not instance of component has been added already before adding to list.
  function handleAddComponent(event, component, type) {
    event.preventDefault();
    const {newDishCarbs, newDishProteins, newDishSpices, newDishMethods} = props.dishyState;
    if (!props.dishyState.newDish) {
      props.initDish();
    }
    switch (type) {
    case 'carb':
      if (!newDishCarbs.filter(c => c.id === component.id).length > 0) props.addDishCarb(component);
      break;
    case 'protein':
      if (!newDishProteins.filter(p => p.id === component.id).length > 0) props.addDishProtein(component);
      break;
    case 'spice':
      if (!newDishSpices.filter(s => s.id === component.id).length > 0) props.addDishSpice(component);
      break;
    case 'method':
      if (!newDishMethods.filter(m => m.id === component.id).length > 0) props.addDishMethod(component);
      break;
    default:
      break;
    }
  }

  // subcomponent. renders selector for found carbs & selected carb information.
  const Carbs = () => {
    const [selection, setSelection] = useState(null);
    if (carbResults.loading) {
      return <Loading/>;
    } else if (carbResults.data && carbResults.data.allCarbs) {
      const resultCount = carbResults.data.allCarbs.length;
      if (resultCount > 0) {
        return (
          <div id='carbSection' className='componentContainer'>
            <div className='dish'>
              <select id='carbSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
                onChange={({target}) => setSelection(JSON.parse(target.value))}>
                <option key='default' value='default' disabled>carbs</option>
                {carbResults.data.allCarbs.map((c) => <option key={c.id} value={JSON.stringify(c)}>{c.name}</option>)}
              </select>
              {selection && <div className='componentContainer'>
                <Component id='selectedCarb' type='carb' component={selection}/>
                {props.show === 'advanced' &&
                <button className={classProvider(props.theme, 'activator')}
                  onClick={(event) => handleAddComponent(event, selection, 'carb')}>add to new dish</button>}
              </div>}
            </div>
          </div>
        );
      } else {
        return <Empty type='carbs'/>;
      }
    } else {
      return <Error/>;
    }
  };
  // subcomponent. renders selector for found proteins & selected protein information.
  const Proteins = () => {
    const [selection, setSelection] = useState(null);
    if (proteinResults.loading) {
      return <Loading/>;
    } else if (proteinResults.data && proteinResults.data.allProteins) {
      const resultCount = proteinResults.data.allProteins.length;
      if (resultCount > 0) {
        return (
          <div id='proteinSection' className='componentContainer'>
            <div className='dish'>
              <select id='proteinSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
                onChange={({target}) => setSelection(JSON.parse(target.value))}>
                <option key='default' value='default' disabled>proteins</option>
                {proteinResults.data.allProteins.map((p) => <option key={p.id} value={JSON.stringify(p)}>{p.name}</option>)}
              </select>
              {selection && <div className='componentContainer'>
                <Component id='selectedProtein' type='protein' component={selection}/>
                {props.show === 'advanced' &&
                <button className={classProvider(props.theme, 'activator')}
                  onClick={(event) => handleAddComponent(event, selection, 'protein')}>add to new dish</button>}
              </div>}
            </div>
          </div>
        );
      } else {
        return <Empty type='proteins'/>;
      }
    } else {
      return <Error/>;
    }
  };
  // subcomponent. renders selector for found spices & selected spice information.
  const Spices = () => {
    const [selection, setSelection] = useState(null);
    if (spiceResults.loading) {
      return <Loading/>;
    } else if (spiceResults.data && spiceResults.data.allSpices) {
      const resultCount = spiceResults.data.allSpices.length;
      if (resultCount > 0) {
        return (
          <div id='spiceSection' className='componentContainer'>
            <div className='dish'>
              <select id='spiceSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
                onChange={({target}) => setSelection(JSON.parse(target.value))}>
                <option key='default' value='default' disabled>spices</option>
                {spiceResults.data.allSpices.map((s) => <option key={s.id} value={JSON.stringify(s)}>{s.name}</option>)}
              </select>
              {selection && <div className='componentContainer'>
                <Component id='selectedSpice' type='spice' component={selection}/>
                {props.show === 'advanced' &&
                <button className={classProvider(props.theme, 'activator')}
                  onClick={(event) => handleAddComponent(event, selection, 'spice')}>add to new dish</button>}
              </div>}
            </div>
          </div>
        );
      } else {
        return <Empty type='spices'/>;
      }
    } else {
      return <Error/>;
    }
  };
  // subcomponent. renders selector for found cooking methods & selected method information.
  const Methods = () => {
    const [selection, setSelection] = useState(null);
    if (methodResults.loading) {
      return <Loading/>;
    } else if (methodResults.data && methodResults.data.allMethods) {
      const resultCount = methodResults.data.allMethods.length;
      if (resultCount > 0) {
        return (
          <div id='methodSection' className='componentContainer'>
            <div className='dish'>
              <select id='methodSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
                onChange={({target}) => setSelection(JSON.parse(target.value))}>
                <option key='default' value='default' disabled>cooking methods</option>
                {methodResults.data.allMethods.map((m) => <option key={m.id} value={JSON.stringify(m)}>{m.name}</option>)}
              </select>
              {selection && <div className='componentContainer'>
                <Component id='selectedMethod' type='method' component={selection}/>
                {props.show === 'advanced' &&
                <button className={classProvider(props.theme, 'activator')}
                  onClick={(event) => handleAddComponent(event, selection, 'method')}>add to new dish</button>}
              </div>}
            </div>
          </div>
        );
      } else {
        return <Empty type='cooking methods'/>;
      }
    } else {
      return <Error/>;
    }
  };
  // subcomponent. renders selector for found dishes & selected dish information.
  const Dishes = () => {
    const [selection, setSelection] = useState(null);
    if (dishResults.loading) {
      return <Loading/>;
    } else if (dishResults.data && dishResults.data.allDishes) {
      const resultCount = dishResults.data.allDishes.length;
      if (resultCount === 0) {
        return <Empty type='dishes'/>;
      } else {
        return (
          <div id='dishSection' className='componentContainer'>
            <div className='dish'>
              <select id='dishSelector' defaultValue='default' className={classProvider(props.theme, 'formElement')}
                onChange={({target}) => setSelection(JSON.parse(target.value))}>
                <option key='default' value='default' disabled>dishes</option>
                {dishResults.data.allDishes.map((d) => <option key={d.id} value={JSON.stringify(d)}>{d.name}</option>)}
              </select>
              {selection && <div className='componentContainer'>
                <Dish id='selectedDish' methods={selection.cookingMethods} carbs={selection.carbs} spices={selection.spices}
                  proteins={selection.proteins} note={selection.note} name={selection.name}/>
              </div>}
            </div>
          </div>
        );
      }
    } else {
      return <Error/>;
    }
  };
  // subcomponent. renders random dish information.
  const Random = () => {
    if (dishResults.loading) {
      return <Loading/>;
    } else if (dishResults.data && dishResults.data.allDishes) {
      const resultCount = dishResults.data.allDishes.length;
      if (resultCount === 0) {
        return <Empty type='dishes'/>;
      } else if (resultCount === 1) {
        const {cookingMethods, carbs, spices, proteins, note, name} = dishResults.data.allDishes[0];
        return (
          <div id='recommendationSection' className='componentContainer'>
            <Dish id='recommendedDish' view='random' methods={cookingMethods} carbs={carbs} spices={spices}
              proteins={proteins} note={note} name={name}/>
          </div>
        );
      } else {
        const random = Math.floor(Math.random() * Math.floor(dishResults.data.allDishes.length));
        const {cookingMethods, carbs, spices, proteins, note, name} = dishResults.data.allDishes[random];
        return (
          <div id='recommendationSection' className='componentContainer'>
            <Dish id='recommendedDish' view='random' methods={cookingMethods} carbs={carbs} spices={spices}
              proteins={proteins} note={note} name={name}/>
          </div>
        );
      }
    } else {
      return <Error/>;
    }
  };

  // helper function. handles new dish component submission.
  // checks the type of submission and sets variables accordingly.
  const handleNewComponent = async (type) => {
    const token = await localStorage.getItem('rffUserToken').substring(7);
    let variables;
    switch (type) {
    case 'carb':
      variables = {
        token: token,
        type: type,
        name: document.getElementById('newCarbName').value
      };
      break;
    case 'protein':
      variables = {
        token: token,
        type: type,
        name: document.getElementById('newProteinName').value
      };
      break;
    case 'spice':
      variables = {
        token: token,
        type: type,
        name: document.getElementById('newSpiceName').value
      };
      break;
    case 'method':
      variables = {
        token: token,
        name: document.getElementById('newMethodName').value
      };
      break;
    default:
      variables = null;
      break;
    }
    if (variables !== null && variables.token) {
      await client.mutate({
        mutation: type === 'method' ? ADD_METHOD : ADD_INGREDIENT,
        variables: variables,
        errorPolicy: 'ignore'
      }).then(async (result) => {
        const {data} = result;
        if (data !== null) {
          switch (type) {
          case 'carb':
            await updateCacheWithCarb('added', data.addIngredient);
            props.handleInfo(`New ${type} saved: ${data.addIngredient.name}`);
            break;
          case 'protein':
            await updateCacheWithProtein('added', data.addIngredient);
            props.handleInfo(`New ${type} saved: ${data.addIngredient.name}`);
            break;
          case 'spice':
            await updateCacheWithSpice('added', data.addIngredient);
            props.handleInfo(`New ${type} saved: ${data.addIngredient.name}`);
            break;
          case 'method':
            await updateCacheWithMethod('added', data.addMethod);
            props.handleInfo(`New ${type} saved: ${data.addMethod.name}`);
            break;
          default:
            variables = null;
            break;
          }
        } else {
          props.handleError(`Error occurred with ${type}: cannot add ${variables.name}`);
        }
      }
      );
    }
  };

  // subcomponent. renders form for new dish component submission.
  // selector defines which type of dish component will be submitted to handler function.
  const NewComponent = () => {
    const [selection, setSelection] = useState('carb');
    return (
      <div className='componentContainer'>
        <div className='dish'>
          <p className={classProvider(props.theme, 'heading')}><strong>Add new...</strong></p>
          <div id='addComponentSelector' className='selector'>
            <button id='componentSelectCarb' type='button' onClick={() => setSelection('carb')}
              className={selection === 'carb'
                ? classProvider(props.theme, 'selected')
                : classProvider(props.theme, 'selector')}>carb</button>
            <button id='componentSelectProtein' type='button' onClick={() => setSelection('protein')}
              className={selection === 'protein'
                ? classProvider(props.theme, 'selected')
                : classProvider(props.theme, 'selector')}>protein</button>
            <button id='componentSelectSpice' type='button' onClick={() => setSelection('spice')}
              className={selection === 'spice'
                ? classProvider(props.theme, 'selected')
                : classProvider(props.theme, 'selector')}>spice</button>
            <button id='componentSelectMethod' type='button' onClick={() => setSelection('method')}
              className={selection === 'method'
                ? classProvider(props.theme, 'selected')
                : classProvider(props.theme, 'selector')}>method</button>
          </div>
          <DishComponentForm selection={selection}/>
        </div>
      </div>
    );
  };

  const DishComponentForm = ({selection}) => {
    switch (selection) {
    case 'carb': return <NewCarb/>;
    case 'method': return <NewMethod/>;
    case 'protein': return <NewProtein/>;
    case 'spice': return <NewSpice/>;
    default: return null;
    }
  };
  // subcomponent. renders form for new spice submission.
  const NewSpice = () => {
    return (
      <div className='newComponent'>
        <input type='text' id='newSpiceName' placeholder='spice name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='button' onClick={() => handleNewComponent('spice')} id='saveSpice' className={classProvider(props.theme, 'activator')}>Save spice</button>
      </div>
    );
  };
  // subcomponent. renders form for new protein submission.
  const NewProtein = () => {
    return (
      <div className='newComponent'>
        <input type='text' id='newProteinName' placeholder='protein name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='button' onClick={() => handleNewComponent('protein')} id='saveProtein' className={classProvider(props.theme, 'activator')}>Save protein</button>
      </div>
    );
  };
  // subcomponent. renders form for new carb submission.
  const NewCarb = () => {
    return (
      <div className='newComponent'>
        <input type='text' id='newCarbName' placeholder='carb name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='button' onClick={() => handleNewComponent('carb')} id='saveCarb' className={classProvider(props.theme, 'activator')}>Save carb</button>
      </div>
    );
  };
  // subcomponent. renders form for new cooking method submission.
  const NewMethod = () => {
    return (
      <div className='newComponent'>
        <input type='text' id='newMethodName' placeholder='method name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='button' onClick={() => handleNewComponent('method')} id='saveMethod' className={classProvider(props.theme, 'activator')}>Save method</button>
      </div>
    );
  };

  // helper function. handles new dish submission.
  // maps added dish component values to id's (string formatted),
  // creates variables for GraphQL and triggers mutation.
  const handleNewDish = async () => {
    const {newDishMethods, newDishProteins, newDishCarbs, newDishSpices, newDish} = props.dishyState;
    if (newDish) {
      const token = await localStorage.getItem('rffUserToken').substring(7);
      const variables = {
        token: token(),
        name: document.getElementById('newDishName').value,
        note: document.getElementById('newDishNote').value,
        cookingMethods: newDishMethods.map(m => m.id),
        proteins: newDishProteins.map(p => p.id),
        carbs: newDishCarbs.map(c => c.id),
        spices: newDishSpices.map(s => s.id)
      };
      if (variables.token) {
        await client.mutate({
          mutation: ADD_DISH,
          variables: variables,
          errorPolicy: 'ignore'
        }).then(async (result) => {
          const {data} = result;
          if (data !== null) {
            await resetDishForm();
            props.handleInfo(`New dish saved: ${variables.name}`);
          } else {
            props.handleError(`Error occurred with dish: cannot add ${variables.name}`);
          }
        });
      }
    }
  };

  const resetDishForm = () => {
    document.getElementById('newDishName').value = '';
    document.getElementById('newDishNote').value = '';
    props.resetDish();
  };

  // subcomponent. renders form for new dish submission.
  // selector activates/deactivates form.
  // form activated also when dish component added to new dish if form is not active.
  // deactivation resets added components from Redux-state.
  const NewDish = () => {
    const {
      newDish, newDishCarbs, newDishProteins, newDishSpices, newDishMethods
    } = props.dishyState;
    return (
      <div className='componentContainer'>
        <div className='dish'>
          <h4 className={classProvider(props.theme, 'heading')}>Add new dish</h4>
          {newDish
            ? <button type='button' onClick={() => resetDishForm()} id='newDishDeactivate'
              className={classProvider(props.theme, 'deactivator')}>reset dish</button>
            : <button type='button' onClick={() => props.initDish()} id='newDishActivate'
              className={classProvider(props.theme, 'activator')}>create dish</button>}
          {newDish && <>
            <Dish view='new' carbs={newDishCarbs} proteins={newDishProteins}
              spices={newDishSpices} methods={newDishMethods}/>
            <button id='saveDish' onClick={() => handleNewDish()}
              type='button' className={classProvider(props.theme, 'activator')}>Save dish</button>
          </>}
        </div>
      </div>
    );
  };

  // subcomponent. renders dish with given information.
  const Dish = ({view, carbs, proteins, spices, methods, note, name}) => {
    if (view === 'random') {
      return (
        <div className='dish'>
          <p id='dishName' className={classProvider(props.theme, 'text')}>{name}</p>
          <p id='dishNote' className={classProvider(props.theme, 'text')}>{note}</p>
          <div className='componentContainer'>
            <DishComponents id='dishCarbs' type='carb' components={carbs} viewType={view}/>
            <DishComponents id='dishProteins' type='protein' components={proteins} viewType={view}/>
            <DishComponents id='dishSpices' type='spice' components={spices} viewType={view}/>
            <DishComponents id='dishMethods' type='method' components={methods} viewType={view}/>
          </div>
        </div>
      );
    } else if (view === 'new') {
      return (
        <div className='dish'>
          <input className={classProvider(props.theme, 'noteArea')}
            placeholder='dish name' type='text' id='newDishName'/>
          <input type='text' className={classProvider(props.theme, 'noteArea')}
            placeholder='description, steps, etc.' id='newDishNote'/>
          <div className='componentContainer'>
            <DishComponents id='newDishCarbs' type='carb' components={carbs} viewType={view}/>
            <DishComponents id='newDishProteins' type='protein' components={proteins} viewType={view}/>
            <DishComponents id='newDishSpices' type='spice' components={spices} viewType={view}/>
            <DishComponents id='newDishMethods' type='method' components={methods} viewType={view}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className='dish'>
          <p id='dishName' className={classProvider(props.theme, 'text')}>{name}</p>
          <p id='dishNote' className={classProvider(props.theme, 'text')}>{note}</p>
          <div className='componentContainer'>
            <DishComponents id='dishCarbs' type='carb' components={carbs} viewType={view}/>
            <DishComponents id='dishProteins' type='protein' components={proteins} viewType={view}/>
            <DishComponents id='dishSpices' type='spice' components={spices} viewType={view}/>
            <DishComponents id='dishMethods' type='method' components={methods} viewType={view}/>
          </div>
        </div>
      );
    }
  };

  // subcomponent. renders dish components with given information.
  const DishComponents = ({type, components, viewType}) => {
    if (components.length > 0) {
      return (
        <div className='components'>
          {type === 'carb' && <h4 className={classProvider(props.theme, 'text')}>Carbs:</h4>}
          {type === 'protein' && <h4 className={classProvider(props.theme, 'text')}>Proteins:</h4>}
          {type === 'spice' && <h4 className={classProvider(props.theme, 'text')}>Spices:</h4>}
          {type === 'method' && <h4 className={classProvider(props.theme, 'text')}>Cooking methods:</h4>}
          {components.map((c) => <Component key={c.name} component={c} type={type} view='plain'/>)}
        </div>
      );
    } else {
      return (
        <div className='components'>
          {type === 'carb' && <p className={classProvider(props.theme, 'text')}>no carbs</p>}
          {type === 'protein' && <p className={classProvider(props.theme, 'text')}>no proteins</p>}
          {type === 'spice' && <p className={classProvider(props.theme, 'text')}>no spices</p>}
          {type === 'method' && <p className={classProvider(props.theme, 'text')}>no cooking methods</p>}
        </div>
      );
    }
  };

  // subcomponent. renders dish component information.
  const Component = ({component, view}) => {
    if (props.dishyState.newDish && view === 'new') {
      return (
        <div className='component'>
          <p className={classProvider(props.theme, 'text')}>{component.name}</p>
        </div>
      );
    } else if (view === 'random' || view === 'plain') {
      return (
        <div className='component'>
          <p className={classProvider(props.theme, 'text')}>{component.name}</p>
        </div>
      );
    } else {
      const uses = component.uses.length;
      return (
        <div className='component'>
          <p className={classProvider(props.theme, 'text')}>{component.name}</p>
          <p className={classProvider(props.theme, 'text')}>
            {uses > 1 ? `used in ${uses} dishes` : uses === 1 ? 'used in 1 dish' : 'no usage'}
          </p>
        </div>
      );
    }
  };

  return (
    <div className='app'>
      <div className='container'>
        <h4 className={classProvider(props.theme, 'heading')}>Suggested:</h4>
        <Random id='randomDish'/>
        <h4 className={classProvider(props.theme, 'heading')}>Dishes:</h4>
        <Dishes id='dishes'/>
        <h4 className={classProvider(props.theme, 'heading')}>Carbs:</h4>
        <Carbs id='carbs'/>
        <h4 className={classProvider(props.theme, 'heading')}>Proteins:</h4>
        <Proteins id='proteins'/>
        <h4 className={classProvider(props.theme, 'heading')}>Spices:</h4>
        <Spices id='spices'/>
        <h4 className={classProvider(props.theme, 'heading')}>Cooking methods:</h4>
        <Methods id='methods'/>
        {props.show === 'advanced' && <NewComponent id='newDishComponent'/>}
        {props.show === 'advanced' && <NewDish id='newDish'/>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishy);