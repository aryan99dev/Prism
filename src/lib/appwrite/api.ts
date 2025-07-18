import {ID, Query} from 'appwrite';


import {account, appwriteConfig, avatars, databases, storage} from "@/lib/appwrite/confit.ts";
import type { INewUser, IUpdatePost, INewPost, IUpdateUser } from '@/types';




export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountID: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })
        return newUser;
    } catch (error) {
     console.error(error);
     return error;
    }
}

export async function saveUserToDB(user: {  accountID: string;
                                            email: string;
                                            name: string;
                                            imageUrl: string;
                                            username ? : string; }) {
    try {
        const  newUser = await databases.createDocument(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            ID.unique(),
            user,
        )
        return newUser;
    }catch(error) {
        console.error(error);

    }
}
export async function SignInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createEmailPasswordSession(user.email, user.password);
        return session;
    } catch (error) {
        console.log(error);

    }
}


export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
    //     failsafe
        if (!currentAccount) throw Error;

        const  currentUser = await  databases.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID,
            [Query.equal('accountID', currentAccount.$id)],
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error){
        console.log(error);
    }
}


export async function SignOutAccount() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
}


export async function createPost(post: INewPost) {
  try {
      // Upload file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      
      if (!uploadedFile) throw Error;
      
      // Get file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }
      console.log({fileUrl}) ;
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      // Create post
      const newPost = await databases.createDocument(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        ID.unique(),
        {
          creator: post.userId,
          caption: post.caption,
          imageUrl: fileUrl,
          imageid: uploadedFile.$id,
          location: post.location,
          tags: tags,
        }
      );
  
      if (!newPost) {
        await deleteFile(uploadedFile.$id);
        console.log('Failed to create a new Post')
        throw Error;
      }
  
      return newPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== UPLOAD FILE
  export async function uploadFile(file: File) {
    try {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageID,
        ID.unique(),
        file
      );
  
      return uploadedFile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET FILE URL
  export function getFilePreview(fileId: string) {
    try {
      const fileUrl = storage.getFilePreview(
        appwriteConfig.storageID,
        fileId,
        2000,
        2000,
        undefined,
        100
      );
  
      if (!fileUrl) throw Error;
  
      return fileUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== DELETE FILE
  export async function deleteFile(fileId: string) {
    try {
      await storage.deleteFile(appwriteConfig.storageID, fileId);
  
      return { status: "successful" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET POSTS
  export async function searchPosts(searchTerm: string) {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        [Query.search("caption", searchTerm)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  export async function getInfinitePosts({ pageParam }: { pageParam: number }) {
    const queries: any[] = [Query.orderDesc("$updatedAt"), Query.limit(9)];
  
    if (pageParam) {
      queries.push(Query.cursorAfter(pageParam.toString()));
    }
  
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        queries
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET POST BY ID
  export async function getPostById(postId?: string) {
    if (!postId) throw Error;
  
    try {
      const post = await databases.getDocument(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        postId
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== UPDATE POST
  export async function updatePost(post: IUpdatePost) {
    const hasFileToUpdate = post.file.length > 0;
  
    try {
      let image = {
        imageUrl: post.imageUrl,
        imageId: post.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(post.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      // Convert tags into array
      const tags = post.tags?.replace(/ /g, "").split(",") || [];
  
      //  Update post
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        post.postId,
        {
          caption: post.caption,
          imageUrl: image.imageUrl,
          imageid: image.imageId,
          location: post.location,
          tags: tags,
        }
      );
  
      // Failed to update
      if (!updatedPost) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
  
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (hasFileToUpdate) {
        await deleteFile(post.imageId);
      }
  
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== DELETE POST
  export async function deletePost(postId?: string, imageId?: string) {
    if (!postId || !imageId) return;
  
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        postId
      );
  
      if (!statusCode) throw Error;
  
      await deleteFile(imageId);
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== LIKE / UNLIKE POST
  export async function likePost(postId: string, likesArray: string[]) {
    try {
      const updatedPost = await databases.updateDocument(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        postId,
        {
          likes: likesArray,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== SAVE POST
  export async function savePost(userId: string, postId: string) {
    try {
      const updatedPost = await databases.createDocument(
        appwriteConfig.databaseID,
        appwriteConfig.savesCollectionID,
        ID.unique(),
        {
          user: userId,
          post: postId,
        }
      );
  
      if (!updatedPost) throw Error;
  
      return updatedPost;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // ============================== DELETE SAVED POST
  export async function deleteSavedPost(savedRecordId: string) {
    try {
      const statusCode = await databases.deleteDocument(
        appwriteConfig.databaseID,
        appwriteConfig.savesCollectionID,
        savedRecordId
      );
  
      if (!statusCode) throw Error;
  
      return { status: "Ok" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET USER'S POST
  export async function getUserPosts(userId?: string) {
    if (!userId) return;
  
    try {
      const post = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
      );
  
      if (!post) throw Error;
  
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET POPULAR POSTS (BY HIGHEST LIKE COUNT)
  export async function getRecentPosts() {
    try {
      const posts = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.postCollectionID,
        [Query.orderDesc("$createdAt"), Query.limit(20)]
      );
  
      if (!posts) throw Error;
  
      return posts;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================================================
  // USER
  // ============================================================
  
  // ============================== GET USERS
  export async function getUsers(limit?: number) {
    const queries: any[] = [Query.orderDesc("$createdAt")];
  
    if (limit) {
      queries.push(Query.limit(limit));
    }
  
    try {
      const users = await databases.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        queries
      );
  
      if (!users) throw Error;
  
      return users;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== GET USER BY ID
  export async function getUserById(userId: string) {
    try {
      const user = await databases.getDocument(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        userId
      );
  
      if (!user) throw Error;
  
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  // ============================== UPDATE USER
  export async function updateUser(user: IUpdateUser) {
    const hasFileToUpdate = user.file.length > 0;
    try {
      let image = {
        imageUrl: user.imageUrl,
        imageId: user.imageId,
      };
  
      if (hasFileToUpdate) {
        // Upload new file to appwrite storage
        const uploadedFile = await uploadFile(user.file[0]);
        if (!uploadedFile) throw Error;
  
        // Get new file url
        const fileUrl = getFilePreview(uploadedFile.$id);
        if (!fileUrl) {
          await deleteFile(uploadedFile.$id);
          throw Error;
        }
  
        image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
      }
  
      //  Update user
      const updatedUser = await databases.updateDocument(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID,
        user.userId,
        {
          name: user.name,
          bio: user.bio,
          imageUrl: image.imageUrl,
          imageId: image.imageId,
        }
      );
  
      // Failed to update
      if (!updatedUser) {
        // Delete new file that has been recently uploaded
        if (hasFileToUpdate) {
          await deleteFile(image.imageId);
        }
        // If no new file uploaded, just throw error
        throw Error;
      }
  
      // Safely delete old file after successful update
      if (user.imageId && hasFileToUpdate) {
        await deleteFile(user.imageId);
      }
  
      return updatedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }