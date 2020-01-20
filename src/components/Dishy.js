import React, {} from 'react';
import {connect} from 'react-redux';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/dishy.css';

import {useQuery} from '@apollo/react-hooks';
import {ALL_CARBS} from '../core/graphql/rff/queries/q_allCarbs';
import {ALL_PROTEINS} from '../core/graphql/rff/queries/q_allProteins';
import {ALL_SPICES} from '../core/graphql/rff/queries/q_allSpices';
import {ALL_METHODS} from '../core/graphql/rff/queries/q_allMethods';
import {ALL_DISHES} from '../core/graphql/rff/queries/q_allDishes';
import DishComponent from './widgets/DishComponent';
import Dish from './widgets/Dish';

const mapStateToProps = (state) => {
  return {
    theme: state.appState.theme,
    dishyState: state.dishyState
  };
};

const Dishy = (props) => {
  const carbResults = useQuery(ALL_CARBS);
  const proteinResults = useQuery(ALL_PROTEINS);
  const spiceResults = useQuery(ALL_SPICES);
  const methodResults = useQuery(ALL_METHODS);
  const dishResults = useQuery(ALL_DISHES);

  const Carbs = () => {
    if (carbResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (carbResults.data && carbResults.data.allCarbs) {
      return (
        <div className='appWidgets'>
          <form className={classProvider(props.theme, 'dishyElement')}>
            <select defaultValue='default' className='dishySelectDrop'>
              <option key='default' value='default' disabled>carbs</option>
              {carbResults.data.allCarbs.map((c) => <option key={c.id} value={c}>{c.name}</option>)}
            </select>
          </form>
          <DishComponent/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };
  const Proteins = () => {
    if (proteinResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (proteinResults.data && proteinResults.data.allProteins) {
      return (
        <div className='appWidgets'>
          <form className={classProvider(props.theme, 'dishyElement')}>
            <select defaultValue='default' className='dishySelectDrop'>
              <option key='default' value='default' disabled>proteins</option>
              {proteinResults.data.allProteins.map((p) => <option key={p.id} value={p}>{p.name}</option>)}
            </select>
          </form>
          <DishComponent/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };
  const Spices = () => {
    if (spiceResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (spiceResults.data && spiceResults.data.allSpices) {
      return (
        <div className='appWidgets'>
          <form className={classProvider(props.theme, 'dishyElement')}>
            <select defaultValue='default' className='dishySelectDrop'>
              <option key='default' value='default' disabled>spices</option>
              {spiceResults.data.allSpices.map((s) => <option key={s.id} value={s}>{s.name}</option>)}
            </select>
          </form>
          <DishComponent/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };
  const Methods = () => {
    if (methodResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (methodResults.data && methodResults.data.allMethods) {
      return (
        <div className='appWidgets'>
          <form className={classProvider(props.theme, 'dishyElement')}>
            <select defaultValue='default' className='dishySelectDrop'>
              <option key='default' value='default' disabled>cooking methods</option>
              {methodResults.data.allMethods.map((m) => <option key={m.id} value={m}>{m.name}</option>)}
            </select>
          </form>
          <DishComponent/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };
  const Dishes = () => {
    if (dishResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (dishResults.data && dishResults.data.allDishes) {
      return (
        <div className='appWidgets'>
          <form className={classProvider(props.theme, 'dishyElement')}>
            <select defaultValue='default' className='dishySelectDrop'>
              <option key='default' value='default' disabled className='dishySelectDrop'>dishes</option>
              {dishResults.data.allDishes.map((d) => <option key={d.id} value={d}>{d.name}</option>)}
            </select>
          </form>
          <Dish/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };
  const Random = () => {
    if (dishResults.loading) {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>loading . . .</p>
        </div>
      );
    } else if (dishResults.data && dishResults.data.allDishes) {
      const random = Math.floor(Math.random() * Math.floor(dishResults.data.allDishes.length));
      return (
        <div className='appWidgets'>
          <Dish/>
        </div>
      );
    } else {
      return (
        <div className='appWidgets'>
          <p className={classProvider(props.theme, 'description')}>something went wrong . . .</p>
        </div>
      );
    }
  };

  return(
    <div className='app'>
      <div className='appContainer'>
        <h4 className={classProvider(props.theme, 'heading')}>Randomly suggested dish:</h4>
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
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Dishy);