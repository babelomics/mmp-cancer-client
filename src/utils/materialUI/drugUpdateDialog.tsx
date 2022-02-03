
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import UpdateList from '../../components/features/updateList/UpdateList';

export interface drugUpdateDialogProps {
    open: boolean;
    selectedValue: string;
    onClose: (value: string) => void;
  }
  
export default function DrugUpdateDialog(props: drugUpdateDialogProps) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value: string) => {
      onClose(value);
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Actualizaciones del Drugset</DialogTitle>
        <UpdateList />
      </Dialog>
    );
  }
  