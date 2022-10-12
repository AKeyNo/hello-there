import React from 'react';

export interface MenuButtonProps {
  data: {
    clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: string;
  };
}
