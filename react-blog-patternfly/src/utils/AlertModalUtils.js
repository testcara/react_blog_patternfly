import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalVariant,
  Button,
} from "@patternfly/react-core";
import PropTypes from "prop-types";

// Base Modal component that handles common modal structure
const BaseModal = ({ isOpen, onClose, title, message, footerButtons }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant={ModalVariant.small}
      title={title}
      aria-labelledby="modal-title" // Accessibility improvement
    >
      <ModalBody>{message}</ModalBody>
      <ModalFooter>{footerButtons}</ModalFooter>
    </Modal>
  );
};

// AlertSuccessModal using the BaseModal component
const AlertSuccessModal = ({ isOpen, onClose, title }) => {
  const footerButtons = (
    <Button variant="secondary" onClick={onClose}>
      关闭
    </Button>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      message={title} // Same title used for message
      footerButtons={footerButtons}
    />
  );
};

// AlertDeletionModal using the BaseModal component
const AlertDeletionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonLabel = "删除", // Default parameter
  cancelButtonLabel = "取消", // Default parameter
}) => {
  const footerButtons = (
    <>
      <Button variant="secondary" onClick={onClose}>
        {cancelButtonLabel}
      </Button>
      <Button variant="danger" onClick={onConfirm}>
        {confirmButtonLabel}
      </Button>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      message={message}
      footerButtons={footerButtons}
    />
  );
};

// Prop validation
AlertSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

AlertDeletionModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmButtonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
};

export { AlertSuccessModal, AlertDeletionModal };
