import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";
import { api } from "./services/api"; // --------------API--------------

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setData(response.data.map(user => ({ ...user, photo: '' }))); // --------------photo--------------
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setData(prevData => prevData.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleSave = async (userData) => {
    try {
      if (userData.id) {
        // Update user
        await api.put(`/users/${userData.id}`, userData);
      } else {
        // Create new user
        await api.post("/users", userData);
      }
      const response = await api.get("/users");
      setData(response.data.map(user => ({ ...user, photo: '' }))); // --------------photo--------------
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="Poppins"
      bg="gray.100" // Fundo cinza
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO CADASTRO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th maxW={isMobile ? 5 : 100} fontSize="sm">Nome</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="sm">E-Mail</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="sm">Password</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="sm">LinkedIn</Th>
                <Th maxW={isMobile ? 5 : 100} fontSize="sm">Foto</Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ _id, name, email, password, linkedin, photo }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.200" }}>
                  <Td maxW={isMobile ? 5 : 100} fontSize="sm">{name}</Td>
                  <Td maxW={isMobile ? 5 : 100} fontSize="sm">{email}</Td>
                  <Td maxW={isMobile ? 5 : 100} fontSize="sm">{password}</Td>
                  <Td maxW={isMobile ? 5 : 100} fontSize="sm">{linkedin}</Td>
                  <Td maxW={isMobile ? 5 : 100} fontSize="sm">
                    {photo ? (
                      <Image src={photo} alt={`Foto de ${name}`} w="100px" h="100px" borderRadius="full" />
                    ) : (
                      "Sem foto"
                    )}
                  </Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ id: _id, name, email, password, linkedin, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(_id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          handleSave={handleSave}
        />
      )}
    </Flex>
  );
};

export default App;
