import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { operations } from './duck';
import GlobalPopups from './GlobalPopups';

interface IProps {
  open?: boolean;
  type?: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm';
  message?: string;
  onClose?: () => void;
  setPopupOpen: (open: boolean) => void;
}

class Wrapper extends React.Component<IProps, {}> {
  render() {
    return <GlobalPopups {...this.props} />;
  }
}

const mapStateToProps = (state: IRootState) => ({
  open: state.globalPopups.open,
  type: state.globalPopups.type,
  message: state.globalPopups.message,
  onClose: state.globalPopups.onClose
});

const mapDispatchToProps = { ...operations };

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
