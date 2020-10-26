// rfce: react funcitonal component
import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './styles/InfoBox.css';

function InfoBox({ title, cases, isRed, active, total, ...props }) {

  return (
    <Card onClick={props.onClick}
    className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"}`}>
      <CardContent className='infobox-container'>
        {/* Title i.e. Coronavirus cases */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* +120k Number of cases */}
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--blue"}`}>{cases}</h2>

        {/* +1.2M Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;

