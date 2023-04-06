import React from 'react';

interface CreatorUsername {
  username: string;
}

export interface SayingInSayingBox {
  id: string;
  creatorID: string;
  repliedToSayingID: string | null;
  text: string;
  createdAt: Date;
  creator?: CreatorUsername;
}

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

export interface SignInFields {
  username: string;
  password: string;
}
