import {ID, Query} from 'appwrite';


import {account, appwriteConfig, avatars, databases} from "@/lib/appwrite/confit.ts";

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

export async function saveUserToDB(user: {  accountId: string;
                                            email: string;
                                            name: string;
                                            imageUrl: URL;
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
export async function signInAccount(user: { email: string; password: string }) {
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

