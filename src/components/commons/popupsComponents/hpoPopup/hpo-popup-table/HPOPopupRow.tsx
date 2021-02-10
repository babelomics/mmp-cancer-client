import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IHPOPopup } from '../interfaces';
import GaiaLink from '../../../GaiaLink';
import withTooltip from '../../../../../HoC/withTooltip';
import { ICommonFilter } from '../../../../tabPanelDiagnostic/tabs/interfaces';

interface IProps {
  item: IHPOPopup;
  filters: ICommonFilter;
  rowClick?: (data: IHPOPopup) => void;
  setFilter: (newFilter: ICommonFilter) => void;
}

interface ICell {
  children: any;
  hide?: boolean;
  size?: boolean;
}

const useStyles = makeStyles((theme) => ({
  cursor: {
    cursor: 'pointer'
  },
  hideCell: {
    display: 'none'
  },
  sizeCell: {
    minWidth: '130px',
    width: '130px'
  }
}));

function HPOPopupRow(props: IProps) {
  const { item: hpo, rowClick, filters, setFilter } = props;
  const classes = useStyles();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(hpo);
      }
    },
    [rowClick, hpo]
  );
  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''} ${props.size ? classes.sizeCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };
  const handleLinkClick = (e: any, id: string) => {
    e.stopPropagation();
    setFilter({ ...filters, searchText: id });
  };

  const Link = withTooltip(GaiaLink);
  return (
    <TableRow onClick={handleClick}>
      <CeteredCell>{hpo.hpoId}</CeteredCell>
      <CeteredCell>{hpo.name}</CeteredCell>
      <CeteredCell>
        <div style={{ whiteSpace: 'normal', width: '500px', maxWidth: '500px', textAlign: 'justify' }}>{hpo.def}</div>
      </CeteredCell>
      <CeteredCell size>
        {hpo.parents && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {hpo.parents.map((p: string, i: number) => (
              <React.Fragment>
                <Link text={p} tooltip={p} onClick={(e) => handleLinkClick(e, p)} />
                {i < hpo.parents.length - 1 && <span style={{ marginRight: 5 }}>, </span>}
                {/* <span style={{ marginRight: 5 }}>, </span> */}
              </React.Fragment>
            ))}
          </div>
        )}
      </CeteredCell>
      <CeteredCell size>
        {hpo.children && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {hpo.children.map((c: string, i: number) => (
              <React.Fragment>
                <Link text={c} tooltip={c} onClick={(e) => handleLinkClick(e, c)} />
                {i < hpo.children.length - 1 && <span style={{ marginRight: 5 }}>, </span>}
                {/* <span style={{ marginRight: 5 }}>, </span> */}
              </React.Fragment>
            ))}
          </div>
        )}
      </CeteredCell>
    </TableRow>
  );
}

export default HPOPopupRow;
