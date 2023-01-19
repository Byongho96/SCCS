import React from 'react'
import styled from 'styled-components'

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function WeekDays() {
  return (
    <FlexBox>
      {weekDays.map((day) => {
        return <div>{day}</div>
      })}
    </FlexBox>
  )
}

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
