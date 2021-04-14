import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton, makeStyles, TableCell, TableRow, Tooltip } from '@material-ui/core';
import routes from '../../../../router/routes';
import { IHumanPhenotype } from '../../../../individualsManagement/interfaces';
import { getAgeOfOnsetList, getLateralityList, getPaceOfProgressionList, getSeverityList, getSpatialPatternList, getTemporalPattern } from '../modifiersLists';
import { useTranslation } from 'react-i18next';
import { RemoveCircle } from '@material-ui/icons';

interface IProps {
  item: IHumanPhenotype;
  onDelete?: (phenotypeId: IHumanPhenotype) => void;
  rowClick: (hpo: IHumanPhenotype) => void;
}
interface ICell {
  children: any;
  hide?: boolean;
}
const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer',
    whiteSpace: 'normal',
    wordBreak: 'break-word'
  },
  hideCell: {
    display: 'none'
  },
  greyRow: {
    backgroundColor: 'lightgray'
  }
}));

function HPOPhenotypeRow(props: IProps) {
  const { t } = useTranslation();
  const { item: hpoPhenotype } = props;
  const classes = useStyles();
  const history = useHistory();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      props.rowClick(hpoPhenotype);
    },
    [history, hpoPhenotype]
  );

  const CenteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (props.onDelete) {
      props.onDelete(hpoPhenotype);
    }
  };

  return (
    <TableRow onClick={handleClick}>
      <CenteredCell>{hpoPhenotype.phenotypeId}</CenteredCell>
      <CenteredCell>{hpoPhenotype.observed}</CenteredCell>
      <TableCell style={{ textAlign: 'center' }}>
        {hpoPhenotype.modifiers.map((temp) => (
          <Tooltip title={temp} placement={'bottom-start'}>
            <div>
              {getSpatialPatternList(t).find((aux) => temp === aux.key)?.value ||
                getLateralityList(t).find((aux) => temp === aux.key)?.value ||
                getSeverityList(t).find((aux) => temp === aux.key)?.value ||
                getTemporalPattern(t).find((aux) => temp === aux.key)?.value ||
                getAgeOfOnsetList(t).find((aux) => temp === aux.key)?.value ||
                getPaceOfProgressionList(t).find((aux) => temp === aux.key)?.value}
            </div>
          </Tooltip>
        ))}
      </TableCell>
      <CenteredCell>{hpoPhenotype.comment}</CenteredCell>
      <CenteredCell>
        <IconButton edge="end" onClick={handleDelete}>
          <RemoveCircle />
        </IconButton>
      </CenteredCell>
    </TableRow>
  );
}

export default HPOPhenotypeRow;
