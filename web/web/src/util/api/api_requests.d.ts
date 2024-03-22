// Write your API Request Types Here

// Use this in place of {}
import type { UserType } from "@prisma/client";

export type NoParams = {}

export type OrgIdBaseParams = {
	orgId: string
}

export type CreateOrganizationBody = {
	orgId: string
	orgName: string
}

export type AuthLoginUserParams = OrgIdBaseParams & {}
export type AuthLoginUserBody = {
	userName: string,
	userPassword: string
}

export type AuthSignupUserParams = OrgIdBaseParams & {}
export type AuthSignupUserBody = {
	userName: string,
	userPassword: string,
	userDisplayName: string,
	userType: UserType
}

export type CreateClassroomBody = {
	classroomName : string
}

export type ClassroomParams = {
	orgId: string,
	classroomId: string
}

export type EditClassroomBody = CreateClassroomBody

export type CreateLectureBody = {
	lectureStartTimestamp : string | number | Date,
	lectureEndTimestamp : string | number | Date,
	title : string,
}

export type EditLectureBody = CreateLectureBody


export type LectureParams = {
	orgId: string,
	classroomId: string,
	lectureId: string
}

export type CreateTranscriptBody = {
	transcriptText : string
}

export type TranscriptParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	transcriptId: string
}

export type EditTranscriptBody = CreateTranscriptBody

export type TranscriptParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	transcriptId: string
}


export type AttendanceQueryParams = {
	userId: string
}

export type EnrollmentQueryParams = {
	userId: string
}

export type DeleteEnrollmentQueryParams = {
	classroomId: string
}

export type CreateQuizBody = {
	quizName : string
}

export type QuizParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	quizId: string
}

export type CreateQuizQuestionBody = {
	questionText: string
	questionOptions: string[]
	questionAnswerIndex: number
}

export type QuizQuestionParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	quizId: string,
	questionId: string
}

export type CreateQuizAttemptBody = {
	attemptTimestamp: string | number | Date
}

export type QuizAttemptParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	quizId: string,
	attemptId: string
}

export type CreateQuizResponseBody = {
	responseContent: string | null
	responseAccuracy: number
}

export type QuizResponseQueryParams = {
	questionId: string
}

export type CreateNotesBody = {
	notesContent: string
	notesTitle?: string
}

export type NotesParams = {
	orgId: string,
	classroomId: string,
	lectureId: string,
	notesId: string
}

export type EditNotesBody = CreateNotesBody

export type CreateReportTargetBody = {
	reportTargetEmail: string
}

export type ReportTargetParams = {
	reportTargetId: string,
}