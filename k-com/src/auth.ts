import { handlers } from './mocks/handlers';
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from 'next/server';

export const {
    handlers: { GET, POST }, // API Route
    auth,
    signIn,
} = NextAuth({
    // 직접만든 페이지를 연결하는 부분
    pages: {
        signIn: '/i/flow/login',
        newUser: '/i/flow/signup',
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
              const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id: credentials.username,
                  password: credentials.password,
                }),
              })
      
              if (!authResponse.ok) {
                return null
              }
      
              const user = await authResponse.json()
              console.log('user', user);
              return {
                email: user.id,
                name: user.nickname,
                image: user.image,
                ...user,
              }
            },
          }),
    ]
});
// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
// } = NextAuth({
//   pages: {
//     signIn: '/i/flow/login',
//     newUser: '/i/flow/signup',
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials) {
//         const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             id: credentials.username,
//             password: credentials.password,
//           }),
//         })

//         if (!authResponse.ok) {
//           return null
//         }

//         const user = await authResponse.json()
//         console.log('user', user);
//         return {
//           email: user.id,
//           name: user.nickname,
//           image: user.image,
//           ...user,
//         }
//       },
//     }),
//   ]
// });