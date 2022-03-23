import usersRouter from './users-routes'
import tasksRouter from './tasks-routes'
import tasksDetailRouter from './tasksDetail-routes'
import authRouter from './auth-routes'

function route(app: any) {
    app.use('/users', usersRouter)
    app.use('/tasks', tasksRouter)
    app.use('/tasks-detail', tasksDetailRouter)
    app.use('/auth', authRouter)
}

export default route
