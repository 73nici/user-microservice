import { DataSource } from 'typeorm'

/**
 * The configuration for the database.
 */
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
        'dist/entities/*.js',
    ],
    subscribers: [],
    migrations: [],
})

/**
 * Initializes the connection to the database.
 */
export const initDataSource = async () => {
    await dataSource.initialize()
}