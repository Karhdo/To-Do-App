import jwt from 'jsonwebtoken'

export type JwtData = Omit<AuthorizedUser, 'iat' | 'exp'>

export function jwtTokens(data: JwtData) {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1d' })
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '20s' })

    return { accessToken, refreshToken }
}
