import { User } from '@prisma/client';
import axios from 'axios';
import { CircleNotch, MapPin } from 'phosphor-react';
import { useEffect, useState } from 'react';

const ProfileInformation = ({ userID }: { userID: string }): JSX.Element => {
  const [userInformation, setUserInformation] = useState({} as User);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`/api/user/${userID}`);
      console.log(data);
      setUserInformation(data);
    };

    if (!userID) return;

    fetchUser();
  }, [userID]);

  // convert ISO time format (2021-07-01T00:00:00.000Z) to a string like "July 1, 2021"
  const convertTime = (time: string | Date) => {
    const date = new Date(time);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  if (userInformation) {
    const { username, aboutMe, joinDate, firstName, lastName, location } =
      userInformation;

    return (
      <div
        id='menu'
        className='flex flex-row w-full h-auto p-8 border-gray-700 border-y-4'
      >
        <div className='flex items-center justify-center w-32 h-32 mr-8 rounded-full bg-slate-500'>
          {username ? username[0] : '?'}
        </div>
        <div className='flex flex-col justify-center w-1/4'>
          {firstName || lastName ? (
            <div>
              {firstName} {lastName}
            </div>
          ) : null}
          <div className='text-gray-400'>@{username}</div>
          {location ? (
            <div className='text-gray-400'>
              <MapPin className='inline' size={16} weight='light' />
              {location}
            </div>
          ) : null}
          {joinDate ? (
            <div className='text-gray-400'>
              Joined {joinDate ? convertTime(joinDate) : null}
            </div>
          ) : null}
        </div>
        <div className='flex items-center justify-center'>{aboutMe}</div>
      </div>
    );
  } else {
    return (
      <div
        id='menu'
        className='flex flex-row justify-center w-full border-gray-700 place-items-center h-36 border-y-4'
      >
        <CircleNotch size={32} weight='fill' className='animate-spin' />
      </div>
    );
  }
};

export default ProfileInformation;
