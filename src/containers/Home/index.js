import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../../redux/modules/user';

@connect(
  state => ({
    user: state.user,
    userLoaded: state.message
  }),
  dispatch => bindActionCreators({ fetchProfile }, dispatch))
export default class Home extends Component {
  static propTypes = {
    fetchProfile: PropTypes.func,
    user: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.fetchProfile = this.fetchProfile.bind(this);

    this.state = {
      userLoaded: false
    };
  }

  fetchProfile() {
    this.props.fetchProfile('atakangktepe');
  }

  render() {
    return (
      <div>
        Home
        <button onClick={this.fetchProfile}>
          asdk
        </button>

        {this.props.user.profileData ? this.props.user.profileData.data.login : 'aksdj'}
      </div>
    );
  }
}
