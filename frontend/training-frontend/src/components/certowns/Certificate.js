import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import authHeader from "../../service/AuthHeader";

import "./Certificate.css";

// certificate: id. name, description, daysValid
const CERTIFICATE_URL = "http://localhost:8080/api/cert_own/self/";
function Certificate() {
  const { id } = useParams();
  const [cert, setCert] = useState(null);
  const [image, setImage] = useState({ img: [] });

  useEffect(() => {
    const getCertificate = async () => {
      const result = await axios.get(CERTIFICATE_URL + id, {
        headers: authHeader(),
      });
      setCert(result.data);
    };

    const getImage = async () => {
      const result = await axios.get(CERTIFICATE_URL + "file/" + id, {
        headers: authHeader(),
        responseType: "blob",
      });
      setImage({ img: URL.createObjectURL(result.data) });
    };

    getCertificate();
    getImage();
  }, []);

  return (
    <div>
      {cert && (
        <div className="cert-container">
          <h3>{cert.certificate.name}</h3>
          <p>{cert.certificate.description}</p>
          <i>Действителен {cert.certificate.daysValid} месяцев</i>
          <p>Получен {cert.dateReceived}</p>
          <div className="photo">
            <img src={image.img} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Certificate;
