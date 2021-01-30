import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles({
  cardContainier: {
    display: 'flex',
    flexDirection: 'column',
    backgroundImage: 'linear-gradient(to right, #00d7ce 3%, #00c5fc)',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
  },
  analystInput: {
    backgroundColor: '#fff',
  },
});

export default function Header({ headerData }) {
  const classes = useStyles();

  return (
    <div className={classes.cardContainier}>
      <div>
        <span>{headerData.type}</span>
        <span>-</span>
        <span>{headerData.purpose}</span>
        <span>
          #
          {headerData.id}
        </span>
      </div>
      <div className={classes.cardContent}>
        <div>
          <div>
            <span>Justification</span>
            <span>{headerData.justification}</span>
          </div>
          <div>
            <span>Finality</span>
            <span>{headerData.purpose}</span>
          </div>
          <div>
            <span>Event date</span>
            <span>{headerData.accountabilityExtraInfo.eventDate}</span>
          </div>
          <div>
            <span>Amount</span>
            <span>{headerData.accountabilityExtraInfo.amountOfPeople}</span>
          </div>
          <div>
            <span>Project</span>
            {headerData.project
              ? <span>{headerData.project.title}</span>
              : <span>-</span>}
          </div>
        </div>
        <div>
          <span>Cost center</span>
          {headerData.costCenters
            .map((costCenter) => <span key={costCenter.name}>{costCenter.name}</span>)}
        </div>
        <div>
          <FontAwesomeIcon icon={faGraduationCap} />
          <span>This solicitation will be paid by education / fraternization budget </span>
        </div>
      </div>
    </div>
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
