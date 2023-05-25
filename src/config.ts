import { DataSource } from 'typeorm'

export const dataSource = new DataSource({
    type: 'mariadb',
    host: process.env.NODE_ENV === 'production' ? process.env.DB_HOST_PROD : process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [
        'dist/src/entities/*.js',
    ],
    subscribers: [],
    migrations: [],
})

export const initDataSource = async () => {
    await dataSource.initialize()
}