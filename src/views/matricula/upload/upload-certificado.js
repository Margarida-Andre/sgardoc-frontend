import React, { useState } from "react";
import { CButton, CCol, CFormGroup, CProgress, CImg } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import storage from "../../../services/firebaseConfig";
import UploadImg from "../../../assets/upload-de-imagem.jpg";
import Swal from "sweetalert2";
import "../styles.scss";

export const UploadCertificado = () => {
  const [certificado, setCertificado] = useState("");
  const [file2, setFile2] = useState();
  const [percent2, setPercent2] = useState(0);

  const handleUploadCertificado = () => {
    if (!file2) {
      Swal.fire(
        "Ops!",
        "Por favor, primeiro faça o carregamento do certificado!",
        "error"
      );
    }

    const storageRef = ref(storage, `/files/${file2.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file2);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setPercent2(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setCertificado(url);
          localStorage.setItem("firebase-certificado", url);
          console.log(url);
        });
      }
    );
  };

  const cancelUpload = () => {
    const storageRef = ref(storage, `/files/${file2.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file2);
    uploadTask.cancel();
  };
  return (
    <CFormGroup row>
      <CCol xs="12" md="12">
        <div className="upload">
          <div className="image">
            {certificado ? (
              <iframe
                title="certificado-ensiono-medio"
                src={certificado}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              ></iframe>
            ) : (
              <CImg
                src={UploadImg}
                alt="certificado-ensino-medio"
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
            id="certificadoEnsinoMedio"
            name="certificadoEnsinoMedio"
            onChange={(e) => setFile2(e.target.files[0])}
          />
          <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
            <strong>{percent2}%</strong>
            <CProgress
              className="progress-xs mt-2"
              precision={1}
              color="info"
              value={percent2}
            />
          </CCol>

          <CButton size="sm" color="info" onClick={handleUploadCertificado}>
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
