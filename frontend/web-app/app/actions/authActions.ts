import { getServerSession } from "next-auth";
import { authoOptions } from "../api/auth/[...nextauth]/route";

export async function getSession() {
    return await getServerSession(authoOptions);
}

export async function getCurrentUser() {
    try{
        const session = await getSession();

        console.log(session);

        if(!session) return null;

        return session.user;
    }
    catch(err){
        return null;
    }
}