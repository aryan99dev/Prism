import { SwatchBook } from "@/components/Logos/SwatchBook";
import { Earth } from "@/components/Logos/Earth";
import { LayoutGrid } from "@/components/Logos/LayoutGrid";
import { UserLG } from "@/components/Logos/User";
import { Blend } from "@/components/Logos/Blend";
import { Stories } from "@/components/Logos/Stories";

export const sidebarLinks = [
  {
    icon: LayoutGrid,
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    icon: Earth,
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    icon: Stories,
    imgURL: "/assets/icons/stories.svg",
    route: "/stories",
    label: "Stories",
  },
  {
    icon: UserLG,
    imgURL: "/assets/icons/people.svg",
    route: "/all-users",
    label: "People",
  },
  {
    icon: SwatchBook,
    imgUrl: "/assets/icons/people.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    icon: Blend,
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: LayoutGrid,
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    icon: Earth,
    imgURL: "/assets/icons/wallpaper.svg",
    route: "/explore",
    label: "Explore",
  },
  {
    icon: SwatchBook,
    imgURL: "/assets/icons/bookmark.svg",
    route: "/saved",
    label: "Saved",
  },
  {
    icon: Blend,
    imgURL: "/assets/icons/gallery-add.svg",
    route: "/create-post",
    label: "Create",
  },
];


export const items = [
  { label: "Home",
    route: "/" 
  },

  { 
    label: "Explore",
    route: "/explore" 
  },

  { 
    label: "Saves",
    route: "/Saved" 
  },

  { 
    label: "Post",
    route: "/Create" 
  },
];