const classProvider = (theme, element) => {
  if (theme === 'dev') {
    switch(element) {
    case 'navMenu':
      return 'navMenuDe';
    case 'navSubMenu':
      return 'navSubMenuDe';
    case 'navButton':
      return 'navButtonDe';
    case 'navSubButton':
      return 'navSubButtonDe';
    case 'navContent':
      return 'navContentDe';
    case 'navSubContent':
      return 'navSubContentDe';
    case 'heading':
      return 'headingDe';
    case 'calculateElement':
      return 'calculateElementDe';
    case 'calculateResult':
      return 'calculateResultDe';
    case 'technologyElement':
      return 'technologyElementDe';
    case 'landingDescription':
      return 'descriptionDe';
    case 'loginButton':
      return 'loginButtonDe';
    case 'loginContent':
      return 'loginContentDe';
    case 'loginMenu':
      return 'loginMenuDe';
    case 'link':
      return 'linkDe';
    case 'description':
      return 'descriptionDe';
    case 'countrySearch':
      return 'searchElementDe';
    case 'countrySearchCancel':
      return 'searchCancelDe';
    case 'countryDetails':
      return 'countryDetailsDe';
    default:
      return '';
    }
  } else if (theme === 'dark') {
    switch(element) {
    case 'navMenu':
      return 'navMenuDa';
    case 'navSubMenu':
      return 'navSubMenuDa';
    case 'navButton':
      return 'navButtonDa';
    case 'navSubButton':
      return 'navSubButtonDa';
    case 'navContent':
      return 'navContentDa';
    case 'navSubContent':
      return 'navSubContentDa';
    case 'heading':
      return 'headingDa';
    case 'calculateElement':
      return 'calculateElementDa';
    case 'calculateResult':
      return 'calculateResultDa';
    case 'technologyElement':
      return 'technologyElementDa';
    case 'landingDescription':
      return 'descriptionDa';
    case 'loginButton':
      return 'loginButtonDa';
    case 'loginContent':
      return 'loginContentDa';
    case 'loginMenu':
      return 'loginMenuDa';
    case 'link':
      return 'linkDa';
    case 'description':
      return 'descriptionDa';
    case 'countrySearch':
      return 'searchElementDa';
    case 'countrySearchCancel':
      return 'searchCancelDa';
    case 'countryDetails':
      return 'countryDetailsDa';
    default:
      return '';
    }
  } else {
    switch(element) {
    case 'navMenu':
      return 'navMenuLi';
    case 'navSubMenu':
      return 'navSubMenuLi';
    case 'navButton':
      return 'navButtonLi';
    case 'navSubButton':
      return 'navSubButtonLi';
    case 'navContent':
      return 'navContentLi';
    case 'navSubContent':
      return 'navSubContentLi';
    case 'heading':
      return 'headingLi';
    case 'calculateElement':
      return 'calculateElementLi';
    case 'calculateResult':
      return 'calculateResultLi';
    case 'technologyElement':
      return 'technologyElementLi';
    case 'landingDescription':
      return 'descriptionLi';
    case 'loginButton':
      return 'loginButtonLi';
    case 'loginContent':
      return 'loginContentLi';
    case 'loginMenu':
      return 'loginMenuLi';
    case 'link':
      return 'linkLi';
    case 'description':
      return 'descriptionLi';
    case 'countrySearch':
      return 'searchElementLi';
    case 'countrySearchCancel':
      return 'searchCancelLi';
    case 'countryDetails':
      return 'countryDetailsLi';
    default:
      return '';
    }
  }
};

export default classProvider;