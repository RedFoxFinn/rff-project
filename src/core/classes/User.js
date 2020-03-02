// RFF demo project
// Country.js
// creates User-class for application to use - users

import PropTypes from 'prop-types';

class User {
  constructor(props) {
    this.state = {
      username: props.username,
      role: props.role,
      id: props.id,
      active: props.active,
      removable: props.removable
    };
  }
  getUsername() {
    return this.state.username;
  }
  getRole() {
    return this.state.role;
  }
  getId() {
    return this.state.id;
  }
  getActive() {
    return this.state.active;
  }
  getRemovable() {
    return this.state.removable;
  }
}

User.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  id: PropTypes.string,
  active: PropTypes.bool,
  removable: PropTypes.bool
};

export default User;