'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function CustomButton({
  targetUrl,
  pageName,
}: {
  targetUrl: string;
  pageName: string;
}) {
  const router = useRouter();

  const handlePage = () => {
    router.push(`${targetUrl}`);
  };

  return (
    <div className="login">
      <a
        className=" leading-3 inline-block py-6 px-12 tracking-[3px] relative group cursor-pointer"
        onClick={() => {
          handlePage();
        }}
      >
        <span className="absolute top-0 left-0 h-full w-[calc(100%-10px)] my-0 mx-[5px] ">
          <span className="w-full h-full absolute top-0 left-0 before:content-[''] before:absolute before:bg-point dark:before:bg-gold before:top-0 before:left-0 before:w-[1px] before:h-full group-hover:before:my-[5px] group-hover:before:mx-0 group-hover:before:h-[calc(100%-10px)] after:content-[''] after:absolute after:bg-point dark:after:bg-gold after:top-0 after:right-0 after:w-[1px] after:h-full group-hover:after:my-[5px] group-hover:after:mx-0 group-hover:after:h-[calc(100%-10px)] login-btn-line--tall"></span>
          <span className="w-full h-full absolute top-0 left-0 before:content-[''] before:absolute before:bg-point dark:before:bg-gold before:top-0 before:left-0 before:h-[1px] before:w-full group-hover:before:mx-[5px] group-hover:before:my-0 group-hover:before:h-[calc(100%-10px)] group-hover:before:scale-x-0 after:content-[''] after:absolute after:bg-point dark:after:bg-gold after:bottom-0 after:h-[1px] after:w-full group-hover:after:mx-[5px] group-hover:after:my-0 group-hover:after:h-[calc(100%-10px)] group-hover:after:scale-x-0 login-btn-line--flat"></span>
        </span>
        <span className="absolute top-0 left-0 h-[calc(100%-10px)] w-full my-[5px] mx-0 ">
          <span className="w-full h-full absolute top-0 left-0 before:content-[''] before:absolute before:bg-point dark:before:bg-gold before:top-0 before:left-0 before:w-[1px] before:h-full group-hover:before:my-[5px] group-hover:before:mx-0 group-hover:before:h-[calc(100%-10px)] group-hover:before:scale-y-0 after:content-[''] after:absolute after:bg-point dark:after:bg-gold after:top-0 after:right-0 after:w-[1px] after:h-full group-hover:after:my-[5px] group-hover:after:mx-0 group-hover:after:h-[calc(100%-10px)] group-hover:after:scale-y-0 login-btn-line--tall"></span>
          <span className="w-full h-full absolute top-0 left-0 before:content-[''] before:absolute before:bg-point dark:before:bg-gold before:top-0 before:left-0 before:h-[1px] before:w-full group-hover:before:mx-[5px] group-hover:before:my-0 group-hover:before:w-[calc(100%-10px)] after:content-[''] after:absolute after:bg-point dark:after:bg-gold after:bottom-0 after:h-[1px] after:w-full group-hover:after:mx-[5px] group-hover:after:my-0 group-hover:after:w-[calc(100%-10px)] login-btn-line--flat"></span>
        </span>

        <span className="customBtnSolid absolute top-0 left-0 m-[10px] dark:bg-gold bg-point w-[calc(100%-20px)] h-[calc(100%-20px)] transform-origin-center transform scale-[0.85] opacity-0 transition-transform duration-500 cubic-bezier(0.165, 0.84, 0.44, 1) group-hover:opacity-100 group-hover:scale-100"></span>
        <span className="customBtnText text-point dark:text-gold font-medium uppercase transition-colors duration-300 relative group-hover:text-white">
          {pageName}
        </span>
      </a>
    </div>
  );
}
