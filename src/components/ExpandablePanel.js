import { useState } from "react";
import { FaCaretDown, FaCaretLeft } from "react-icons/fa";

const ExpandablePanel = ({ header, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleIconClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
        </div>
        <div onClick={handleIconClick} className="cursor-pointer">
          {isExpanded ? <FaCaretDown /> : <FaCaretLeft />}
        </div>
      </div>
      {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
