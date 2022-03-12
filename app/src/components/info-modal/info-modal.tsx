import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC } from "react";

export interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: FC<InfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"lg"}
      scrollBehavior={"inside"}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Glasgow&apos;s Litter 🚯</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>
              Welcome! This is an interactive visualisation of litter on the
              streets of Glasgow City. It is part of a research project which
              aims to discover relationships between deprivation and litter.
            </Text>
            <Text>
              A neural network based object detection model has been applied to
              thousands of Google Street View images. Those images in which
              litter has been detected are marked on this map.
            </Text>
            <Text>
              The coloured regions represent each of the city&apos;s 23 wards.
              Hover over them to reveal their names.
            </Text>
            <Text>
              Each ward contains many data zones which are outlined in black.
              The 746 data zones are used to create a relative measure of
              deprivation in the{" "}
              <Link
                href="https://www.gov.scot/collections/scottish-index-of-multiple-deprivation-2020/"
                isExternal
              >
                Scottish Index of Multiple Deprivation
                <ExternalLinkIcon mx="2px" />
              </Link>{" "}
              study. It is these deprivation measures this this project seeks to
              relate to the amount of litter on the streets.
            </Text>
            <Text>Zoom into a cluster to reveal the markers within.</Text>
            <Text>
              Click on a{" "}
              <img
                src="litter.png"
                style={{ display: "inline", height: "20px" }}
              />{" "}
              marker to view the detected litter on the street view image.
            </Text>
            <Text>
              In addition to litter, the available public recycling facilities
              are marked using a{" "}
              <img
                src="recycling.png"
                style={{ display: "inline", height: "20px" }}
              />{" "}
              icon. Click on a marker to see its details.
            </Text>
            <Text>
              The ward, data zone, and marker layer visibility can be toggled
              using the control on the top right of the screen. This dialog can
              be launched again by pressing the &quot;Help&quot; button on the
              bottom left.
            </Text>
            <Text>
              You can try running the litter object detection model on a sample
              image by pressing the &quot;Detect&quot; button.
            </Text>
            <Text>
              The project is open source and hosted on{" "}
              <Link href="https://github.com/garee/glasgow-litter" isExternal>
                Github <ExternalLinkIcon mx="2px" />
              </Link>
              . Please visit to find out more.
            </Text>
            <Text>
              Please get in touch with me at{" "}
              <Link href="mailto:gary@garyblackwood.co.uk" isExternal>
                gary@garyblackwood.co.uk
              </Link>{" "}
              if you would like to know more.
            </Text>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
