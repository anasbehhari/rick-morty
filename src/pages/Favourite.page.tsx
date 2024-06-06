import CharacterList from "@/components/list/List";
import { useAppLayoutContext } from "@/layouts/AppLayout";
import { getOneCharacter } from "@/services/character";
import { Character } from "@/types";
import { Alert, Flex, Loader, Text } from "@mantine/core";
import { IconStarFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const GAP = 20;
export default function FavouritePage() {
  const { getList } = useAppLayoutContext();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleInit = async () => {
      const list = getList();
      try {
        const List = list ? JSON.parse(list) : [];
        if (Array.isArray(List)) {
          const ids: number[] = List;
          const characterPromises = ids.map((id) => getOneCharacter(id));
          const characterData = await Promise.all(characterPromises);
          setCharacters(characterData);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    handleInit();
  }, [getList()]);

  return (
    <Flex direction="column" align="center" gap={GAP} className="my-10">
      <Flex direction="column" align="center" gap={GAP}>
        <Text className="flex items-center gap-2">
          <span className="text-3xl font-bold text-center">
            Rick and Morty Favourite Characters
          </span>
          <IconStarFilled className="text-yellow-400 size-7" />
        </Text>
      </Flex>
      {loading ? (
        <Loader color="blue" size="xl" />
      ) : (
        <>
          {characters.length === 0 ? (
            <Alert color="blue" className="w-fit text-center">
              Nothing to display click
              <Link to={"/"} className="text-blue-700 hover:underline">
                here
              </Link>
              to browse characters
            </Alert>
          ) : (
            <CharacterList characters={characters} />
          )}
        </>
      )}
    </Flex>
  );
}
