const Modal = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>Under Maintainance!</p>
      </div>
    </div>
  );
};

export default Modal;
