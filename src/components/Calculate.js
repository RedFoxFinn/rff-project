// RFF demo project
// Calculate.js
// React component that renders simple calculator app

import React, {useState} from 'react';
import {connect} from 'react-redux';
import numbro from 'numbro';

import classProvider from '../core/tools/classProvider';
import '../core/style/global.css';
import '../core/style/calculate.css';
import '../core/style/forms.css';

const mapStateToProps = (state) => {
  return {
    appState: state.appState
  };
};

const Calculator = (props) => {
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const Results = () => {
    return (
      <>
        <div className='appElements'>
          <Addition/>
          <Multiplication/>
          <Exponentiation/>
          <Cube/>
        </div>
        <div className='appElements'>
          <Subtraction/>
          <Division/>
          <RootSquare/>
          <RootCubic/>
        </div>
      </>
    );
  };

  const Addition = () => {
    const result = Number(value1) + Number(value2);
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Addition</p>
        <p>{value1} + {value2} = <strong>{result}</strong></p>
      </div>
    );
  };
  const Subtraction = () => {
    const result = numbro(Number(value1) - Number(value2)).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Subtraction</p>
        <p>{value1} - {value2} = <strong>{result}</strong></p>
      </div>
    );
  };
  const Division = () => {
    if (Number(value2) === 0) {
      return (
        <div className={classProvider(props.appState.theme, 'calculateResult')}>
          <p>Division</p>
          <a href='https://en.wikipedia.org/wiki/Division_by_zero'> nope </a>
        </div>
      );
    } else {
      const result = numbro(Number(value1) / Number(value2)).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
      return (
        <div className={classProvider(props.appState.theme, 'calculateResult')}>
          <p>Division</p>
          <p>{value1} / {value2} {'\u2243'} <strong>{result}</strong></p>
        </div>
      );
    }
  };
  const Multiplication = () => {
    const result = numbro(Number(value1) * Number(value2)).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Multiplication</p>
        <p>{value1} * {value2} {'\u2243'} <strong>{result}</strong></p>
      </div>
    );
  };
  const Exponentiation = () => {
    const res1 = numbro(Number(value1) ** 2).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    const res2 = numbro(Number(value2) ** 2).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    const res3 = numbro(Number(value1) ** Number(value2)).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Exponentiation</p>
        <p>{value1} ^ 2 {'\u2243'} <strong>{res1}</strong></p>
        <p>{value2} ^ 2 {'\u2243'} <strong>{res2}</strong></p>
        <p>{value1} ^ {value2} {'\u2243'} <strong>{res3}</strong></p>
      </div>
    );
  };
  const Cube = () => {
    const res1 = numbro(Number(value1) ** 3).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    const res2 = numbro(Number(value2) ** 3).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Cube</p>
        <p>{value1} ^ 3 {'\u2243'} <strong>{res1}</strong></p>
        <p>{value2} ^ 3 {'\u2243'} <strong>{res2}</strong></p>
      </div>
    );
  };
  const RootSquare = () => {
    const res1 = numbro(Math.sqrt(Number(value1))).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    const res2 = numbro(Math.sqrt(Number(value2))).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Square root</p>
        <p>{'\u221a'}{value1} {'\u2243'} <strong>{res1}</strong></p>
        <p>{'\u221a'}{value2} {'\u2243'} <strong>{res2}</strong></p>
      </div>
    );
  };
  const RootCubic = () => {
    const res1 = numbro(Math.cbrt(Number(value1))).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    const res2 = numbro(Math.cbrt(Number(value2))).format({thousandSeparated: true, trimMantissa: true, mantissa: 4});
    return (
      <div className={classProvider(props.appState.theme, 'calculateResult')}>
        <p>Cube root</p>
        <p>{'\u221B'}{value1} {'\u2243'} <strong>{res1}</strong></p>
        <p>{'\u221B'}{value2} {'\u2243'} <strong>{res2}</strong></p>
      </div>
    );
  };

  return(
    <div className='app'>
      <div className='container'>
        <form className='appElements'>
          <input type='number' placeholder='numerical value' onChange={({target}) => setValue1(target.value)}
            className={classProvider(props.appState.theme, 'calculateElement')}/>
          <input type='number' placeholder='numerical value' onChange={({target}) => setValue2(target.value)}
            className={classProvider(props.appState.theme, 'calculateElement')}/>
        </form>
        <Results/>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(Calculator);