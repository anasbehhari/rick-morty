import { Button } from "@mantine/core";
import { IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import clsx from "clsx";
import { useState } from "react";

interface BookMarkButtonProps {
  onClick?: (isBookmarked: boolean) => void;
  isBookmarked: boolean;
  className?: string;
}
export function BookMarkButton(props: BookMarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(props.isBookmarked);
  const classNames = clsx(props.className);
  return (
    <Button
      color="blue"
      variant={isBookmarked ? "gradient" : "outline"}
      className={classNames}
      onClick={() => {
        setIsBookmarked(!isBookmarked);
        if (props.onClick != null) {
          props.onClick(isBookmarked);
        }
      }}
    >
      {isBookmarked ? (
        <IconBookmarkFilled className="w-5 h-5" />
      ) : (
        <IconBookmark className="w-5 h-5" />
      )}
    </Button>
  );
}
