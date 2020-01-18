

import PropTypes from 'prop-types';

class User {
  constructor(props) {
    this.state = {
      username: props.username,
      role: props.role,
      id: props.id
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
}

User.propTypes = {
  username: PropTypes.string,
  role: PropTypes.string,
  id: PropTypes.string
};

export default User;