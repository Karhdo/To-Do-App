import jwt from 'jsonwebtoken'

function jwtTokens(user_id: number, user_email: string, user_name: string) {
    const user = { user_id, user_email, user_name }
    const accessToken = jwt.sign(
        user,
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1d' },
    )
    const refreshToken = jwt.sign(
        user,
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: '20s' },
    )

    return { accessToken, refreshToken }
}

export { jwtTokens }
