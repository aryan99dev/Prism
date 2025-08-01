
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import type { Models } from "appwrite";
import { convertImageUrl } from "@/lib/utils";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link to={`/profile/${user.$id}`} className="user-card relative bg-black/30 backdrop-blur-[1.9px]">
      <img
        src={user.imageUrl ? convertImageUrl(user.imageUrl) : "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-full w-14 h-14 hover:scale-110 duration-300 ease-in-out"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium text-light-1 text-center line-clamp-1">
          {user.name}
        </p>
        <p className="small-regular text-light-3 text-center line-clamp-1">
          @{user.username}
        </p>
      </div>

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
