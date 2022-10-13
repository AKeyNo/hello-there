import React from 'react';

export interface MenuButtonProps {
  data: {
    clickHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    children?: string;
  };
}

export interface SignUpFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpErrors {
  usernameError: string | null;
  emailError: string | null;
  passwordError: string | null;
  confirmPasswordError: string | null;
}
