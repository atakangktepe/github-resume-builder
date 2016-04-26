import React, { PropTypes } from 'react';

function Website(props) {
  return (
    <div>
      <a href={props.website}>{ props.website }</a>
    </div>
  );
}

Website.propTypes = {
  website: PropTypes.string
};

export default Website;
