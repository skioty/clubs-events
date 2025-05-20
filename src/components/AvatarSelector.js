'use client';

import { useState } from 'react';
import Image from 'next/image';

const avatars = [
  { id: 1, src: '/Avatar1.png', alt: 'Avatar 1' },
  { id: 2, src: '/Avatar2.png', alt: 'Avatar 2' },
  { id: 3, src: '/Avatar3.png', alt: 'Avatar 3' },
  { id: 4, src: '/Avatar4.png', alt: 'Avatar 4' },
  { id: 5, src: '/Avatar5.png', alt: 'Avatar 5' },
  { id: 6, src: '/Avatar6.png', alt: 'Avatar 6' },
  { id: 7, src: '/Avatar7.png', alt: 'Avatar 7' },
  { id: 8, src: '/Avatar8.png', alt: 'Avatar 8' },
  { id: 9, src: '/Avatar9.png', alt: 'Avatar 9' },
  { id: 10, src: '/Avatar10.png', alt: 'Avatar 10' },
];

const AvatarSelector = ({ onSelect, currentAvatar }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar.src);
    onSelect(avatar.src);
  };

  return (
    <div className="avatar-selector">
      <div className="row g-2">
        {avatars.map((avatar) => (
          <div key={avatar.id} className="col-4">
            <div
              className={`avatar-option p-2 rounded cursor-pointer ${
                selectedAvatar === avatar.src ? 'selected' : ''
              }`}
              onClick={() => handleSelect(avatar)}
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                width={60}
                height={60}
                className="rounded-circle"
              />
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .avatar-option {
          cursor: pointer;
          transition: all 0.2s ease;
          border: 2px solid transparent;
        }
        .avatar-option:hover {
          background-color: #f8f9fa;
        }
        .avatar-option.selected {
          border-color: #0d6efd;
          background-color: #e9ecef;
        }
      `}</style>
    </div>
  );
};

export default AvatarSelector; 