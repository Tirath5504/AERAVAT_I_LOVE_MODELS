"use client"

import React, { useEffect, useState } from "react";
import QuizCard from "./(components)/QuizCard";
import { useRouter } from "next/navigation";

export default function QuizPage({
  params,
}: {
  params: { lectureId: string, classId: string };
}) {
  const [quizArray, setQuizArray] = useState<any>([])
  const [attemptId, setAttemptId] = useState<string>("")
  
  const getData = async() => {
    const res = await fetch(`/api/orgs/test/classroom/${params.classId}/lecture/${params.lectureId}/quiz`)
    const data = await res.json()
    if(data.responseStatus !== 'SUCCESS') useRouter().push(`/class/${params.classId}/`)
    const promises = data.quizes.map(async (quiz: any) => {
      const res2 = await fetch(`/api/orgs/test/classroom/${params.classId}/leacture/${params.lectureId}/quiz/${quiz.quizId}/attempt`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({attemptTimestamp:Date.now()})
      } )
      const data2 = await res2.json()
      setAttemptId(data2.createdQuizAttemptId)
      const res = await fetch(`/api/orgs/test/classroom/${params.classId}/lecture/${params.lectureId}/quiz/${quiz.quizId}/question`);
      const quizData = await res.json();
      return quizData.quizQuestions;
    });
    const results = await Promise.all(promises);
    setQuizArray(results.flat())
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className="min-h-[80vh] w-full flex justify-center items-center ">
      
      <QuizCard
        QuizArray={quizArray}
        lectureId={params.lectureId}
        classId={params.classId}
        attemptId = {attemptId}
      />
      <div className="gradient1"></div>
    </div>
  );
}
