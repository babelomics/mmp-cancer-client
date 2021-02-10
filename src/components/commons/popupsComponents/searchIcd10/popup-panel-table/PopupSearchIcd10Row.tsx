import React, { useCallback } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import { IIcd10, IIcd10Parent, ICommonFilter } from '../../../../tabPanelDiagnostic/tabs/interfaces';
import GaiaLink from '../../../GaiaLink';
import withTooltip from '../../../../../HoC/withTooltip';

interface IProps {
  item: IIcd10;
  filters: ICommonFilter;
  setFilter: (newFilter: ICommonFilter) => void;
  rowClick?: (data: IIcd10) => void;
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
    // maxWidth: 100
  },
  hideCell: {
    display: 'none'
  }
}));

function PopupSearchIcd10Row(props: IProps) {
  const { item: icd10, rowClick, filters, setFilter } = props;
  const classes = useStyles();
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      if (rowClick) {
        rowClick(icd10);
      }
    },
    [rowClick, icd10]
  );

  const handleLinkClick = (e: any, id: string) => {
    e.stopPropagation();
    setFilter({ ...filters, searchText: id });
  };

  const CeteredCell = (props: ICell) => {
    return (
      <TableCell className={`${classes.cursor} ${props.hide ? classes.hideCell : ''}`} style={{ textAlign: 'center' }}>
        {props.children}
      </TableCell>
    );
  };

  const Link = withTooltip(GaiaLink);
  return (
    <TableRow onClick={handleClick}>
      <CeteredCell>{icd10.id}</CeteredCell>
      <CeteredCell>{icd10.desc}</CeteredCell>
      <CeteredCell>{icd10.parent && <Link text={icd10.parent.id} tooltip={icd10.parent.desc} onClick={(e) => handleLinkClick(e, icd10.parent.id)} />}</CeteredCell>
      <CeteredCell>
        {icd10.children && (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {icd10.children.map((c: IIcd10Parent, i: number) => (
              <React.Fragment>
                <Link text={c.id} tooltip={c.desc} onClick={(e) => handleLinkClick(e, c.id)} />
                {i < icd10.children.length - 1 && <span style={{ marginRight: 5 }}>, </span>}
              </React.Fragment>
            ))}
          </div>
        )}
      </CeteredCell>
    </TableRow>
  );
}

export default PopupSearchIcd10Row;
