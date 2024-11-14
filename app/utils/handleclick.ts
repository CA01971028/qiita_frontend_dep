import { toggleLiked } from "./toggleLiked";
export const handleClick = (
  liked: boolean,
  setLiked: (liked: boolean) => void
) => {
  setLiked(toggleLiked(liked));
};
