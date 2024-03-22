import { withMiddlewares } from "@/util/middleware";

export const GET = withMiddlewares(
	async (req, res) => {
		res.status(200).json({
			responseStatus: "SUCCESS",
			test: new Date(Date.now())
		})
	}
)