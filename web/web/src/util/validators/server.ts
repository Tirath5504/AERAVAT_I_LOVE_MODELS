import {
	AttendanceQueryParams,
	AuthLoginUserBody,
	AuthLoginUserParams,
	AuthSignupUserBody,
	AuthSignupUserParams,
	ClassroomParams,
	CreateClassroomBody,
	CreateLectureBody,
	CreateNotesBody,
	CreateOrganizationBody,
	CreateQuizAttemptBody,
	CreateQuizBody,
	CreateQuizQuestionBody,
	CreateQuizResponseBody,
	CreateReportTargetBody,
	CreateTranscriptBody,
	DeleteEnrollmentQueryParams,
	EditClassroomBody,
	EditLectureBody,
	LectureParams,
	NotesParams,
	OrgIdBaseParams,
	QuizAttemptParams,
	QuizParams,
	QuizQuestionParams,
	QuizResponseQueryParams,
	ReportTargetParams,
	TranscriptParams
} from "@/util/api/api_requests";
import {ServerValidator} from "@/util/validators/index";
import db from "@/util/db";
import {IN_ARR, STRLEN_NZ} from "@/util/validators/utils";
import {UserType} from "@prisma/client";

export async function orgExists(orgId: string){
	const orgExists = await db.organization.findFirst({
		where: {
			orgId: orgId
		}
	})

	return orgExists !== null
}

export async function classroomExists(classId: string){
	const classExists = await db.classroom.findFirst({
		where: {
			classroomId: classId
		}
	})

	return classExists !== null
}

export async function lectureExists(lectureId: string){
	const lectureExists = await db.lecture.findFirst({
		where: {
			lectureId: lectureId
		}
	})
	
	return lectureExists !== null
}

export async function transcriptExists(transcriptId: string){
	const transcriptExists = await db.lectureTranscript.findFirst({
		where: {
			transcriptId: transcriptId
		}
	})

	return transcriptExists !== null
}

export async function quizExists(quizId: string){
	const quizExists = await db.quiz.findFirst({
		where: {
			quizId: quizId
		}
	})

	return quizExists !== null
}

export async function userExists(userId: string){
	const userExists = await db.user.findFirst({
		where: {
			userId: userId
		}
	})

	return userExists !== null
}

export async function quizQuestionExists(questionId: string) {
	const questionExists = await db.quizQuestion.findFirst({
		where: {
			questionId: questionId
		}
	})

	return questionExists !== null
}

export async function quizAttemptExists(id: string) {
	const attemptExists = await db.quizAttempt.findFirst({
		where: {
			attemptId: id
		}
	})

	return attemptExists !== null
}

export async function notesExists(notesId: string) {
	const notesExists = await db.notes.findFirst({
		where: {
			notesId: notesId
		}
	})

	return notesExists !== null
}

export async function reportTargetExists(id: string) {
	const reportTargetExists = await db.reportTarget.findFirst({
		where: {
			reportTargetId: id
		}
	})

	return reportTargetExists !== null
}

export const CreateOrgBodyServerValidator: ServerValidator<CreateOrganizationBody> = {
	orgId: async (orgId: string) => {
		return !(await orgExists(orgId))
	},
	orgName: async (orgName: string) => {
		const orgExists = await db.organization.findFirst({
			where: {
				orgName: orgName
			}
		})

		return orgExists === null
	}
}

export const BaseOrgIdParamServerValidator: ServerValidator<OrgIdBaseParams> = {
	orgId: orgExists
}

export const AuthLoginUserParamsServerValidator = BaseOrgIdParamServerValidator

export const AuthLoginUserBodyServerValidator: ServerValidator<AuthLoginUserBody, AuthLoginUserParams, AuthLoginUserBody> = {
	userName: async (userName: string, req) => {
		const {orgId} = req.params

		const userExists = await db.user.findFirst({
			where: {
				userOrgId: orgId,
				userName: userName
			}
		})

		return userExists !== null
	},
	// Don't validate password here, hash inside the handler if possible
	userPassword: STRLEN_NZ
}

export const AuthSignupUserParamsServerValidator: ServerValidator<AuthSignupUserParams> = BaseOrgIdParamServerValidator
export const AuthSignupUserBodyServerValidator: ServerValidator<AuthSignupUserBody, AuthSignupUserParams> = {
	userName: async (userName: string, req) => {
		const {orgId} = req.params

		const userExists = await db.user.findFirst({
			where: {
				userOrgId: orgId,
				userName: userName
			}
		})

		return userExists === null
	},
	userType: IN_ARR([UserType.Student, UserType.Teacher, UserType.Administrator]),
	userDisplayName: STRLEN_NZ,
	userPassword: STRLEN_NZ
}

