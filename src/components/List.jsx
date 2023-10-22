import styles from "../List.css";
import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./partial/Header";
import Footer from "./partial/Footer";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AWS from "aws-sdk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const {
  REACT_APP_API_ENDPOINT,
  REACT_APP_ACCESS_ID,
  REACT_APP_SECRET_ACCESS_ID,
  REACT_APP_REGION,
  REACT_APP_BUCKET,
} = process.env;

AWS.config.update({
  accessKeyId: REACT_APP_ACCESS_ID,
  secretAccessKey: REACT_APP_SECRET_ACCESS_ID,
  region: REACT_APP_REGION,
});

const s3 = new AWS.S3({
  params: {
    Bucket: REACT_APP_BUCKET,
  },
});

function List() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [images, setImageName] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  const [uploaded, setUploaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const countryList = [
    "Select a country",
    "Argentina",
    "Australia",
    "Austria",
    "Belgium",
    "Brazil",
    "Canada",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Denmark",
    "Ecuador",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Kenya",
    "Lebanon",
    "Luxembourg",
    "Mexico",
    "Netherlands",
    "New Zealand",
    "Norway",
    "Panama",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Puerto Rico",
    "Romania",
    "Russia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

  const [title, setTitle] = useState("");
  const [country, setCountry] = useState(countryList[0]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const totalImagesAfterUpload = files.length + imageSrcs.length;

    if (files.length > 0 && totalImagesAfterUpload <= 5) {
      const newImageSrcs = [];
      let loadedImages = 0;

      files.forEach((file) => {
        const reader = new FileReader();

        setImageFile((prevImageFile) => [...prevImageFile, file]);

        reader.onload = (e) => {
          newImageSrcs.push(e.target.result);
          loadedImages++;

          if (loadedImages === files.length) {
            setImageSrcs((prevImageSrcs) => [
              ...prevImageSrcs,
              ...newImageSrcs,
            ]);
          }
        };

        reader.readAsDataURL(file);
      });
      setUploaded(true);
    } else {
      toast.error(
        `You can only upload up to 5 images. You currently have ${imageSrcs.length} uploaded.`
      );
    }
  };

  const handleRemoveImage = (index) => {
    const newImageSrcs = [...imageSrcs];
    newImageSrcs.splice(index, 1);
    setImageSrcs(newImageSrcs);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTitle = (event) => {
    setTitle(event.target.value);

    if (!event.target.value) {
      toast.error(`Please enter a title.`);
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  function generateRandomString() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@$";
    let result = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }
    result += localStorage.getItem("id");
    return result;
  }

  const randomString = generateRandomString();

  const handleUpload = async (file) => {
    const encryptedFileName = randomString + file.name;

    setImageName(images.push(encryptedFileName));

    if (file) {
      const params = {
        Key: randomString + file.name,
        ContentType: file.type,
        Body: file,
        ACL: "public-read",
      };

      s3.upload(params, (err, data) => {
        if (err) {
          toast.error("Error uploading file", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });

          console.log(err);
        } else {
          toast.success("File uploaded successfully");
        }
      });
    }
  };

  // const handleSubmit = async (event) => {
  //   if (!title || !price) {
  //     toast.error(`Please fill in all required fields.`);
  //   }

  //   imageFile.map((file) => {
  //     handleUpload(file);
  //   });

  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post(
  //       `${REACT_APP_API_ENDPOINT}/item`,
  //       {
  //         category,
  //         title,
  //         price,
  //         country,
  //         description,
  //         userID,
  //         user,
  //         images,
  //       },
  //       {
  //         withCredentials: true,
  //         credentials: "include",
  //       }
  //     );
  //     if (data) {
  //       toast.success("List successfully!");
  //       window.location.reload();
  //     }
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // };

  return (
    <div className="List">
      <div
        className="list-header-section"
        style={{ padding: "30px", paddingTop: "0px" }}
      >
        <Header showSearchBar={false} title={`Upload | Réjouir`} />
      </div>

      <ToastContainer />

      <div>
        {/* <div
          className="divider-container"
          style={{ textAlign: "center", margin: "30px 0px 0px 0px" }}
          s
        >
          <hr className="divider-line" />
         
          <hr className="divider-line" />
        </div> */}

        <div
          className="container justify-content-center mt-100"
          style={{
            display: "flex",
            marginTop: "24px",
            height: "100%",
            width: "100%",
            padding: "0px",
            marginBottom: "24px",
          }}
        >
          <div className="row" style={{ width: "100%", padding: "0px" }}>
            <div
              className={
                uploaded
                  ? "col-md-4 col-lg-7 col-sm-12"
                  : "col-md-12 col-lg-12 col-sm-12"
              }
              style={
                uploaded
                  ? {
                      width: "453px",
                      border: "1px solid #f1f1f1",
                      boxShadow: "0 0 10px rgb(186, 186, 186)",
                      padding: "24px",
                      borderRadius: "5px",
                      marginTop: { windowWidth } > 1208 ? "0px" : "",
                      marginLeft: { windowWidth } > 1208 ? "0px" : "",
                      backgroundColor: "white",
                    }
                  : { padding: "0px" }
              }
            >
              <div
                className="file-drop-area"
                style={
                  uploaded
                    ? { width: "100%", height: "200px" }
                    : { width: "100%", height: "480px" }
                }
              >
                <div className="file-input-btn">
                  <div className="svg-upload-icon">
                    <svg
                      className=""
                      height="32"
                      viewBox="0 0 32 32"
                      width="32"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M28 26h3a1 1 0 0 1 0 2h-3v3a1 1 0 0 1-2 0v-3h-3a1 1 0 0 1 0-2h3v-3a1 1 0 0 1 2 0v3zM2 28h16a1 1 0 0 1 0 2H1a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h28a1 1 0 0 1 1 1v17a1 1 0 0 1-2 0V2H2v26zm9-15a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm.174 7.353L6.768 23.64a1 1 0 1 1-1.536-1.28l5-6a1 1 0 0 1 1.35-.174l6.254 4.468 5.405-6.305a1 1 0 1 1 1.518 1.302l-6 7a1 1 0 0 1-1.34.163l-6.245-4.46z"
                        fill="#008f79"
                      ></path>
                    </svg>
                  </div>

                  <button>
                    Select Photos
                    <input
                      type="file"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                      onChange={handleFileChange}
                      multiple
                      accept="image/*"
                    />
                  </button>
                  <p style={{ paddingTop: "10px" }}>or drag photos here</p>
                  <p style={{ color: "darkgray" }}>(Up to 5 photos)</p>
                </div>
              </div>
              {imageSrcs.map((src, index) => (
                <div
                  style={{
                    padding: "5px",
                    display: "inline-block",
                    marginTop: "10px",
                    position: "relative",
                  }}
                  key={index}
                >
                  <img
                    key={index}
                    src={src}
                    alt={`Selected ${index}`}
                    style={{ width: "123px", height: "123px" }}
                    className="img-thumbnail"
                  />

                  <div className="D_Qy">
                    <p
                      className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                      style={{ textAlign: "center" }}
                    >
                      {index + 1}
                    </p>
                  </div>

                  <div
                    className="D_Qy-1"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <p
                      className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                      style={{ textAlign: "center" }}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {windowWidth > 1208 ? null : (
              <div style={{ padding: "20px" }}></div>
            )}

            {uploaded ? (
              <div
                className="col-md-7 col-lg-7 col-sm-12"
                style={
                  uploaded
                    ? {
                        border: "1px solid #f1f1f1",
                        boxShadow: "0 0 10px rgb(186, 186, 186)",
                        padding: "24px",
                        borderRadius: "5px",
                        marginLeft: { windowWidth } < 1208 ? "0px" : "10px",
                        margin: { windowWidth } < 1208 ? "0px" : "auto",
                        backgroundColor: "white",
                      }
                    : { padding: "0px" }
                }
              >
                <form
                // onSubmit={handleSubmit}
                >
                  <div className="form__group field">
                    <input
                      type="input"
                      className="form__field"
                      placeholder="Title"
                      name="title"
                      id="title"
                      required
                      onChange={handleTitle}
                    />
                  </div>

                  <div
                    className="form__group field "
                    style={{ marginTop: "10px", position: "relative" }}
                  >
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={handleCountryChange}
                    >
                      {countryList.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form__group field">
                    <input
                      type="input"
                      className="form__field"
                      placeholder="Location"
                      name="location"
                      id="location"
                      required
                      onChange={handleLocationChange}
                    />
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <textarea
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      maxLength={500}
                      placeholder="Description (Optional)"
                      className="form-control-textarea"
                      onChange={handleDescriptionChange}
                    ></textarea>
                    <p
                      style={{ textAlign: "right", margin: "0px" }}
                    >{`${description.length}/500`}</p>
                  </div>
                  <div className="list-item-btn">
                    <button
                      className="btn btn-success"
                      style={{ padding: "4px 24px", fontWeight: "bold" }}
                    >
                      Post!
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <br />
      <br />

      <Footer />
    </div>
  );
}

export default List;
