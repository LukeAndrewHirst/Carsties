import NextAuth, { NextAuthOptions } from "next-auth"
import DuendeIdentityServer6 from "next-auth/providers/duende-identity-server6";

export const authoOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        DuendeIdentityServer6({
            id: 'id-server',
            clientId: 'nextApp',
            clientSecret: 'Z8v5kNopHt',
            issuer: 'http://localhost:5000',
            authorization: {params: {scope: 'openid profile auctionApp'}},
            idToken: true
        })
    ],
    callbacks: {
        async jwt({token, profile, account, user}) {
            if(profile) {
                token.username = profile.username
            }
            if(account){
                token.access_token = account.access_token
            }
            return token;
        },
        async session({session, token}) {
            if(token){
                session.user.username = token.username
            }

            return session;
        }
    }
}

const handler = NextAuth(authoOptions);
export { handler as GET, handler as POST }