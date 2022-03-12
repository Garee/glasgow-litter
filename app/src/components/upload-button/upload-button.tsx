import React, { FC } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import "./upload-button.css";
import { DetectModal } from "../detect-modal";

type UploadButtonProps = Record<string, never>;

export const UploadButton: FC<UploadButtonProps> = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <span className="upload-button">
        <Button
          aria-label="Detect"
          rightIcon={<ViewIcon />}
          colorScheme="teal"
          onClick={onToggle}
        >
          Detect
        </Button>
      </span>
      <DetectModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
