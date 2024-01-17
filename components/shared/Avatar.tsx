import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Avatar() {
  return (
    <AvatarUI>
      <AvatarImage src="https://github.com/shadcn.png" alt="user avatar" />
      <AvatarFallback>JS</AvatarFallback>
    </AvatarUI>
  );
}
