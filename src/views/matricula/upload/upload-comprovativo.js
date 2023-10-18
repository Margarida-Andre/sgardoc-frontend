import React, { useState } from "react";
import { CButton, CCol, CFormGroup, CProgress, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import Swal from "sweetalert2";
import "../styles.scss";

export const UploadComprovativo = () => {
  const [comprovativo, setComprovativo] = useState("");
  const [file4, setFile4] = useState([]);
  const [percent4, setPercent4] = useState(0);

  const handleUploadPagamento = () => {
    if (!file4) {
      Swal.fire(
        "Ops!",
        "Por favor, primeiro faça o carregamento do comprovativo de pagamento!",
        "error"
      );
    }

    const storageRef = ref(storage, `/files/${file4.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file4);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent4(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setComprovativo(url);
          localStorage.setItem("firebase-comprovativo", url);
          console.log(comprovativo);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file4.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file4[0]);
    uploadTask.cancel();
  };

  return (
    <CFormGroup row>
      <CCol xs="12" md="12">
        <div className="upload">
          <div className="image">
            {comprovativo ? (
              <iframe
                title="comprovativo-pagamento"
                src={comprovativo}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            ) : (
              <CImg
                src={UploadImg}
                alt="comprovativo-pagamento"
                fluid
                style={{
                  width: "100%",
                  height: "100%",
                }}
              />
            )}
          </div>
          <input
            className="input-file"
            type="file"
            id="comprovativoPagamento"
            name="comprovativoPagamento"
            onChange={(e) => setFile4(e.target.files[0])}
          />
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <strong>{percent4}%</strong>
            <CProgress
              className="progress-xs mt-2"
              precision={1}
              color="info"
              value={percent4}
            />
          </CCol>

          <CButton size="sm" color="info" onClick={handleUploadPagamento}>
            <CIcon name="cil-scrubber" /> Upload
          </CButton>

          <CButton
            className="btn-upload"
            size="sm"
            color="info"
            onClick={cancelUpload}
          >
            <CIcon name="cil-x" /> Cancelar
          </CButton>
        </div>
      </CCol>
    </CFormGroup>
  );
};
