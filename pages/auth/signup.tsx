import axios from 'axios';
import { getCsrfToken } from 'next-auth/react';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { SignUpErrors, SignUpFields } from '../../lib/types/types';
import { getServerSession } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import authOptions from '../api/auth/[...nextauth]';

// TODO: reimplement showing errors
export default function SignUp() {
  const [userFields, setUserFields] = useState<SignUpFields>(
    {} as SignUpFields
  );

  const [errors, setErrors] = useState<SignUpErrors>({} as SignUpErrors);

  const signUpSubmit = async () => {
    window.event?.preventDefault();
    const { username, email, password, confirmPassword } = userFields;
    // do simple checks that can be done in the browser before sending POST requests
    if (password.length < 12) {
      window.alert('The password length must be greater than 12!');
      return;
    }

    if (password.length < 12 || password != confirmPassword) {
      window.alert('');
      return;
    }

    await axios
      .post('/api/user', { username, email, password })
      .then(() => {
        Router.push('/auth/signin');
      })
      .catch((error) => {
        if (error.response) {
          setErrors((previousErrors) => ({
            ...previousErrors,
            usernameError: error.response.data.usernameError ?? '',
            emailError: error.response.data.emailError ?? '',
          }));
        }
      });
  };

  // check to see if the passwords are the same as it is being typed
  useEffect(() => {
    if (userFields.password != userFields.confirmPassword) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        confirmPasswordError: 'These passwords do not match!',
      }));
    } else {
      setErrors((previousErrors) => ({
        ...previousErrors,
        confirmPasswordError: '',
      }));
    }
  }, [userFields]);

  return (
    <div className='flex items-center justify-center w-screen h-screen bg-gray-900'>
      <div className='px-32 py-16 bg-gray-800 rounded-lg shadow-xl'>
        <h1 className='text-xl font-extrabold' data-cy='signup-title'>
          Sign Up
        </h1>
        <form method='post' onSubmit={signUpSubmit}>
          <label className='block py-4'>
            Username
            <input
              name='username'
              type='text'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
              onChange={(e) => {
                setUserFields({
                  ...userFields,
                  username: e.target.value,
                } as SignUpFields);
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  usernameError: '',
                }));
              }}
            />
            {errors.usernameError != '' && (
              <div className='text-red-400'>{errors.usernameError}</div>
            )}
          </label>
          <label className='block pb-4'>
            Email
            <input
              name='email'
              type='email'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
              onChange={(e) => {
                setUserFields({
                  ...userFields,
                  email: e.target.value,
                } as SignUpFields);
                setErrors((previousErrors) => ({
                  ...previousErrors,
                  emailError: '',
                }));
              }}
            />
            {errors.emailError != '' && (
              <div className='text-red-400'>{errors.emailError}</div>
            )}
          </label>
          <label className='block pb-4'>
            Password
            <input
              name='password'
              type='password'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
              onChange={(e) => {
                setUserFields({
                  ...userFields,
                  password: e.target.value,
                } as SignUpFields);
              }}
            />
            {errors.passwordError != '' && (
              <div className='text-red-400'>{errors.passwordError}</div>
            )}
          </label>
          <label className='block pb-4'>
            Confirm Password
            <input
              name='confirmPassword'
              type='password'
              className='block w-full h-8 bg-gray-700 rounded-lg shadow-sm'
              onChange={(e) => {
                setUserFields({
                  ...userFields,
                  confirmPassword: e.target.value,
                } as SignUpFields);
              }}
            />
            {errors.confirmPasswordError != '' && (
              <div className='text-red-400'>{errors.confirmPasswordError}</div>
            )}
          </label>
          <button
            type='submit'
            className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'
            data-cy='user-create-an-account'
          >
            Create an account
          </button>
        </form>
        <hr className='w-full h-1 my-12 duration-100 rounded-lg bg-slate-50 opacity-10' />
        <Link href='/auth/signup'>
          <button className='block w-full px-32 py-4 font-bold duration-150 bg-gray-700 rounded-md shadow-lg text-slate-400 hover:text-white hover:bg-slate-500 hover:shadow-md'>
            Already have an account?
          </button>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
