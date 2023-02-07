import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

/*
달력(Calendar) 컴포넌트에서 사용하는 날짜 박스

date: 날짜, YYYY-MM-DD
disabled: 날짜박스의 활성화 여부, className="disabled or abled" 할당
onClick: 클릭 시에 동작할 함수
onMouseEnter: 마우스 Enter시에 동작할 함수
onMouseLeave: 마우스 Leave시에 동작할 함수
*/
export default function DateBox({
  date,
  disabled,
  content,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  // disabled 여부에 따라 className 할당
  const disabledClass = disabled ? 'disabled' : 'abled'

  return (
    <DateContainer
      id={date}
      className={disabledClass}
      onMouseEnter={() => (onMouseEnter ? onMouseEnter(date) : null)}
      onMouseLeave={() => (onMouseLeave ? onMouseLeave(date) : null)}
      onClick={() => (onClick ? onClick(date) : null)}
    >
      <FlexBox>
        <p>{date.slice(-2)}</p>
        {content}
      </FlexBox>
    </DateContainer>
  )
}

DateBox.propTypes = {
  date: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
}

DateBox.defaultProps = {
  date: '',
  disabled: false,
  onClick: undefined,
  onMouseEnter: undefined,
  onMouseLeave: undefined,
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;
  white-space: nowrap;
  position: absolute;

  width: 100%;
  height: 100%;
`

// ::after는 날짜 박스를 정사각형으로 유지하기 위해서 사용
const DateContainer = styled.div`
  position: relative;

  width: 100%;

  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 5px;

  background-color: #ffffff;

  color: #000000;

  &::after {
    display: block;
    content: '';
    padding-bottom: 80%;
  }

  &.disabled {
    background-color: #dddddd;
  }
`