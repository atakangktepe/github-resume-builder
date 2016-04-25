import React, { PropTypes } from 'react';
import Website from './website';

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
    </div>
  );
}

Home.propTypes = {
  since: PropTypes.string,
  name: PropTypes.string,
  website: PropTypes.string,
  location: PropTypes.string,
  repoCount: PropTypes.number,
  followersCount: PropTypes.number
};

export default Home;
