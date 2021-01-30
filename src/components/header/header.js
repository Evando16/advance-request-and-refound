import React, { useEffect, useState } from 'react';
import { TextField, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import requestHeaderData from './header-service';

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

export default function Header() {
  const classes = useStyles();
  const [headerData, setHeaderData] = useState(null);
  useEffect(() => {
    async function getHeaderData() {
      setHeaderData(await requestHeaderData());
    }
    getHeaderData();
  }, []);

  // remove this and use improve
  if (!headerData) {
    return 'Loading...';
  }

  return (
    <Card className={classes.cardContainier}>
      <div>
        <span>{headerData.type}</span>
        <span>
          #
          {headerData.id}
        </span>
        <span>{headerData.justification}</span>
      </div>
      <div className={classes.cardContent}>
        <div>
          <div>
            <span>Nome</span>
            <span>{headerData.collaborator.name}</span>
          </div>
          <div>
            <span>E-mail</span>
            <span>{headerData.collaborator.email}</span>
          </div>
          <div>
            <span>Justificativa</span>
            <span>{headerData.justification}</span>
          </div>
          <div>
            <span>Finalidade</span>
            <span>{headerData.purpose}</span>
          </div>
          <div>
            <span>Projeto</span>
            <span>{headerData.project.name}</span>
          </div>
          <div>
            <span>Data</span>
            <span>{headerData.accountabilityExtraInfo.eventDate}</span>
          </div>
          <div>
            <span>Quantidade</span>
            <span>{headerData.accountabilityExtraInfo.amountOfPeople}</span>
          </div>
          <div>
            <span>Inclui café da manhã</span>
            <span>{headerData.accountabilityExtraInfo.budgetForBreakfast}</span>
          </div>
        </div>
        <div>
          <TextField label="Atribuir analista" variant="filled" />
          <div>
            <span>Centro de Custo</span>
            {headerData.costCenters
              .map((costCenter) => <span key={costCenter.name}>{costCenter.name}</span>)}
          </div>
        </div>
      </div>
    </Card>
  );
}
