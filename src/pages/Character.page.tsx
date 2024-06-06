import { BookMarkButton } from "@/components";
import { getOneCharacter } from "@/services/character";
import { Character } from "@/types";
import {
  Alert,
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Image,
  Loader,
  Text,
  Title,
} from "@mantine/core";
import { useLocalStorage } from "oceandev-hooks";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const GAP = 10;
const ORDER = 2;

export default function CharacterPage() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [setList, getList] = useLocalStorage<string>("list-bookmarked");

  useEffect(() => {
    const fetchCharacter = async () => {
      if (id) {
        try {
          const characterData = await getOneCharacter(Number(id));
          setCharacter(characterData);
        } catch (error) {
          setError("Failed to fetch character");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <Center className="h-screen">
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center className="h-screen">
        <Alert title="Error" color="red">
          {error}
        </Alert>
      </Center>
    );
  }
  const handleBookMarking = (id: number) => {
    const list = getList();
    try {
      const List = list ? JSON.parse(list) : [];
      if (Array.isArray(List)) {
        const currentIdExists = List.includes(id);
        if (currentIdExists) {
          setList(JSON.stringify(List.filter((el: number) => el !== id)));
        } else {
          setList(JSON.stringify([...List, id]));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container size="md" className="my-6">
      <Flex>
        <Flex className="w-full border border-slate-100 p-5 rounded-lg">
          {character && (
            <Flex
              direction="row"
              align="flex-start"
              gap="lg"
              className="w-phone:!flex-col w-phone:w-full w-phone:h-fit"
            >
              <Flex
                direction={"column"}
                className="relative w-54 w-phone:w-full"
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  radius="md"
                  className="w-full h-60 object-cover"
                />

                <BookMarkButton
                  className="mt-3"
                  isBookmarked={
                    getList() &&
                    JSON.parse(getList() as string).includes(character.id)
                  }
                  onClick={handleBookMarking.bind(null, character.id)}
                />
              </Flex>
              <Flex direction={"column"} gap={GAP}>
                <Title order={ORDER} className="mb-4">
                  {character.name}
                </Title>
                <Flex align={"center"} gap={GAP}>
                  <Text component="span" className="font-medium">
                    Status:
                  </Text>
                  <Badge color={character.status === "Alive" ? "green" : "red"}>
                    {character.status}
                  </Badge>
                </Flex>
                <Flex align={"center"} gap={GAP}>
                  <Text component="span" className="font-medium">
                    Species:
                  </Text>
                  <Text>{character.species}</Text>
                </Flex>
                <Flex align={"center"} gap={GAP}>
                  <Text component="span" className="font-medium">
                    Gender:
                  </Text>
                  <Text>{character.gender}</Text>
                </Flex>
                <Flex align={"center"} gap={GAP}>
                  <Text component="span" className="font-medium">
                    Origin:
                  </Text>
                  <Text>
                    {character.origin != null ? character.origin.name : ""}
                  </Text>
                </Flex>
                <Flex align={"center"} gap={GAP}>
                  <Text component="span" className="font-medium">
                    Location:
                  </Text>
                  <Text>
                    {character.location != null ? character.location.name : ""}
                  </Text>
                </Flex>

                {character.episode && (
                  <Flex direction={"column"} gap={GAP}>
                    <Text component="span" className="font-medium">
                      Episodes:
                    </Text>
                    <Box className=" w-full gap-2 grid grid-cols-2 w-phone:grid-cols-1">
                      {character.episode.map((ep, index) => (
                        <Box
                          className="p-2 border border-slate-200 rounded-md text-center text-xs w-full"
                          key={ep + index}
                        >
                          {ep}
                        </Box>
                      ))}
                    </Box>
                  </Flex>
                )}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
