import React from "react";
import {Modal} from "@mui/material";
import {featherX} from "../utils/svgs";


type XenModalProps = {
  open: boolean,
  onClose: () => void,
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode,
}

const XenModal = ({ open, onClose, size = 'md', children }: XenModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className="flex items-center justify-center"
    >
      <div className="relative">
        <button className="bg-transparent p-0 absolute top-1 right-1 hover:border-0 border-0" onClick={onClose}>
          <span
            className="fill-black w-2"
            dangerouslySetInnerHTML={{ __html: featherX }}
          />
        </button>
        <div className={`bg-white p-4 pt-6 rounded ${size === 'sm' ? 'w-[320px]' : ''} ${size === 'md' ? 'w-[420px]' : ''}`}>
          {children}
        </div>
      </div>
    </Modal>
  );
}

export default XenModal;