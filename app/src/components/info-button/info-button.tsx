import React, { FC, useEffect } from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import "./info-button.css";
import { InfoModal } from "../info-modal";

type InfoButtonProps = Record<string, never>;

export const InfoButton: FC<InfoButtonProps> = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  useEffect(() => {
    //onToggle();
  }, []);

  return (
    <>
      <span className="info-button">
        <IconButton
          aria-label="About"
          icon={<InfoIcon />}
          colorScheme={"teal"}
          onClick={onToggle}
        />
      </span>
      <InfoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
