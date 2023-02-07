import React from 'react'
import styled from 'styled-components'
import { useState, useMemo, useEffect } from 'react'
import ProblemItem from 'components/mypage/ProblemItem'
import Pagination from 'components/mypage/Pagination'
import axios from 'libs/axios'
import api from 'constants/api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PROBLEM_PER_PAGE = 7 // 페이지 당 문제 수
const BUTTON_PER_PAGINATION = 5 // 페이네이션에 표시할 버튼 수

export default function ProblemList() {
  // 리액트 훅 관련 함수 정의
  const navigate = { useNavigate }

  // 리덕스 -> 유저의 id 읽어오기
  const id = useSelector((state) => state.user.id)

  // useState
  const [problems, setProblems] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [startPagination, setStartPagination] = useState(0)

  // useEffect
  // mount시 problems 데이터 서버 요청
  useEffect(() => {
    const [url, method] = api('solvedProblem', { id })
    const config = { method }
    axios
      .request(url, config)
      .then((res) => {
        console.log(res)
        setProblems(res.data)
      })
      .catch((err) => {
        console.log(err)
        alert('문제 내역을 불러오지 못했습니다.')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // uesMemo
  // problems의 길이에 따라 마지막 페이지의 인덱스 저장
  const lastPage = useMemo(() => {
    if (problems.length / PROBLEM_PER_PAGE) {
      return parseInt(problems.length / PROBLEM_PER_PAGE) - 1
    }
    return parseInt(problems.length / PROBLEM_PER_PAGE)
  }, [problems])

  // 다음 페이지네이션
  const nextPagination = () => {
    if (startPagination + 2 * BUTTON_PER_PAGINATION - 1 > lastPage) {
      setCurrentPage(lastPage - BUTTON_PER_PAGINATION + 1)
      setStartPagination(lastPage - BUTTON_PER_PAGINATION + 1)
      return
    }
    setCurrentPage(startPagination + BUTTON_PER_PAGINATION)
    setStartPagination(startPagination + BUTTON_PER_PAGINATION)
  }

  // 이전 페이지네이션
  const previousPagination = () => {
    if (startPagination - BUTTON_PER_PAGINATION <= 0) {
      setCurrentPage(0)
      setStartPagination(0)
      return
    }
    setCurrentPage(startPagination - BUTTON_PER_PAGINATION)
    setStartPagination(startPagination - BUTTON_PER_PAGINATION)
  }

  return (
    <Container>
      <ProblemsContainer>
        {problems
          .slice(
            currentPage * PROBLEM_PER_PAGE,
            currentPage * PROBLEM_PER_PAGE + PROBLEM_PER_PAGE,
          )
          .map((problem, i) => {
            return (
              <ProblemItem
                problemName={problem.name}
                answerRate={problem.answerRate}
                submitDatetime={problem.date}
                difficulty={problem.difficulty}
                onClick={() => navigate(`/problem/${problem.id}`)}
                key={i}
              />
            )
          })}
      </ProblemsContainer>
      <Pagination
        currentPage={currentPage}
        startPagination={startPagination}
        onClick={setCurrentPage}
        numBtns={BUTTON_PER_PAGINATION}
        onClickLeft={previousPagination}
        onClickRight={nextPagination}
        onClickDoubleLeft={() => {
          setCurrentPage(0)
          setStartPagination(0)
        }}
        onClickDoubleRight={() => {
          setCurrentPage(lastPage - BUTTON_PER_PAGINATION + 1)
          setStartPagination(lastPage - BUTTON_PER_PAGINATION + 1)
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 80%;

  margin-top: 2rem;
`
const ProblemsContainer = styled.div`
  margin: 2rem 0rem;
`