import { CharacterStatusEnum } from "@/enums";
import { Character } from "@/types";
import { Badge, Card, Group, Image, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { BookMarkButton } from "../others";
interface CharacterCardProps extends Character {
  isBookmarked: boolean;
  onBookmark: (id: number) => void;
}
export function CharacterCard({
  image,
  name,
  status,
  isBookmarked,
  species,
  origin,
  onBookmark,
  id,
}: CharacterCardProps) {
  const handleBookMarking = () => {
    onBookmark(id);
  };
  return (
    <Card
      className="relative h-fit"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section className="relative">
        <Image className="h-[300px]" src={image} alt={name} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Link
          className="truncate w-[60%] hover:underline"
          to={"/character/" + id}
        >
          <Text fw={500}>{name}</Text>
        </Link>
        <Badge color={status === CharacterStatusEnum.ALIVE ? "green" : "red"}>
          {status}
        </Badge>
      </Group>
      <Text size="sm">
        {species}, {origin.name}
      </Text>
      <BookMarkButton
        className="mt-3"
        isBookmarked={isBookmarked}
        onClick={handleBookMarking}
      />
    </Card>
  );
}
