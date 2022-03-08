import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { FC } from "react";

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Litter Object Detection In Glasgow City</ModalHeader>
        <ModalCloseButton />
        <ModalBody>Lorem ipsum...</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
