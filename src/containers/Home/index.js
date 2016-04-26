import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile, resetProfile } from '../../redux/modules/user';
import { resetRepo } from '../../redux/modules/repos';
import User from '../../components/user/';

@connect(
  state => ({
    user: state.user,
    repos: state.repos.data
  }),
  dispatch => bindActionCreators({ fetchProfile, resetProfile, resetRepo }, dispatch))
export default class Home extends Component {
  static propTypes = {
    fetchProfile: PropTypes.func,
    user: PropTypes.object,
    resetProfile: PropTypes.func,
    resetRepo: PropTypes.func,
    repos: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.getDate = this.getDate.bind(this);

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
    this.props.resetRepo();
    this.props.fetchProfile(this.state.term);
    this.setState({
      term: ''
    });
  }

  getDate(date) {
    const sinceDate = new Date(date);
    const currentYear = (new Date).getFullYear();
    let since = sinceDate.getFullYear();

    switch (since) {
      case currentYear - 1:
        since = 'last year';
        break;
      case currentYear:
        since = 'this year';
        break;
      default:
        since = sinceDate.getFullYear();
    }

    return since;
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
              since={this.getDate(this.props.user.profileData.data.created_at)}
              name={this.props.user.profileData.data.name}
              location={this.props.user.profileData.data.location}
              repoCount={this.props.user.profileData.data.public_repos}
              followersCount={this.props.user.profileData.data.followers}
              repos={this.props.repos.data.items}
            />
          );
        })()}
        <br />
      </div>
    );
  }
}
