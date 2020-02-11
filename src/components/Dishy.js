// Dishy.js | application on demosite.

// IMPORTS
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useApolloClient, useQuery} from '@apollo/react-hooks';

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
  async function handleNewComponent (event, type) {
    event.preventDefault();
    const userToken = localStorage.getItem('rffUserToken').substring(7);
    let variables;
    switch (type) {
    case 'carb':
      variables = {
        token: userToken,
        type: type,
        name: document.getElementById('newCarbName').value
      };
      break;
    case 'protein':
      variables = {
        token: userToken,
        type: type,
        name: document.getElementById('newProteinName').value
      };
      break;
    case 'spice':
      variables = {
        token: userToken,
        type: type,
        name: document.getElementById('newSpiceName').value
      };
      break;
    case 'method':
      variables = {
        token: userToken,
        name: document.getElementById('newMethodName').value
      };
      break;
    default:
      variables = null;
      break;
    }
    variables !== null &&
      await client.mutate({
        mutation: type === 'method' ? ADD_METHOD : ADD_INGREDIENT,
        variables: variables,
        errorPolicy: 'ignore'
      }).then(result => {
        const {data} = result;
        if (data !== null) {
          props.handleInfo(`New ${type} saved: ${variables.name}`);
        } else {
          props.handleError(`Error occurred with ${type}: cannot add ${variables.name}`);
        }
        if (type === 'spice') document.getElementById('newSpiceName').value = '';
        if (type === 'carb') document.getElementById('newCarbName').value = '';
        if (type === 'protein') document.getElementById('newProteinName').value = '';
        if (type === 'method') document.getElementById('newMethodName').value = '';
      });
  }

  // subcomponent. renders form for new dish component submission.
  // selector defines which type of dish component will be submitted to handler function.
  const NewComponent = () => {
    const [selection, setSelection] = useState('carb');
    return (
      <div className='componentContainer'>
        <div className='dish'>
          <h4 className={classProvider(props.theme, 'heading')}>Add new...</h4>
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
          {selection === 'carb' && <NewCarb/>}
          {selection === 'method' && <NewMethod/>}
          {selection === 'protein' && <NewProtein/>}
          {selection === 'spice' && <NewSpice/>}
        </div>
      </div>
    );
  };

  // subcomponent. renders form for new spice submission.
  const NewSpice = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'spice')} className='newComponent'>
        <input type='text' id='newSpiceName' placeholder='spice name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' id='saveSpice' className={classProvider(props.theme, 'activator')}>Save spice</button>
      </form>
    );
  };
  // subcomponent. renders form for new protein submission.
  const NewProtein = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'protein')} className='newComponent'>
        <input type='text' id='newProteinName' placeholder='protein name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' id='saveProtein' className={classProvider(props.theme, 'activator')}>Save protein</button>
      </form>
    );
  };
  // subcomponent. renders form for new carb submission.
  const NewCarb = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'carb')} className='newComponent'>
        <input type='text' id='newCarbName' placeholder='carb name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' id='saveCarb' className={classProvider(props.theme, 'activator')}>Save carb</button>
      </form>
    );
  };
  // subcomponent. renders form for new cooking method submission.
  const NewMethod = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'method')} className='newComponent'>
        <input type='text' id='newMethodName' placeholder='method name' minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' id='saveMethod' className={classProvider(props.theme, 'activator')}>Save method</button>
      </form>
    );
  };

  // helper function. handles new dish submission.
  // maps added dish component values to id's (string formatted),
  // creates variables for GraphQL and triggers mutation.
  const handleNewDish = async (event) => {
    event.preventDefault();
    const {newDishMethods, newDishProteins, newDishCarbs, newDishSpices, newDish} = props.dishyState;
    if (newDish) {
      const userToken = localStorage.getItem('rffUserToken').substring(7);
      const variables = {
        token: userToken,
        name: document.getElementById('newDishName').value,
        note: document.getElementById('newDishNote').value,
        cookingMethods: newDishMethods.map(m => m.id),
        proteins: newDishProteins.map(p => p.id),
        carbs: newDishCarbs.map(c => c.id),
        spices: newDishSpices.map(s => s.id)
      };
      await client.mutate({
        mutation: ADD_DISH,
        variables: variables,
        errorPolicy: 'ignore'
      }).then(result => {
        const {data} = result;
        if (data !== null) {
          props.handleInfo(`New dish saved: ${variables.name}`);
          resetDishForm();
        } else {
          props.handleError(`Error occurred with dish: cannot add ${variables.name}`);
        }
      });
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
            <button id='saveDish' onClick={(event) => handleNewDish(event)}
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