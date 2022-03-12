import {
  Box,
  Button,
  Center,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { FC, useRef, useState } from "react";

export interface DetectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DetectModal: FC<DetectModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [canDetect, setCanDetect] = useState(true);
  const [confidence, setConfidence] = useState(0.25);
  const [hideConfidence, setHideConfidence] = useState(true);
  const [hideLabels, setHideLabels] = useState(true);
  const [imageFile, setImageFile] = useState<File>();
  const [imgSrc, setImgSrc] = useState("example.jpg");
  const fileInput = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLImageElement>(null);

  function onDetect() {
    setCanDetect(false);
    setLoading(true);

    const formData = new FormData();
    formData.append("confidence", `${confidence}`);
    formData.append("hideConfidence", `${hideConfidence}`);
    formData.append("hideLabels", `${hideLabels}`);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    if (!imageFile) {
      const fname = "example.jpg";
      fetch(fname)
        .then((res) => res.blob())
        .then((blob) => {
          formData.append("image", new File([blob], fname));
          detect(formData);
        })
        .catch(() => setLoading(false));
    } else {
      detect(formData);
    }
  }

  function detect(formData: FormData) {
    fetch("/api/detect", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.blob())
      .then((blob) => {
        if (image.current) {
          const imgSrc = URL.createObjectURL(blob);
          setImgSrc(imgSrc);
        }
      })
      .finally(() => setLoading(false));
  }

  function onUpload() {
    setCanDetect(false);
    fileInput?.current?.click();
  }

  function onFileInputChange() {
    const files = fileInput?.current?.files;
    if (files) {
      const file = files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          resizeImg(result, file).then((result) => {
            if (image.current) {
              image.current.src = result;
            }
          });
        }

        setCanDetect(true);
      };
      reader.readAsDataURL(file);
    }
  }

  function resizeImg(src: string, file: File): Promise<string> {
    const img = document.createElement("img");
    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 640;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, 640, 640);

        resolve(canvas.toDataURL(file.type));
      };

      img.src = src;
    });
  }

  function onHideConfidenceChange() {
    setHideConfidence(!hideConfidence);
  }

  function onHideLabelsChange() {
    setHideLabels(!hideLabels);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"lg"} isCentered>
      <ModalOverlay />
      <ModalContent maxW="700px" maxH="1000px">
        <ModalHeader>Detect Litter</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <Text>
              Try out the litter detection model by uploading your own image or
              using the sample below.
            </Text>
            <Center h="640px">
              <img
                src={imgSrc}
                width="640px"
                height="640px"
                alt="Street view image"
                ref={image}
              ></img>
            </Center>
            <Slider
              defaultValue={0.25}
              min={0.05}
              max={1}
              step={0.05}
              colorScheme="teal"
              onChange={(v) => setConfidence(v)}
            >
              <SliderMark
                value={confidence}
                textAlign="center"
                bg="teal"
                color="white"
                mt="-35"
                ml="-55"
                w="130px"
              >
                {Math.round(confidence * 100)}% Confidence
              </SliderMark>
              <SliderTrack>
                <Box position="relative" right={10} />
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Checkbox
              defaultChecked
              onChange={onHideConfidenceChange}
              colorScheme="teal"
            >
              Hide Confidence
            </Checkbox>
            <Checkbox
              defaultChecked
              onChange={onHideLabelsChange}
              colorScheme="teal"
            >
              Hide Labels
            </Checkbox>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={onDetect}
            colorScheme="teal"
            mr={3}
            isDisabled={!canDetect}
            isLoading={loading}
            loadingText="Detecting"
          >
            Detect
          </Button>
          <Button onClick={onUpload} mr={3}>
            Upload
          </Button>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInput}
            onChange={onFileInputChange}
          />
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
