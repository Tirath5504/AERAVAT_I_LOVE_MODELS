import { withMiddlewares } from "@/util/middleware";
import { DeleteEnrollmentQueryParams, NoParams } from "@/util/api/api_requests";
import { authParser, requireAuthenticatedUser, requireAuthorizedUser, requireQueryParams, validateQueryParams } from "@/util/middleware/helpers";
import { DeleteEnrollmentQueryParamServerValidator } from "@/util/validators/server";
import db from "@/util/db";
import { DeletedEnrollmentResponse, GetEnrollmentsResponse } from "@/util/api/api_responses";

export const GET = withMiddlewares<NoParams>(
	authParser(),
	requireAuthenticatedUser(),
	requireAuthorizedUser({ matchUserTypes: ["Student"] }),
	async (req, res) => {

		const enrollments = await db.classroomEnrollment.findMany({
			where: {
				userId: req.user!.userId
			}
		})

		res.status(200).json<GetEnrollmentsResponse>({
			responseStatus: "SUCCESS",
			enrollments: enrollments
		})
	}
)

export const DELETE = withMiddlewares<NoParams, NoParams, DeleteEnrollmentQueryParams>(
	authParser(),
	requireAuthenticatedUser(),
	requireAuthorizedUser({ matchUserTypes: ["Student"] }),
	requireQueryParams(["classroomId"]),
	validateQueryParams(DeleteEnrollmentQueryParamServerValidator),
	async (req, res) => {
		const { classroomId } = req.query
		const deletedEnrollment = await db.classroomEnrollment.delete({
			where: {
				userId_classroomId: {
					userId: req.user!.userId,
					classroomId: classroomId
				}
			}
		})

		if (!deletedEnrollment) return res.status(404).json({ responseStatus: "ERR_NOT_FOUND" })

		res.status(200).json<DeletedEnrollmentResponse>({
			responseStatus: "SUCCESS",
			deletedEnrollment: deletedEnrollment!
		})
	}
)