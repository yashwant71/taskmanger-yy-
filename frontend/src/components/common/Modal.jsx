import PropTypes from "prop-types";

const Modal = ({ children, onClose }) => {
  const handleOverlayClick = (e) => {
    // Close modal if the click is on the overlay (not inside the modal content)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center z-50 mt-0"
      style={{ marginTop: 0 }}
      onClick={handleOverlayClick}
    >
      <div className="flex justify-center max-w-lg w-full">{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
