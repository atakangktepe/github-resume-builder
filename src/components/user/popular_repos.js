import React, { PropTypes } from 'react';
const style = require('./style.scss');

function PopularRepos(props) {
  return (
    <div>
      {props.repos.map(repo => {
        return (
          <div key={repo.url} className={style.repo}>
            <a href={repo.url}>
              {repo.name}
            </a>
            <br />
            <i>{repo.language}</i>
            <br /><br />
            <span dangerouslySetInnerHTML={{ __html: repo.description }}></span>
            <br />
            This repository has {repo.stargazers_count} stars and {repo.forks} forks.
            If you would like more information about this repository and my contributed code,
            please visit <a href={repo.url}>the repo</a> on GitHub.
          </div>
        );
      })}
    </div>
  );
}

PopularRepos.propTypes = {
  repos: PropTypes.array
};

export default PopularRepos;
