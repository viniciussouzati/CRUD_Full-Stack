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
}   from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../services/api"; // --------- API ---------

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit?.name || "");
    const [email, setEmail] = useState(dataEdit?.email || "");
    const [password, setPassword] = useState(dataEdit?.password || "");
    const [linkedin, setLinkedin] = useState(dataEdit?.linkedin || "");

    const handleSave = async () => {
        try {
            if (!name || !email || !password || !linkedin) {
                return alert("Por favor, preencha todos os campos");
            }

            const userData = { name, email, password, linkedin };

            if (Object.keys(dataEdit).length) {
                // ---------PUT para atualizar o usuário---------
                await api.put(`/users/${dataEdit.id}`, userData);
            } else {
                // ---------POST---------
                await api.post("/users", userData);
            }

            // Após a operação ser bem-sucedida, atualize os dados do estado e feche o modal
            const response = await api.get("/users");
            setData(response.data);
            onClose();
        } catch (error) {
            console.error("Error saving user:", error);
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
                            </Box>
                            <Box>
                                <FormLabel>Senha</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormLabel>LinkedIn</FormLabel>
                                <Input
                                    type="text"
                                    value={linkedin}
                                    onChange={(e) => setLinkedin(e.target.value)}
                                />
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
