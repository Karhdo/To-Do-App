interface AuthorizedUser {
    id: number
    email: string
    name: string
    iat: number
    exp: number
}

declare namespace Express {
    interface Request {
        user: AuthorizedUser
    }
}
