import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  Stack,
  Text,
  TextInput,
  
  rem,
} from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE, DropzoneProps } from "@mantine/dropzone";
import classes from "../modals/CreateServerModal.module.css";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";

function CreateServerModal() {
  const { isOpen, closeModal } = useModal("CreateServer");

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      // name: (value) => (value.length < 2 ? "İsim yeterli uzunlukta değil" : null)
      name: (value) => !value.trim() && "Lütfen bir isim giriniz",
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const handleDropzoneChange: DropzoneProps["onDrop"] = (files) => {
    if (files.length === 0) {
      return setImagePreview(null);
    }
    // Image preview here:
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    setFile(files[0]);
    reader.readAsDataURL(files[0]);
  };

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Sunucunu Oluştur">
      <Text c="dimmed">
        Sunucun, arkadaşlarınla takıldığınız yerdir. Kendi sunucunu oluştur ve
        takılmaya başla.
      </Text>

      {/* onSubmit fonksiyonunu backenden sonra kullancağız */}
      <form onSubmit={() => {}}>
        <Stack>
          <Flex justify="center" align="center" direction={"column"}>
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => {
                  handleDropzoneChange(files);
                }}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={5 * 1024 ** 2}
                className={classes.dropZone}
                mt={"md"}
                accept={IMAGE_MIME_TYPE} // Only accept image file.
              >
                <Group
                  style={{
                    minHeight: rem(100),
                    pointerEvents: "none",
                  }}
                >
                  <Dropzone.Accept>
                    <IconUpload
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-blue-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-red-6)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconPhoto
                      style={{
                        width: rem(52),
                        height: rem(52),
                        color: "var(--mantine-color-dimmed)",
                      }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl" inline>
                      Drag images here or click to select files.
                    </Text>
                    <Text size="md" inline c={"dimmed"} mt={7}>
                      Upload a server icon
                    </Text>
                  </>
                </Group>
              </Dropzone>
            )}

            {imagePreview && (
              <Flex pos={"relative"} w={rem(150)} h={rem(150)} mt={"md"}>
                <>
                  <Button
                    onClick={() => setImagePreview(null)}
                    color="red"
                    pos={"absolute"}
                    style={{
                      zIndex: 1,
                      borderRadius: "50%",
                      padding: 0,
                      width: rem(30),
                      height: rem(30),
                      top: 0,
                      right: 18,
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    w={rem(150)}
                    h={rem(150)}
                    radius={"50%"}
                    pos={"absolute"}
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server Name"
            placeholder="Enter a server name"
            required
            {...form.getInputProps("name")}
            error={form.errors.name}
          />
          <Button
            disabled={!!form.errors.name}
            w={"100%"}
            type="submit"
            variant="gradient"
            mt={"md"}
          >
            Create Server
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}

export default CreateServerModal;
