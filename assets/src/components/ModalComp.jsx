import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
    FormHelperText,
    Image //------------Chakra UI para exibir a pré-visualização da imagem------------
}   from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../services/api"; //------------API------------

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit?.name || "");
    const [email, setEmail] = useState(dataEdit?.email || "");
    const [password, setPassword] = useState(dataEdit?.password || "");
    const [linkedin, setLinkedin] = useState(dataEdit?.linkedin || "");
    const [image, setImage] = useState(null); 
    const [imageUrl, setImageUrl] = useState(dataEdit?.imageUrl || null); 

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [linkedinError, setLinkedinError] = useState("");
    const [imageError, setImageError] = useState(""); 

    // ------------expressões regulares------------
    const handleSave = async () => {
        try {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
            const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/;

            if (!name || !email || !password || !linkedin) {
                return alert("Por favor, preencha todos os campos");
            }

            if (!emailRegex.test(email)) {
                setEmailError("Formato de e-mail inválido.");
                return;
            } else {
                setEmailError("");
            }

            if (!passwordRegex.test(password)) {
                setPasswordError("A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números.");
                return;
            } else {
                setPasswordError("");
            }

            if (!linkedinRegex.test(linkedin)) {
                setLinkedinError("URL do LinkedIn inválida.");
                return;
            } else {
                setLinkedinError("");
            }

            if (!image) {
                setImageError("Selecione uma imagem.");
                return;
            } else {
                setImageError("");
            }

            const userData = { name, email, password, linkedin, imageUrl };

            if (Object.keys(dataEdit).length) {
                await api.put(`/users/${dataEdit.id}`, userData);
            } else {
                await api.post("/users", userData);
            }

            const response = await api.get("/users");
            setData(response.data);
            onClose();
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(selectedImage);
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(selectedImage);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastre-se AQUI!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormLabel>Nome</FormLabel>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>E-mail</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <FormHelperText color="red">{emailError}</FormHelperText>
                            </Box>
                            <Box>
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FormHelperText color="red">{passwordError}</FormHelperText>
                            </Box>
                            <Box>
                                <FormLabel>LinkedIn</FormLabel>
                                <Input
                                    type="text"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
                                <FormHelperText color="red">{linkedinError}</FormHelperText>
                            </Box>
                            <Box>
                                <FormLabel>Foto</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <FormHelperText color="red">{imageError}</FormHelperText>
                                {imageUrl && (
                                    <Image src={imageUrl} alt="Pré-visualização da imagem" boxSize="100px" mt={2} />
                                )}
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter justifyContent="start">
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalComp;
