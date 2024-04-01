import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenuItem } from '../features/menuSlice';
import { GrClose } from 'react-icons/gr';

export default function Test({ title, children }) {
  const dispatch = useDispatch();
  const itemName = title.toLowerCase();

  // State to track position and dragging
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Event handler for starting drag
  const handleMouseDown = (event) => {
    setIsDragging(true);
    setPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  // Event handler for dragging
  const handleMouseMove = (event) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    }
  };

  // Event handler for ending drag
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Event listeners for mouse move and mouse up to handle dragging
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);

  // Cleanup event listeners on component unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="drag-container cbg">
      <div className="test-window"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <div className="test__bar" onMouseDown={handleMouseDown}>
          <h6>{title}</h6>
          <button
            onClick={() => dispatch(toggleMenuItem({ [itemName]: false }))}
          >
            <GrClose />
          </button>
        </div>

        <div className="test__body">{children}</div>
      </div>
    </div>
  );
}
