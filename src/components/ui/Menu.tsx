import { signOut } from 'next-auth/react';
import { SignOut } from 'phosphor-react';
import MenuButton from './MenuButton';

const Menu = (): JSX.Element => {
  return (
    <div
      id='menu'
      className='flex-1 hidden w-full h-screen min-h-screen sm:block'
    >
      <div id='menu-buttons' className='flex flex-row-reverse py-4'>
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
