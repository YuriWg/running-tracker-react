import React from 'react';

const Title = ({ mainTitle, subTitle }) => {
  return (
    <div className="title-area">
      <div className="title-background">
        <h1 className="main-title">{mainTitle}</h1>
        <div className="title-divider"></div>
        <h2 className="subtitle">{subTitle}</h2>
      </div>
    </div>
  );
};

export default Title;