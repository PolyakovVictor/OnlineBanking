import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

const NotificationModal: React.FC<NotificationModalProps> = ({
  title = 'Повідомлення',
  duration = 10000,
  children,
  onClose,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      onClose()
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <Modal
      show={show}
      onHide={() => onClose()}
      aria-labelledby="notification-modal-title"
      centered
      animation
    >
        <Modal.Header closeButton>
            <Modal.Title id="notification-modal-title">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex'>
                {children}
            </div>
        </Modal.Body>
    </Modal>
  );
};

export default NotificationModal;