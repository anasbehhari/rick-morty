import { LOADING_GIF } from "@/common";
import { useAppLayoutContext } from "@/layouts/AppLayout";
import { Character, Info } from "@/types";
import { Flex, Pagination } from "@mantine/core";
import { CharacterCard } from "../cards";
const GAP = 30;
interface CharacterListProps {
  currentPage?: number;
  onPaginationChange?: (val: number) => void;
  characters: Character[];
  isLoading?: boolean;
  isErrored?: string;
  info?: Info;
}

function CharacterList({
  currentPage,
  onPaginationChange,
  characters = [],
  isErrored,
  isLoading,
  info,
}: CharacterListProps) {
  const { getList, setList } = useAppLayoutContext();

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

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center">
        <img src={LOADING_GIF} alt="Loading" />
      </div>
    );
  }

  if (isErrored) {
    return <div>{isErrored}</div>;
  }

  return (
    <>
      <Flex justify="center" className="w-full my-3">
        <Flex direction="column" gap={GAP} className="w-[1400px] max-w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 min-h-[700px]">
            {characters.map((character, index) => (
              <CharacterCard
                key={character.id + index}
                {...character}
                onBookmark={handleBookMarking}
                isBookmarked={
                  getList() &&
                  JSON.parse(getList() as string).includes(character.id)
                }
              />
            ))}
          </div>
          {info && (
            <Flex justify="center" className="w-full">
              <Pagination
                total={info.pages}
                defaultValue={currentPage}
                onChange={onPaginationChange}
              />
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default CharacterList;
