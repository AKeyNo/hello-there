import { signOut } from 'next-auth/react';
import { CircleNotch, SignOut } from 'phosphor-react';
import MenuButton from './MenuButton';

const Menu = (): JSX.Element => {
  return (
    <div id='menu' className='flex flex-row justify-center w-3/12 h-screen'>
      <div className='w-1/2'></div>
      <div id='menu-buttons' className='w-1/2 py-4'>
        <MenuButton
          data={{
            clickHandler: () => signOut(),
          }}
        >
          <SignOut size={24} weight='fill' className='inline mr-2' />
          <h2 className='inline text-lg' data-cy='sign-out'>
            Sign Out
          </h2>
        </MenuButton>
      </div>
    </div>
  );
};

export default Menu;
