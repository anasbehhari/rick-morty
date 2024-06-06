import { api } from "@/api/api";
import { API_ROUTES } from "@/enums";
import { API_PAGINATED_ROUTE, Character } from "@/types";

interface GetCharactersResponse extends API_PAGINATED_ROUTE {
  results: Character[];
}

export interface GetCharactersParams {
  page: number;
  species?: string;
  status?: string;
  gender?: string;
  name?: string;
}

export async function getCharacters(
  params: GetCharactersParams,
): Promise<GetCharactersResponse> {
  try {
    const response = await api.get<GetCharactersResponse>(
      API_ROUTES.GET_CHARACTERS,
      {
        params,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw new Error("Failed to fetch characters");
  }
}

export async function getOneCharacter(id: number): Promise<Character> {
  try {
    const response = await api.get<Character>(
      `${API_ROUTES.GET_CHARACTERS}/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching character:", error);
    throw new Error("Failed to fetch character");
  }
}
