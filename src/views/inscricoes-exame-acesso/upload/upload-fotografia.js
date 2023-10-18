import React, { useState } from "react";
import { CButton, CCol, CFormGroup, CProgress, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import Swal from "sweetalert2";
import "../styles.scss";

export const UploadFotografia = () => {
  const [fotografia, setFotografia] = useState("");
  const [file3, setFile3] = useState();
  const [percent3, setPercent3] = useState(0);

  const handleUploadFotografia = () => {
    if (!file3) {
      Swal.fire(
        "Ops!",
        "Por favor, primeiro faça o carregamento da fotografia!",
        "error"
      );
    }

    const storageRef = ref(storage, `/files/${file3.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file3);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent3(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFotografia(url);
          localStorage.setItem("firebase-fotografia", url);
          console.log(url);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file3.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file3);
    uploadTask.cancel();
  };
  return (
    <CFormGroup row>
      <CCol xs="12" md="12">
        <div className="upload">
          <div className="image">
            <CImg
              src={fotografia ? fotografia : UploadImg}
              alt="carregamentoFotografia"
              fluid
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
          <input
            className="input-file"
            type="file"
            accept="image/*"
            id="carregamentoFotografia"
            name="carregamentoFotografia"
            onChange={(e) => setFile3(e.target.files[0])}
          />
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <strong>{percent3}%</strong>
            <CProgress
              className="progress-xs mt-2"
              precision={1}
              color="info"
              value={percent3}
            />
          </CCol>

          <CButton size="sm" color="info" onClick={handleUploadFotografia}>
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
