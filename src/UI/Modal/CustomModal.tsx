import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

export default function CustomModal({ children, onClose, open }) {
  const dialog = useRef();

  useEffect(() => {
    if (dialog.current) {
      if (open) {
        dialog.current.showModal();
      } else {
        dialog.current.close();
      }
    }
  }, [open]);

  const handleClick = (e) => {
    if (e.target === dialog.current) {
      onClose();
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <dialog
      className={styles.modal}
      ref={dialog}
      onClick={handleClick}
      onCancel={handleCancel}
    >
      <div className={styles.content}>{children}</div>
    </dialog>,
    document.getElementById("modal-root")
  );
}
