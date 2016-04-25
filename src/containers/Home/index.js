import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile, resetProfile } from '../../redux/modules/user';
import User from '../../components/user/';

@connect(
  state => ({
    user: state.user
  }),
  dispatch => bindActionCreators({ fetchProfile, resetProfile }, dispatch))
export default class Home extends Component {
  static propTypes = {
    fetchProfile: PropTypes.func,
    user: PropTypes.object,
    resetProfile: PropTypes.func
  }

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);

    this.state = {
      userLoaded: this.props.user.message === 'Success',
      term: ''
    };
  }

  componentWillReceiveProps() {
    this.setState({
      userLoaded: this.props.user.message === 'Success'
    });
  }

  onInputChange(e) {
    this.setState({
      term: e.target.value
    });
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.resetProfile();
    this.props.fetchProfile(this.state.term);
    this.setState({
      term: ''
    });
  }

  render() {
    return (
      <div>
        <h1>Enter your Github username and click on generate </h1>
        <form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <button>
            Generate
          </button>
        </form>
        {this.props.user.profileData && (() => {
          return (
            <User
              website={this.props.user.profileData.data.blog}
              since={this.props.user.profileData.data.created_at}
              name={this.props.user.profileData.data.name}
              location={this.props.user.profileData.data.location}
              repoCount={this.props.user.profileData.data.public_repos}
              followersCount={this.props.user.profileData.data.followers}
            />
          );
        })()}
        <br />
      </div>
    );
  }
}
