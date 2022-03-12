import React, { FC, useEffect } from "react";
import { Button, useDisclosure } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import "./info-button.css";
import { InfoModal } from "../info-modal";

type InfoButtonProps = Record<string, never>;

export const InfoButton: FC<InfoButtonProps> = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    onToggle();
  }, []);

  return (
    <>
      <span className="info-button">
        <Button
          aria-label="About"
          rightIcon={<InfoIcon />}
          colorScheme="teal"
          variant="outline"
          onClick={onToggle}
        >
          Help
        </Button>
      </span>
      <InfoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
