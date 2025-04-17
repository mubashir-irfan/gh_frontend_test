import React from 'react';
import { Spinner } from '.';

const FullPageSpinner = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <Spinner />
    </div>
  );
};

export default FullPageSpinner;
