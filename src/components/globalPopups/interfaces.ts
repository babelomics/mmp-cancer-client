// Interfaces related to the component Example

export default interface IState {
  open: boolean;
  type: 'info' | 'error' | 'success' | 'warning' | 'warningConfirm';
  message: string;
  onClose?: () => void;
}
