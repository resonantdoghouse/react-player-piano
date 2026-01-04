import React from 'react';
import Btn from '../Btn';

const EffectColumn = ({ title, isActive, onToggle, children }) => {
  return (
    <div className={`effect-column ${isActive ? 'effect-column--active' : ''}`}>
      <Btn
        onClick={onToggle}
        className={`effect-column__toggle ${isActive ? 'effect-column__toggle--active' : ''}`}
        text={title}
      />
      {isActive && (
        <div className="effect-column__controls">
          {children}
        </div>
      )}
    </div>
  );
};

export default EffectColumn;