export const CreateClassroomBodyServerValidator: ServerValidator<CreateClassroomBody> = {
	classroomName: async (className: string) => {
		return className.length > 0
	}
}

export const EditClassroomBodyServerValidator: ServerValidator<EditClassroomBody> = {
	classroomName: async (className: string) => {
		return className.length > 0
	}
}

export const ClassroomParamServerValidator: ServerValidator<ClassroomParams> = {
	orgId: orgExists,
	classroomId: classroomExists
}

export const CreateLectureBodyServerValidator: ServerValidator<CreateLectureBody> = {
	title: async(title: string) => {
		return title.length > 0
	},
	lectureEndTimestamp: async (lectureEndTimestamp: string | number | Date) => {
		return typeof (new Date(lectureEndTimestamp)) === "object"
	},
	lectureStartTimestamp: async (lectureStartTimestamp: string | number | Date) => {
		return typeof (new Date(lectureStartTimestamp)) === "object"
	}
}

export const EditLectureBodyServerValidator: ServerValidator<EditLectureBody> = CreateLectureBodyServerValidator

export const LectureParamServerValidator: ServerValidator<LectureParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists
}

export const CreateTranscriptBodyServerValidator: ServerValidator<CreateTranscriptBody> = {
	transcriptText: async(text: string) => {
		return text.length > 0
	}
}

export const TranscriptParamServerValidator: ServerValidator<TranscriptParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists,
	transcriptId: transcriptExists
}

export const AttendanceQueryParamServerValidator: ServerValidator<AttendanceQueryParams> = {
	userId: userExists
}

export const EnrollmentQueryParamServerValidator: ServerValidator<AttendanceQueryParams> = {
	userId: userExists
}

export const DeleteEnrollmentQueryParamServerValidator: ServerValidator<DeleteEnrollmentQueryParams> = {
	classroomId: classroomExists
}

export const CreateQuizBodyServerValidator: ServerValidator<CreateQuizBody> = {
	quizName: async(text: string) => {
		return text.length > 0
	}
}

export const QuizParamServerValidator: ServerValidator<QuizParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists,
	quizId: quizExists
}

export const CreateQuizQuestionBodyServerValidator: ServerValidator<CreateQuizQuestionBody> = {
	questionText: async(text: string) => {
		return text.length > 0
	},
	questionOptions: async(options: string[]) => {
		return options.length === 4
	},
	questionAnswerIndex: async(index: number) => {
		return index >= 0 && index < 4
	}
}

export const QuizQuestionParamServerValidator: ServerValidator<QuizQuestionParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists,
	quizId: quizExists,
	questionId: quizQuestionExists
}

export const CreateQuizAttemptBodyServerValidator: ServerValidator<CreateQuizAttemptBody> = {
	attemptTimestamp: async (date: string | number | Date) => {
		return typeof (new Date(date)) === "object"
	},
}

export const QuizAttemptParamServerValidator: ServerValidator<QuizAttemptParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists,
	quizId: quizExists,
	attemptId: quizAttemptExists
}

export const CreateQuizResponseBodyServerValidator: ServerValidator<CreateQuizResponseBody> = {
	responseAccuracy: async(accuracy: number) => {
		return accuracy >= 0 && accuracy <= 1
	}
}

export const QuizResponseQueryServerValidator: ServerValidator<QuizResponseQueryParams> = {
	questionId: quizQuestionExists
}

export const CreateNotesBodyServerValidator: ServerValidator<CreateNotesBody> = {
	notesContent: async(text: string) => {
		return text.length > 0
	}
}

export const NotesParamServerValidator: ServerValidator<NotesParams> = {
	orgId: orgExists,
	classroomId: classroomExists,
	lectureId: lectureExists,
	notesId: notesExists
}

export const CreateReportTargetBodyServerValidator: ServerValidator<CreateReportTargetBody> = {
	reportTargetEmail: async (text: string) => {
		return text.length > 0
	},
}

export const ReportTargetParamsServerValidator: ServerValidator<ReportTargetParams> = {
	reportTargetId: reportTargetExists
}