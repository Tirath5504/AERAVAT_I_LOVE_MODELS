import type {User} from "@prisma/client"

export type AuthUser = Pick<User, "userId" | "userOrgId" | "userType" | "userDisplayName" >

export type GetUser = Pick<User, "userId" | "userOrgId" | "userType" | "userDisplayName" | "userPassword" | "userName">
