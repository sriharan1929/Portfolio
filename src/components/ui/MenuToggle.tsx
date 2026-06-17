interface MenuToggleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export const MenuToggle = ({ isOpen, onClick, className = "" }: MenuToggleProps) => (
  <button
    className={`flex flex-col justify-center items-center w-8 h-8 space-y-1.5 ${className}`}
    onClick={onClick}
    aria-label="Toggle navigation menu"
  >
    <span className={`block w-6 h-0.5 bg-text-dark transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
    <span className={`block w-6 h-0.5 bg-text-dark transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
    <span className={`block w-6 h-0.5 bg-text-dark transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
  </button>
);
