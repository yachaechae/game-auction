'use client';

import React from 'react';

interface Props {
  error: Error;
}

const ErrorPage = ({ error }: Props) => {
  console.log('Error: ', error);

  return <div>예상치 못한 오류가 발생했습니다.</div>;
};

export default ErrorPage;
