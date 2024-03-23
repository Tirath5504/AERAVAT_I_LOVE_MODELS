import { withMiddlewares } from "@/util/middleware";
import { AuthSignupUserBodyServerValidator, AuthSignupUserParamsServerValidator } from "@/util/validators/server";
import { requireBodyParams, requireURLParams, validateBodyParams, validateURLParams } from "@/util/middleware/helpers";
import { AuthSignupUserBody, AuthSignupUserParams } from "@/util/api/api_requests";
import db from "@/util/db";
import { AuthUser } from "@/util/middleware/auth";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { FALLBACK_JWT_SECRET } from "@/util/constants";
import { AuthSignupUserResponse } from "@/util/api/api_responses";

export const POST = withMiddlewares<AuthSignupUserParams, AuthSignupUserBody>(
	requireURLParams(["orgId"]),
	validateURLParams(AuthSignupUserParamsServerValidator),
	requireBodyParams(["userDisplayName", "userPassword", "userType", "userName"]),
	validateBodyParams(AuthSignupUserBodyServerValidator),
	async (req, res) => {
		const { orgId } = req.params
		const { userName, userPassword, userDisplayName, userType } = req.body

		const hashedPassword = await bcrypt.hash(userPassword, 10);

		const createdUser = await db.user.create({
			data: {
				userOrgId: orgId,
				userName: userName,
				userPassword: hashedPassword,
				userType: userType,
				userDisplayName: userDisplayName
			}
		})

		const authUser: AuthUser = {
			userId: createdUser.userId,
			userOrgId: createdUser.userOrgId,
			userType: createdUser.userType,
			userDisplayName: createdUser.userDisplayName
		}
		const authJWT = sign(authUser, process.env.JWT_SECRET || FALLBACK_JWT_SECRET)
		res.setHeader("Set-Cookie", `auth-token=${authJWT};path=/`)

		res.status(200).json<AuthSignupUserResponse>({
			responseStatus: "SUCCESS",
			userType: createdUser.userType,
			userOrgId: createdUser.userOrgId,
			userId: createdUser.userId,
			userDisplayName: createdUser.userDisplayName
		})
	}
)