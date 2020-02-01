import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {useApolloClient, useQuery} from '@apollo/react-hooks';
import {Button} from 'semantic-ui-react';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/dishy.css';

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

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    dishyState: state.dishyState,
    user: state.loginState.user
  };
};

const mapDispatchToProps = {
  initDish, resetDish, addDishCarb, addDishProtein, addDishSpice, addDishMethod,
  handleInfo, handleError
};

const Dishy = (props) => {
  const client = useApolloClient();
  const carbResults = useQuery(ALL_CARBS);
  const proteinResults = useQuery(ALL_PROTEINS);
  const spiceResults = useQuery(ALL_SPICES);
  const methodResults = useQuery(ALL_METHODS);
  const dishResults = useQuery(ALL_DISHES);

  const Loading = () => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      </div>
    );
  };
  const Error = () => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      </div>
    );
  };
  const Empty = ({type}) => {
    return (
      <div className='appWidgets'>
        <div className={classProvider(props.theme, 'dishyElement')}>
          <p className={classProvider(props.theme, 'description')}>no {type} available</p>
        </div>
      </div>
    );
  };

  const Carbs = () => {
    const [selection, setSelection] = useState(null);
    if (carbResults.loading) {
      return <Loading/>;
    } else if (carbResults.data && carbResults.data.allCarbs) {
      const resultCount = carbResults.data.allCarbs.length;
      if (resultCount > 0) {
        return (
          <div className='appWidgets'>
            <form className={classProvider(props.theme, 'dishyElement')}>
              <select defaultValue='default'>
                <option key='default' value='default' disabled>carbs</option>
                {carbResults.data.allCarbs.map((c) => <option key={c.id} value={c}>{c.name}</option>)}
              </select>
            </form>
            {selection !== null && <Component type='carb' component={selection}/>}
          </div>
        );
      } else {
        return <Empty type='carbs'/>;
      }
    } else {
      return <Error/>;
    }
  };
  const Proteins = () => {
    const [selection, setSelection] = useState(null);
    if (proteinResults.loading) {
      return <Loading/>;
    } else if (proteinResults.data && proteinResults.data.allProteins) {
      const resultCount = proteinResults.data.allProteins.length;
      if (resultCount > 0) {
        return (
          <div className='appWidgets'>
            <form className={classProvider(props.theme, 'dishyElement')}>
              <select defaultValue='default'>
                <option key='default' value='default' disabled>proteins</option>
                {proteinResults.data.allProteins.map((p) => <option key={p.id} value={p}>{p.name}</option>)}
              </select>
            </form>
          </div>
        );
      } else {
        return <Empty type='proteins'/>;
      }
    } else {
      return <Error/>;
    }
  };
  const Spices = () => {
    const [selection, setSelection] = useState(null);
    if (spiceResults.loading) {
      return <Loading/>;
    } else if (spiceResults.data && spiceResults.data.allSpices) {
      const resultCount = spiceResults.data.allSpices.length;
      if (resultCount > 0) {
        return (
          <div className='appWidgets'>
            <form className={classProvider(props.theme, 'dishyElement')}>
              <select defaultValue='default'>
                <option key='default' value='default' disabled>spices</option>
                {spiceResults.data.allSpices.map((s) => <option key={s.id} value={s}>{s.name}</option>)}
              </select>
            </form>
          </div>
        );
      } else {
        return <Empty type='spices'/>;
      }
    } else {
      return <Error/>;
    }
  };
  const Methods = () => {
    const [selection, setSelection] = useState(null);
    if (methodResults.loading) {
      return <Loading/>;
    } else if (methodResults.data && methodResults.data.allMethods) {
      const resultCount = methodResults.data.allMethods.length;
      if (resultCount > 0) {
        return (
          <div className='appWidgets'>
            <form className={classProvider(props.theme, 'dishyElement')}>
              <select defaultValue='default'>
                <option key='default' value='default' disabled>cooking methods</option>
                {methodResults.data.allMethods.map((m) => <option key={m.id} value={m}>{m.name}</option>)}
              </select>
            </form>
          </div>
        );
      } else {
        return <Empty type='cooking methods'/>;
      }
    } else {
      return <Error/>;
    }
  };
  const Dishes = () => {
    if (dishResults.loading) {
      return <Loading/>;
    } else if (dishResults.data && dishResults.data.allDishes) {
      const resultCount = dishResults.data.allDishes.length;
      if (resultCount === 0) {
        return <Empty type='dishes'/>;
      } else {
        return (
          <div className='appWidgets'>
            <form className={classProvider(props.theme, 'dishyElement')}>
              <select defaultValue='default'>
                <option key='default' value='default' disabled>dishes</option>
                {dishResults.data.allDishes.map((d) => <option key={d.id} value={d}>{d.name}</option>)}
              </select>
            </form>
          </div>
        );
      }
    } else {
      return <Error/>;
    }
  };
  const Random = () => {
    if (dishResults.loading) {
      return <Loading/>;
    } else if (dishResults.data && dishResults.data.allDishes) {
      const resultCount = dishResults.data.allDishes.length;
      if (resultCount === 0) {
        return <Empty type='dishes'/>;
      } else if (resultCount === 1) {
        return (
          <div className='appWidgets'>
          </div>
        );
      } else {
        const random = Math.floor(Math.random() * Math.floor(dishResults.data.allDishes.length));
        return (
          <div className='appWidgets'>
          </div>
        );
      }
    } else {
      return <Error/>;
    }
  };

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

  const NewComponent = () => {
    const [selection, setSelection] = useState('carb');
    return (
      <div className={classProvider(props.theme, 'dishyElement')}>
        <h4 className={classProvider(props.theme, 'heading')}>Add new...</h4>
        <div className='selector'>
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
    );
  };
  const NewSpice = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'spice')}>
        <input type='text' id='newSpiceName' placeholder='spice name' autoComplete={false} minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' className={classProvider(props.theme, 'activator')}>Save spice</button>
      </form>
    );
  };
  const NewProtein = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'protein')}>
        <input type='text' id='newProteinName' placeholder='protein name' autoComplete={false} minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' className={classProvider(props.theme, 'activator')}>Save protein</button>
      </form>
    );
  };
  const NewCarb = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'carb')}>
        <input type='text' id='newCarbName' placeholder='carb name' autoComplete={false} minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' className={classProvider(props.theme, 'activator')}>Save carb</button>
      </form>
    );
  };
  const NewMethod = () => {
    return (
      <form onSubmit={(event) => handleNewComponent(event, 'method')}>
        <input type='text' id='newMethodName' placeholder='cooking method' autoComplete={false} minLength={2}
          required className={classProvider(props.theme, 'field')}/>
        <button type='submit' className={classProvider(props.theme, 'activator')}>Save method</button>
      </form>
    );
  };
  const NewDish = () => {
    const {
      newDish, newDishCarbs, newDishProteins, newDishSpices, newDishMethods, newDishName, newDishNote
    } = props.dishyState;
    return (
      <div className={classProvider(props.theme, 'dishyElement')}>
        <h4 className={classProvider(props.theme, 'heading')}>Add new dish</h4>
        {newDish
          ? <button type='button' onClick={() => props.resetDish()} className={classProvider(props.theme, 'deactivator')}>reset dish</button>
          : <button type='button' onClick={() => props.initDish()} className={classProvider(props.theme, 'activator')}>create dish</button>}
        {newDish && <DishComponents type='carb' components={newDishCarbs} listingType='new'/>}
        {newDish && <DishComponents type='protein' components={newDishProteins} listingType='new'/>}
        {newDish && <DishComponents type='spice' components={newDishSpices} listingType='new'/>}
        {newDish && <DishComponents type='method' components={newDishMethods} listingType='new'/>}
        {newDish && <button type='button' className={classProvider(props.theme, 'activator')}>Save dish</button>}
      </div>
    );
  };
  const DishComponents = ({listingType, type, components}) => {
    if (components.length > 0) {
      if (listingType === 'new') {
        return (
          <div>
            {type === 'carb' && <h4>Added carbs:</h4>}
            {type === 'protein' && <h4>Added proteins:</h4>}
            {type === 'spice' && <h4>Added spices:</h4>}
            {type === 'method' && <h4>Added cooking methods:</h4>}
            {type}
          </div>
        );
      } else {
        return (
          <div>
            {type === 'carb' && <h4>Carbs:</h4>}
            {type === 'protein' && <h4>Proteins:</h4>}
            {type === 'spice' && <h4>Spices:</h4>}
            {type === 'method' && <h4>Cooking methods:</h4>}
            {type}
          </div>
        );
      }
    } else {
      if (listingType === 'new') {
        return (
          <div>
            {type === 'carb' && <p className={classProvider(props.theme, 'description')}>carbs not added</p>}
            {type === 'protein' && <p className={classProvider(props.theme, 'description')}>proteins not added</p>}
            {type === 'spice' && <p className={classProvider(props.theme, 'description')}>spices not added</p>}
            {type === 'method' && <p className={classProvider(props.theme, 'description')}>cooking methods not added</p>}
          </div>
        );
      } else {
        return (
          <div>
            {type === 'carb' && <p className={classProvider(props.theme, 'description')}>no carbs</p>}
            {type === 'protein' && <p className={classProvider(props.theme, 'description')}>no proteins</p>}
            {type === 'spice' && <p className={classProvider(props.theme, 'description')}>no spices</p>}
            {type === 'method' && <p className={classProvider(props.theme, 'description')}>no cooking methods</p>}
          </div>
        );
      }
    }
  };
  const Component = ({component, type}) => {
    if (props.dishyState.newDish) {
      return (
        <div>
          <p>{component.name}</p>
          <p>used in {component.uses.length} dishes</p>
          {type === 'carb' && <button type='button' onClick={() => props.addDishCarb(component)}>add carb to dish</button>}
          {type === 'protein' && <button type='button' onClick={() => props.addDishProtein(component)}>add protein to dish</button>}
          {type === 'spice' && <button type='button' onClick={() => props.addDishSpice(component)}>add spice to dish</button>}
          {type === 'method' && <button type='button' onClick={() => props.addDishMethod(component)}>add method to dish</button>}
        </div>
      );
    } else {
      return (
        <div>
          <p>{component.name}</p>
          <p>used in {component.uses.length} dishes</p>
        </div>
      );
    }
  };
  const Dish = () => {};

  return (
    <div className='app'>
      <div className='appContainer'>
        <h4 className={classProvider(props.theme, 'heading')}>Suggested:</h4>
        <Random/>
        <h4 className={classProvider(props.theme, 'heading')}>Dishes:</h4>
        <Dishes/>
        <h4 className={classProvider(props.theme, 'heading')}>Carbs:</h4>
        <Carbs/>
        <h4 className={classProvider(props.theme, 'heading')}>Proteins:</h4>
        <Proteins/>
        <h4 className={classProvider(props.theme, 'heading')}>Spices:</h4>
        <Spices/>
        <h4 className={classProvider(props.theme, 'heading')}>Cooking methods:</h4>
        <Methods/>
        {props.show === 'advanced' && <NewComponent/>}
        {props.show === 'advanced' && <NewDish/>}
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishy);