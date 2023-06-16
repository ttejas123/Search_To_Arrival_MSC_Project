import React from 'react';
import { ForwordNdBackword } from '../../assets/Icons/Icons';

interface BreadcrumbProps {
  links: { name: string; url: string }[];
  active: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ links, active }) => {
  return (
    <nav className="flex items-center text-gray-500 text-sm font-medium mb-4">
      <ol className="list-none p-0 inline-flex">
        {links.map((link, index) => (
          <li key={link.name}>
              <a
                className="transition duration-300 ease-in-out  flex justify-center items-center"
                href={link.url}
              >
                <span className='mr-1'>{link.name}</span>
                <ForwordNdBackword />
              </a>
          </li>
        ))}
        <li>
          <span className="ml-2 font-semibold FAQ-highlighter">{active}</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;
