import React, { useState } from 'react';
/* --- Components --- */
import Icon from '../../../assets/icons';

const IconButton = ({
  handleClick,
  name,
  width,
  height,
  viewBox,
  color,
  disabled,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const outerColor = isHovered ? '#fab812' : '#E8716F';
  const selectedColor = color === 'white' ? '#ffffff' : outerColor;

  return (
    <button
      aria-label={name}
      type="button"
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        paddingTop: '0',
        paddingBottom: '0',
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={!!disabled}
      className="no-print"
    >
      <Icon
        name={name}
        width={width}
        height={height}
        viewBox={viewBox}
        fillInner="#ffffff"
        fillOuter={selectedColor}
      />
    </button>
  );
};

export default IconButton;
