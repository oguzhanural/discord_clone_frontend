import { Button, Flex, Group, Modal, Stack, Text, rem } from '@mantine/core'
import { useModal } from '../../hooks/useModal'
import { useForm } from "@mantine/form"
import React from 'react';
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import classes from "../modals/CreateServerModal.module.css"
import { IconUpload, IconX } from '@tabler/icons-react';


function CreateServerModal() {

    const { isOpen, closeModal } = useModal("CreateServer");
    
    const form = useForm({
        initialValues: {
            name: "",
        },
        validate: {
            // name: (value) => (value.length < 2 ? "İsim yeterli uzunlukta değil" : null)
            name: (value) => !value.trim() && "Lütfen bir isim giriniz",
        }
    })
    const [imagePreview, setImagePreview] = React.useState<string | null>(null);

  return (
    <Modal
        opened={isOpen}
        onClose={closeModal}
        title="Sunucunu Oluştur"
    >
        <Text c="dimmed">
            Sunucun, arkadaşlarınla takıldığınız yerdir. Kendi sunucunu oluştur ve takılmaya başla.
        </Text>

            {/* onSubmit fonksiyonunu backenden sonra kullancağız */}
            <form onSubmit={()=>{}}>
                <Stack
                >
                    <Flex justify="center" align="center" direction={"column"}>
                        {!imagePreview && (
                            <Dropzone
                                onDrop={()=>{}}
                                className={classes.dropZone}
                                mt={"md"}
                                accept={IMAGE_MIME_TYPE}
                            >
                                <Group
                                    style={{
                                        minHeight:rem(100), 
                                        pointerEvents: 'none'
                                    }}
                                >
                                    <Dropzone.Accept >
                                        <IconUpload
                                            size={"3.2rem"} stroke={1.5}
                                        />

                                    </Dropzone.Accept>
                                    <Dropzone.Reject>
                                         <IconX size={"3.2rem"} stroke={1.5} />
                                    </Dropzone.Reject>
                                    <Dropzone.Idle>
                                        <IconUpload size="3.2rem" stroke={1.5} />
                                    </Dropzone.Idle>
                                    <>
                                    <Text size='xl' inline>
                                        Drag images here or click to select files.
                                    </Text>
                                    <Text size='md' inline c={"dimmed"} mt={7}>
                                        Upload a server icon
                                    </Text>
                                    </>
                                </Group>

                            </Dropzone> )
                        }

                        {
                            imagePreview && (
                                <Flex 
                                    pos={"relative"} 
                                    w={rem(150)} 
                                    h={rem(150)}
                                    mt={"md"}
                                >
                                    <>
                                     <Button
                                     onClick={()=>setImagePreview(null)}
                                     color='red'
                                        pos={"absolute"}
                                        style={{
                                            zIndex:1,
                                            borderRadius: "50%",
                                            padding: 0,
                                            width: rem(30),
                                            height: rem(30),
                                            top: 0,
                                        }}
                                     >
                                        <IconX color='white' />
                                     </Button>
                                     
                                    </>
                                    </Flex>
                            )
                        }
                    </Flex>
                </Stack>
            </form>
    </Modal>
  )
}

export default CreateServerModal