const classProvider = (theme, element) => {
  if (theme === 'dev') {
    switch(element) {
      case 'navMenu':
        return 'navMenuDe';
      case 'navButton':
        return 'navButtonDe';
      case 'navContent':
        return 'navContentDe';
      case 'heading':
        return 'headingDe';
      case 'calculateElement':
        return 'calculateElementDe';
      case 'calculateResult':
        return 'calculateResultDe';
      case 'technologyElement':
        return 'technologyElementDe';
      default:
        return '';
    }
  } else if (theme === 'dark') {
    switch(element) {
      case 'navMenu':
        return 'navMenuDa';
      case 'navButton':
        return 'navButtonDa';
      case 'navContent':
        return 'navContentDa';
      case 'heading':
        return 'headingDa';
      case 'calculateElement':
        return 'calculateElementDa';
      case 'calculateResult':
        return 'calculateResultDa';
      case 'technologyElement':
        return 'technologyElementDa';
      default:
        return '';
    }
  } else {
    switch(element) {
      case 'navMenu':
        return 'navMenuLi';
      case 'navButton':
        return 'navButtonLi';
      case 'navContent':
        return 'navContentLi';
      case 'heading':
        return 'headingLi';
      case 'calculateElement':
        return 'calculateElementLi';
      case 'calculateResult':
        return 'calculateResultLi';
      case 'technologyElement':
        return 'technologyElementLi';
      default:
        return '';
    }
  }
};

export default classProvider;