//

// imports

function styler(selection) {
  let theme;
  switch (selection) {
    case 'dark':
      theme = buildDark();
      return theme;
    case 'light':
      theme = buildLight();
      return theme;
    case 'dev':
      theme = buildDev();
      return theme;
    default:
      theme = buildLight();
      return theme;
  }
}

function buildLight() {
  return {
    appBackground: {
      backgroundColor: colors.gainsBoro
    },
    appContainer: {
      backgroundColor: 'transparent',
      margin: '1em'
    },
    navMenuButton: {
      border: 'none',
      margin: '1em',
      cursor: 'pointer'
    },
    navMenu: {
      position: 'relative',
      display: 'inline-block'
    },
    navMenuHover: {
      display: 'block'
    },
    navMenuContent: {
      display: 'none',
      position: 'absolute',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1'
    },
    navMenuContentItem: {
      textDecoration: 'none',
      display: 'block'
    },
    navMenuContentItemH: {
      textDecoration: 'none',
      display: 'block'
    },
  };
}

function buildDark() {
  return {
    appBackground: {
      backgroundColor: colors.darkSlateGrey
    },
    appContainer: {
      backgroundColor: 'transparent',
      margin: '1em'
    },
    navMenuButton: {
      border: 'none',
      margin: '1em',
      cursor: 'pointer'
    },
    navMenu: {
      position: 'relative',
      display: 'inline-block'
    },
    navMenuContent: {
      display: 'none',
      position: 'absolute',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1'
    },
    navMenuContentItem: {
      textDecoration: 'none',
      display: 'block'
    },
    navMenuContentItemH: {
      textDecoration: 'none',
      display: 'block'
    },
  };
}

function buildDev() {
  return {
    appBackground: {
      backgroundColor: colors.peru
    },
    appContainer: {
      backgroundColor: 'transparent',
      margin: '1em'
    },
    navMenuButton: {
      border: 'none',
      cursor: 'pointer'
    },
    navMenu: {
      position: 'relative',
      display: 'inline-block'
    },
    navMenuContent: {
      display: 'none',
      position: 'absolute',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: '1'
    },
    navMenuContentItem: {
      textDecoration: 'none',
      display: 'block'
    },
    navMenuContentItemH: {
      textDecoration: 'none',
      display: 'block'
    },
  };
}

const colors = {
  peru: '#e16f3a',
  darkSlateGrey: '#20232a',
  gainsBoro: '#dbdbdb',
  yellowGreen: '#71d658',
  reactBlue: '#5bccec',
  slateBlue: '#764abc',
  deepPink: '#e00097',
  seaGreen: '#13a651',
  googleBlue: '#4285F4',
  googleRed: '#DB4437',
  googleYellow: '#F4B400',
  googleGreen: '#0F9D58',
  amazonOrange: '#FF9900',
  slackBlue: '#36C5F0',
  slackGreen: '#2EB67D',
  slackRed: '#E01E5A',
  slackYellow: '#ECB22E',
  hslBlue: '#007AC9',
  cityBike: '#FCBC19',
  bus: '#007AC9',
  tram: '#00985F',
  train: '#8C4799',
  metro: '#FF6319',
  jokeriLightRail: '#00B2A9',
  ferry: '#00B9E4',
  ferryLight: '#BEE4F8',
  hslPink: '#F092CD',
  hslPinkLight: '#F4DEEA',
  hslGreen: '#64BE1E',
  hslGreenLight: '#D0E6BD',
  hslWarning: '#DC0451',
  hslHighlight: '#FED100',
  dGray: '#333333',
  gray: '#616365',
  lGray: '#666666',
  vlGray: '#dddddc',
  digitransit: '#3db7e4',
  jbAmber: '#F9A857',
  jbSiena: '#FB5502',
  jbCrimson: '#FB2046',
  jbCarmine: '#E32581',
  jbFuchsia: '#D73CEA',
  jbLilac: '#9135E0',
  jbMauve: '#961F8C',
  jbPurple: '#5E2495',
  jbSkyBlue: '#05C1FD',
  jbGreen: '#18D68C',
  jbLemon: '#FCF84A',
  heroku: '#6762a6'
};

export default styler;