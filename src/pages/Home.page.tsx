import CharacterList from "@/components/list/List";
import Filters from "@/components/others/Filters";
import { useAppLayoutContext } from "@/layouts/AppLayout";
import { getCharacters, GetCharactersParams } from "@/services/character";
import { Character, Info } from "@/types";
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const GAP = 20;
const FIRST_PAGE = 1;
export function HomePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const species = searchParams.get("species");
  const status = searchParams.get("status");
  const name = searchParams.get("name");
  const gender = searchParams.get("gender");
  const [info, setInfo] = useState<Info | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [filters, setFilters] = useState<{
    species?: string;
    status?: string;
    gender?: string;
    name?: string;
  }>({
    gender: gender ?? undefined,
    species: species ?? undefined,
    status: status ?? undefined,
    name: name ?? undefined,
  });

  const updateURLParams = (
    params: Record<string, string | number | undefined>,
  ) => {
    const newSearchParams = new URLSearchParams();
    for (const key in params) {
      if (params[key] !== undefined) {
        newSearchParams.set(key, String(params[key]));
      }
    }
    navigate(`/?${newSearchParams.toString()}`);
  };
  const navigate = useNavigate();
  const { scrollTo } = useAppLayoutContext();

  const onPaginationChange = (val: number) => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    currentSearchParams.set("page", String(val));
    setCurrentPage(val);
    const newUrl = `/?${currentSearchParams.toString()}`;
    navigate(newUrl);
    scrollTo({
      direction: "top",
    });
  };

  const handleFilterChange = (key: string, value: string | null) => {
    const updatedFilters = {
      ...filters,
      [key]: value || undefined,
    };
    setFilters(updatedFilters);
    setCurrentPage(FIRST_PAGE);
    updateURLParams({ ...updatedFilters, page: FIRST_PAGE });
  };

  useEffect(() => {
    if (page) {
      setCurrentPage(page);
    }
  }, [page]);
  useEffect(() => {
    const fetchCharacters = async () => {
      setError(null);
      setLoading(true);
      try {
        const params: GetCharactersParams = {
          page: currentPage,
          ...filters,
        };
        const fetchedCharacters = await getCharacters(params);
        setCharacters(fetchedCharacters.results);
        setInfo(fetchedCharacters.info);
      } catch (error) {
        setError("no characters found");
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, filters]);
  return (
    <Flex
      direction={"column"}
      align={"center"}
      gap={GAP}
      className="my-10 w-phone:w-full"
    >
      <Flex
        direction={"column"}
        align={"center"}
        gap={GAP}
        className=" w-phone:w-full px-10 "
      >
        <h1 className="text-3xl font-bold text-center">
          Rick and Morty Characters
        </h1>
        <Filters onFilterChange={handleFilterChange} />
      </Flex>
      <CharacterList
        currentPage={currentPage}
        onPaginationChange={onPaginationChange}
        characters={characters}
        isLoading={loading}
        info={info}
        isErrored={error ?? undefined}
      />
    </Flex>
  );
}
