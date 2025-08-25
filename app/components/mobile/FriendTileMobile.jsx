import React, {useState} from 'react';
import Logo from '~/components/Logo';

function FriendTileMobile({header, sub, content_header, content_sub}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <button
        onClick={toggleExpanded}
        className={`w-full rounded-xl bg-[#006f43] p-4 flex flex-col items-start transition-all duration-300 ${
          isExpanded ? 'h-auto' : 'h-auto'
        }`}
      >
        {/* Logo */}
        <div className="flex gap-4">
          <div className="w-[60px] flex items-start justify-center pt-2">
            <Logo></Logo>
          </div>

          <div className="flex flex-col text-left">
            <span className="p-large-mobile uppercase text-black">
              {header}
            </span>
            <p className="p-small-regular-mobile uppercase text-black">{sub}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-2">
          {/* Expandable Content */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pt-2 text-left pb-2">
              <p className="p-small-regular-mobile text-black">{content_sub}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default FriendTileMobile;
