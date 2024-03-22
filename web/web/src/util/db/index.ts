import {Pool} from "pg";
import {PrismaPg} from "@prisma/adapter-pg";
import {PrismaClient} from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const dbPool = new Pool({ connectionString })
const dbAdapter = new PrismaPg(dbPool)
const prismaClient = new PrismaClient()

export default prismaClient