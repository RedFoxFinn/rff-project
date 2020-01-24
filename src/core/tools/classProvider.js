const classProvider = (theme, element) => {
  if (theme === 'dark') {
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
    case 'formElement':
      return 'formElementDa';
    case 'calculateElement':
      return 'formElementDa';
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
    case 'dishyElement':
      return 'dishyElementDa';
    case 'stopContainer':
      return 'stopContainer';
    case 'stopDetails':
      return 'stopDetailsDa';
    case 'linkButton':
      return 'linkButtonDa';
    case 'notificationInfo':
      return 'notificationInfoDa';
    case 'notificationError':
      return 'notificationErrorDa';
    case 'notificationNull':
      return 'notificationNullDa';
    case 'tile':
      return 'tile';
    case 'tileDescription':
      return 'tileDescriptionDa';
    case 'tileLoading':
      return 'tileLoading';
    case 'tileError':
      return 'tileError';
    case 'dashTile':
      return 'dashTile';
    case 'listHeader':
      return 'listHeaderDa';
    case 'listDescription':
      return 'listDescriptionDa';
    case 'task':
      return 'taskDa';
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
    case 'formElement':
      return 'formElementLi';
    case 'calculateElement':
      return 'formElementLi';
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
    case 'dishyElement':
      return 'dishyElementLi';
    case 'stopContainer':
      return 'stopContainer';
    case 'stopDetails':
      return 'stopDetailsLi';
    case 'linkButton':
      return 'linkButtonLi';
    case 'notificationInfo':
      return 'notificationInfoLi';
    case 'notificationError':
      return 'notificationErrorLi';
    case 'notificationNull':
      return 'notificationNullLi';
    case 'tile':
      return 'tile';
    case 'tileDescription':
      return 'tileDescriptionLi';
    case 'tileLoading':
      return 'tileLoading';
    case 'tileError':
      return 'tileError';
    case 'listHeader':
      return 'listHeaderLi';
    case 'listDescription':
      return 'listDescriptionLi';
    case 'task':
      return 'taskLi';
    default:
      return '';
    }
  }
};

export default classProvider;