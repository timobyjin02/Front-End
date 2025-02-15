import React, { useEffect, useState } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

import Box from '../common/Box';

import { DayPicker, DateFormatter, ClassNames, useNavigation } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './day-picker-customize.css';
import ko from 'date-fns/locale/ko';
import { format } from 'date-fns';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function CustomCaption(props) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const seasonEmoji = {
    spring: '🌸',
    summer: '🌊',
    autumn: '🍁',
    winter: '⛄️',
  };

  const getSeason = month => {
    const monthNumber = month.getMonth();
    if (monthNumber >= 2 && monthNumber < 5) return 'spring';
    if (monthNumber >= 5 && monthNumber < 8) return 'summer';
    if (monthNumber >= 7 && monthNumber < 11) return 'autumn';
    else return 'winter';
  };

  const season = getSeason(props.displayMonth);

  return (
    <Header>
      <Button disabled={!previousMonth} onClick={() => previousMonth && goToMonth(previousMonth)}>
        <IconStyled icon={faAngleLeft} />
      </Button>
      <Text>
        <span role="img" aria-label={season}>
          {seasonEmoji[season]}
        </span>
        {format(props.displayMonth, 'yyyy년 MM월', { locale: ko })}
        <span role="img" aria-label={season}>
          {seasonEmoji[season]}
        </span>
      </Text>
      <Button disabled={!nextMonth} onClick={() => nextMonth && goToMonth(nextMonth)}>
        <IconStyled icon={faAngleRight} />
      </Button>
    </Header>
  );
}

function Calendar({ resultData, setResultData }) {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (!selected) {
      setResultData(undefined);
    }
    if (selected?.from) {
      setResultData(resultData => ({ ...resultData, from: moment(selected.from).format().slice(0, 10) }));
      if (selected.to) {
        setResultData(resultData => ({ ...resultData, to: moment(selected.to).format().slice(0, 10) }));
      }
    }
  }, [selected]);
  return (
    <Wrapper size={[214, 214]} opacity={0.8}>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={setSelected}
        locale={ko}
        components={{
          Caption: CustomCaption,
        }}
      />
    </Wrapper>
  );
}

export default Calendar;

const Wrapper = styled(Box)`
  height: fit-content;
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 0;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
`;

const Button = styled.div`
  border: none;
  background-color: inherit;
  cursor: pointer;
  font-weight: bold;
`;

const IconStyled = styled(FontAwesomeIcon)``;

const Text = styled.span`
  font-size: 14px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
