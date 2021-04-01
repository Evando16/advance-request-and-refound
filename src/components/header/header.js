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
  padding: 1rem;
  color: #fff;
`;

const HeaderTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const HeaderTitleItem = styled.span`
  margin: ${(props) => (props.margin)};
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 959px) {
    flex-direction: column;
  }
`;

const HeaderQuadrant = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 33%;
  flex-grow : 1;
  
  @media screen and (max-width: 959px) {
    max-width: 100%;
  }
`;

const HeaderQuadrantItem = styled.div`
  display: flex;
  
  @media screen and (max-width: 959px) {
    flex-grow: 0;
    min-width: 50%;
  }
`;

const HeaderQuadrantEventInfo = styled(HeaderQuadrant)` 
  @media screen and (max-width: 959px) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const HeaderInfoCostCenterQuadrant = styled(HeaderQuadrant)`
  border-left: 1px solid #fff;
  border-right: 1px solid #fff;

  @media screen and (max-width: 959px) {
    padding: 1rem 0;
    margin: 1rem 0;
    border-left: none;
    border-right: none;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
`;

const HeaderText = styled.span`
  font-size: .875rem;
`;

const HeaderLabel = styled(HeaderText)`
  font-weight: 400;
  margin-right: 1rem;
  width: ${(props) => props.widthXl};

  @media screen and (min-width: 1280px) and (max-width: 1919px) {
    width: ${(props) => props.widthLg};
  }

  @media screen and (min-width: 960px) and (max-width: 1279px) {
    width: ${(props) => props.widthMd};
  }

  @media (max-width: 599px) {
    width: unset;
  }
`;

const HeaderData = styled(HeaderText)`
  font-weight: 700;
  text-align: ${(props) => (props.textAling ? props.textAling : 'start')};
`;

const HeaderDataCostCenter = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const HeaderCenterData = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'start')};

  @media screen and (min-width: 960px) {
    padding-left: ${(props) => props.paddingLeft};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export default function Header({ headerData }) {
  return (
    <HeaderContainer data-testid="solicitation__header">
      <HeaderTitle data-testid="header-title">
        <HeaderTitleItem margin="0 .625rem 0 0">{headerData.type}</HeaderTitleItem>
        <HeaderTitleItem margin="0 .625rem 0 0">-</HeaderTitleItem>
        <HeaderTitleItem margin="0 .625rem 0 0">{headerData.purpose}</HeaderTitleItem>
        <HeaderTitleItem>
          #
          {headerData.id}
        </HeaderTitleItem>
      </HeaderTitle>
      <HeaderContent>
        <HeaderQuadrantEventInfo>
          <HeaderQuadrantItem>
            <HeaderLabel widthXl="19%" widthLg="30%" widthMd="25%">Justification</HeaderLabel>
            <HeaderData>{headerData.justification}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel widthXl="19%" widthLg="30%" widthMd="25%">Finality</HeaderLabel>
            <HeaderData>{headerData.purpose}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel widthXl="19%" widthLg="30%" widthMd="25%">Event date</HeaderLabel>
            <HeaderData>{headerData.accountabilityExtraInfo.eventDate}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel widthXl="19%" widthLg="30%" widthMd="25%">Amount</HeaderLabel>
            <HeaderData>{headerData.accountabilityExtraInfo.amountOfPeople}</HeaderData>
          </HeaderQuadrantItem>
          <HeaderQuadrantItem>
            <HeaderLabel widthXl="19%" widthLg="30%" widthMd="25%">Project</HeaderLabel>
            {headerData.project
              ? <HeaderData>{headerData.project.title}</HeaderData>
              : <HeaderData>-</HeaderData>}
          </HeaderQuadrantItem>
        </HeaderQuadrantEventInfo>
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
          <HeaderCenterData alignItems="center" paddingLeft="8%">
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
