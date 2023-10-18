import React, { useState } from "react";
import { CButton, CCol, CFormGroup, CProgress, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import Swal from "sweetalert2";
import "../styles.scss";

export const UploadBi = () => {
  const [bi, setBi] = useState("");
  const [file1, setFile1] = useState();
  const [percent1, setPercent1] = useState(0);

  const handleUploadBI = () => {
    if (!file1) {
      Swal.fire(
        "Ops!",
        "Por favor, primeiro faça o carregamento do bilhete de identidade!",
        "error"
      );
    }

    const storageRef = ref(storage, `/files/${file1.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file1);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent1(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setBi(url);
          localStorage.setItem("firebase-bi", url);
          console.log(url);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file1}`);
    const uploadTask = uploadBytesResumable(storageRef, file1);
    uploadTask.cancel();
  };
  return (
    <CFormGroup row>
      <CCol xs="12" md="12">
        <div className="upload">
          <div className="image">
            {bi ? (
              <iframe
                title="carregamento-bi"
                src={bi}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            ) : (
              <CImg
                src={UploadImg}
                alt="carregamento-bi"
                fluid
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></CImg>
            )}
          </div>
          <input
            className="input-file"
            type="file"
            id="carregamentoBi"
            name="carregamentoBi"
            onChange={(e) => setFile1(e.target.files[0])}
          />
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <strong>{percent1}%</strong>
            <CProgress
              className="progress-xs mt-2"
              precision={1}
              color="info"
              value={percent1}
            />
          </CCol>

          <CButton size="sm" color="info" onClick={handleUploadBI}>
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
