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
      default:
        return '';
    }
  }
};

export default classProvider;