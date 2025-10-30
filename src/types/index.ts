import type { FC } from "react";

export interface INavLink {
  imgURL?: string;
  icon?: FC;
  route: string;
  label: string;
}
export type IUpdateUser = {
    userId: string;
    name: string;
    bio: string;
    imageId: string;
    imageUrl: URL | string;
    file: File[];
};

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageId: string;
    imageUrl: string;
    file: File[];
    location?: string;
    tags?: string;
};

export type IUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    imageUrl: string;
    bio: string;
};

export type INewUser = {
    name: string;
    email: string;
    username: string;
    password: string;
};

export type INewStory = {
    userId: string;
    file: File[];
    caption?: string;
    duration?: number; // in seconds, default 24 hours
};

export type IStory = {
    $id: string;
    creator: IUser;
    imageUrl: string;
    imageId: string;
    caption?: string;
    $createdAt: string;
    expiresAt: string;
    viewers: string[]; // array of user IDs who viewed the story
};