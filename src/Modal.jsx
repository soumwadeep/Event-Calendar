const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>This is your modal content. Customize it as needed.</p>
      </div>
    </div>
  );
};

export default Modal;
