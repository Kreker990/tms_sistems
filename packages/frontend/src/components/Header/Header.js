import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
    return (
        <div className="flex items-center justify-between px-[20px] py-[10px] bg-white h-[56px]">
            <div className="flex items-center gap-[30px]">
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="flex items-center gap-[8px]">
                    <FaRegUser size={20}/>
                    <span className="text-[18px]">UserName</span>
                </div>
                <span>|</span>
                <MdOutlineLogout size={20} />
            </div>
        </div>
    )
};

export default Header;
