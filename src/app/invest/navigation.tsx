import React from "react";
import { Home, Key, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";

const Navigation = () => {
  return (
    <div className="fixed bottom-0 m-2 h-16 border border-blue-200 rounded-lg shadow-lg bg-blue-50 left-0 right-0 border-t">
      <div className="flex justify-around items-center h-16">
        <NavItem icon={<Home size={24} />} label="Home" />
        <NavItem icon={<Key size={24} />} label="Own" />
        <NavItem
          icon={<TrendingUp size={24} />}
          label="Invest"
          current={true}
        />
        <NavItem icon={<Settings size={24} />} label="Setting" />
      </div>
    </div>
  );
};

const NavItem = ({
  icon,
  label,
  current,
}: {
  icon: any;
  label: any;
  current?: any;
}) => {
  const label2 = label.toLowerCase();
  return (
    <Link
      href={`/${label2}`}
      className={`flex flex-col items-center justify-center w-1/4 h-full ${
        current ? "text-blue-500" : "text-gray-600 "
      }  focus: border-b-2`}
    >
      {icon}
      <span className="mt-1 text-xs">{label}</span>
    </Link>
  );
};

export default Navigation;
