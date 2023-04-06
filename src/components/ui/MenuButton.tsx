import { CircleNotch } from 'phosphor-react';
import { PropsWithChildren } from 'react';
import { MenuButtonProps } from '../../lib/types/types';

const MenuButton: React.FC<PropsWithChildren<MenuButtonProps>> = ({
  data,
  children,
}) => {
  return (
    <button
      className='w-full p-2 font-bold text-left duration-75 rounded-md text-slate-400 hover:text-white drop-shadow-xl hover:bg-slate-800 hover:drop-shadow-none'
      onClick={data.clickHandler}
    >
      {children}
    </button>
  );
};

export default MenuButton;
