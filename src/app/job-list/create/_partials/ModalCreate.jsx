import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';

const ModalCreate = ({ open, onClose, jobData, onConfirm }) => {
  return (
    <Dialog open={open} handler={onClose}>
      <DialogBody>
        <h3 className="mb-4 text-lg font-bold">Konfirmasi Lamaran</h3>
        <p>Apakah Anda yakin ingin menyimpan data lamaran berikut?</p>
        <div className="mt-4">
          <strong>Perusahaan:</strong> {jobData.perusahaan}
          <br />
          <strong>Posisi:</strong> {jobData.posisi}
          <br />
          <strong>Lokasi:</strong> {jobData.lokasi}
          {/* Include other fields as needed */}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="green" onClick={onConfirm}>
          Submit
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ModalCreate;
