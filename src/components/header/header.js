import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(to right, #00d7ce 3%, #00c5fc);
  border-radius: 12px;
  padding: 24px 40px;
  color: #fff;
`;

const HeaderTyle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 2vh;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderQuadrant = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 33%;
  flex-grow : 1;
`;

const HeaderQuadrantItem = styled.div`
  display: flex;
`;

const HeaderInfoCostCenterQuadrant = styled(HeaderQuadrant)`
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;
`;

const HeaderText = styled.span`
  font-size: 0.875rem;
`;

const HeaderLabel = styled(HeaderText)`
  font-weight: 400;
  margin-right: 1vw;
  text-align: ${(props) => (props.textAling ? props.textAling : 'start')};
  width: ${(props) => (props.width ? props.width : '')};
`;

const HeaderData = styled(HeaderText)`
  font-weight: 700;
  text-align: ${(props) => (props.textAling ? props.textAling : 'start')};
`;

const HeaderDataCostCenter = styled.span`
  font-size: 1ream;
  font-weight: 700;
`;

const HeaderCenterData = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'start')};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;

export default function Header({ headerData }) {
  return (
    <HeaderContainer>
      <HeaderTyle>
        <span>{headerData.type}</span>
        <span>-</span>
        <span>{headerData.purpose}</span>
        <span>
          #
          {headerData.id}
        </span>
      </HeaderTyle>
      <HeaderContent>
        <HeaderQuadrant>
          <HeaderQuadrantItem>
            <HeaderLabel textAling="end" width="14%">Justification</HeaderLabel>
            <HeaderData>{headerData.justification}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel textAling="end" width="14%">Finality</HeaderLabel>
            <HeaderData>{headerData.purpose}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel textAling="end" width="14%">Event date</HeaderLabel>
            <HeaderData>{headerData.accountabilityExtraInfo.eventDate}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel textAling="end" width="14%">Amount</HeaderLabel>
            <HeaderData>{headerData.accountabilityExtraInfo.amountOfPeople}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel textAling="end" width="14%">Project</HeaderLabel>
            {headerData.project
              ? <HeaderData>{headerData.project.title}</HeaderData>
              : <HeaderData>-</HeaderData>}
          </HeaderQuadrantItem>
        </HeaderQuadrant>
        <HeaderInfoCostCenterQuadrant>
          <HeaderCenterData>
            <HeaderLabel>Cost center</HeaderLabel>
            {headerData.costCenters
              .map((costCenter) => (
                <HeaderDataCostCenter
                  key={costCenter.name}
                >
                  {costCenter.name}
                </HeaderDataCostCenter>
              ))}
          </HeaderCenterData>
        </HeaderInfoCostCenterQuadrant>
        <HeaderQuadrant>
          <HeaderCenterData alignItems="center">
            <Icon icon={faGraduationCap} />
            <HeaderData textAling="center">
              This solicitation will be paid by education / fraternization budget
            </HeaderData>
          </HeaderCenterData>
        </HeaderQuadrant>
      </HeaderContent>
    </HeaderContainer>
  );
}

Header.propTypes = {
  headerData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    justification: PropTypes.string.isRequired,
    purpose: PropTypes.string.isRequired,
    project: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
    accountabilityExtraInfo: PropTypes.shape({
      eventDate: PropTypes.string.isRequired,
      amountOfPeople: PropTypes.number.isRequired,
    }).isRequired,
    analyst: PropTypes.shape({
      id: PropTypes.number, name: PropTypes.string,
    }),
    costCenters: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
