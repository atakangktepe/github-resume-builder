import React, { PropTypes } from 'react';
import Website from './website';
import PopularRepos from './popular_repos';

function Home(props) {
  return (
    <div>
      <div>
        <h2>Github Profile</h2>
        <p>
          On GitHub since { props.since }, { props.name } is a developer
          based in { props.location } with { props.repoCount } public repositories
          and { props.followersCount } followers.
        </p>
      </div>
      <div>
        <h2>Website</h2>
        <Website website={ props.website } />
      </div>
      <div>
        <h2>Popular Repositories</h2>
        <PopularRepos repos={ props.repos } />
      </div>
    </div>
  );
}

Home.propTypes = {
  since: PropTypes.any,
  name: PropTypes.string,
  website: PropTypes.string,
  location: PropTypes.string,
  repoCount: PropTypes.number,
  followersCount: PropTypes.number,
  repos: PropTypes.array
};

export default Home;
