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
import {
  faCircleXmark,
  faCircleInfo,
  faCloudArrowUp,
  faCircleCheck,
  faSpinner,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import generateRandomUserId from "./functions/generateRandomUserId";
import generateRandomString from "./functions/generateRandomString";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet";

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

  const [images, setImages] = useState([]);
  const [imageFile, setImageFile] = useState([]);
  const [imageSrcs, setImageSrcs] = useState([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const countryList = [
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
    "Hong Kong",
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
    "Taiwan",
    "Ukraine",
    "United Kingdom",
    "United States",
    "Venezuela",
    "Zimbabwe",
  ];

  const countryEmojiMap = {
    Argentina: "🇦🇷",
    Australia: "🇦🇺",
    Austria: "🇦🇹",
    Belgium: "🇧🇪",
    Brazil: "🇧🇷",
    Canada: "🇨🇦",
    Chile: "🇨🇱",
    Colombia: "🇨🇴",
    "Costa Rica": "🇨🇷",
    Denmark: "🇩🇰",
    Ecuador: "🇪🇨",
    Finland: "🇫🇮",
    France: "🇫🇷",
    Germany: "🇩🇪",
    Greece: "🇬🇷",
    Hungary: "🇭🇺",
    "Hong Kong": "🇭🇰",
    Iceland: "🇮🇸",
    India: "🇮🇳",
    Indonesia: "🇮🇩",
    Ireland: "🇮🇪",
    Italy: "🇮🇹",
    Jamaica: "🇯🇲",
    Japan: "🇯🇵",
    Kenya: "🇰🇪",
    Lebanon: "🇱🇧",
    Luxembourg: "🇱🇺",
    Mexico: "🇲🇽",
    Netherlands: "🇳🇱",
    "New Zealand": "🇳🇿",
    Norway: "🇳🇴",
    Panama: "🇵🇦",
    Peru: "🇵🇪",
    Philippines: "🇵🇭",
    Poland: "🇵🇱",
    Portugal: "🇵🇹",
    "Puerto Rico": "🇵🇷",
    Romania: "🇷🇴",
    Russia: "🇷🇺",
    "South Africa": "🇿🇦",
    "South Korea": "🇰🇷",
    Spain: "🇪🇸",
    Sweden: "🇸🇪",
    Switzerland: "🇨🇭",
    Turkey: "🇹🇷",
    Taiwan: "🇹🇼",
    Ukraine: "🇺🇦",
    "United Kingdom": "🇬🇧",
    "United States": "🇺🇸",
    Venezuela: "🇻🇪",
    Zimbabwe: "🇿🇼",
  };

  const guest = generateRandomUserId();
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState(countryList[1]);
  const [location, setLocation] = useState("");
  const [eventData, setEvent] = useState("");
  const [description, setDescription] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(true);
  const [uploadCount, setUploadCount] = useState(0);
  const [success, setSuccess] = useState("no");

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
        setUploaded(true);
      });
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
    localStorage.setItem("searchQuery", "");
    window.addEventListener("resize", handleResize);

    if (localStorage.getItem("guest") === null) {
      localStorage.setItem("guest", guest);
    }

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

  const handleEventChange = (event) => {
    setEvent(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const randomString = generateRandomString();

  const handleUpload = async (file) => {
    setUploadingImages(true);
    return new Promise((resolve, reject) => {
      const encryptedFileName = randomString + file.name;

      setImages((prevImages) => [...prevImages, encryptedFileName]);

      if (file) {
        const params = {
          Key: encryptedFileName,
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
            reject(err);
          } else {
            resolve(encryptedFileName);
            setUploadingImages(false);
            setUploadCount((prevCount) => prevCount + 1);
            setSuccess("yes");
          }
        });
      } else {
        reject(new Error("No file provided for upload."));
      }
    });
  };

  emailjs.init("ICBNNOvdql2SEzaVX");

  const sendEmail = (e) => {
    emailjs.send("gmail_rejouir", "template_1wuvnh6").then(
      (result) => {
        window.location.reload();
      },
      (error) => {
        console.log("Failed...", error);
      }
    );
  };

  const handleSubmit = async (event) => {
    setUploading(true);
    setUploadCount(0); // Reset the upload count before starting

    if (!title || !country || !location) {
      toast.error(`Please fill in all required fields.`);
    }

    event.preventDefault();

    const uploadedImages = await Promise.all(
      imageFile.map((file) => handleUpload(file))
    );

    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/upload`,
        {
          guest,
          title,
          country,
          location,
          event: eventData,
          description,
          images: uploadedImages,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        // toast.success("Pending request sent successfully!");
        sendEmail();
        setTimeout(() => {
          setUploading(false);
        }, 3000);
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="List" style={{ paddingTop: "100px" }}>
      <div className="list-header-section">
        <Header showSearchBar={false} title={`Upload | Réjouir`} />
      </div>
      <Helmet>
        <link rel="canonical" href="https://www.rejouirxmas.com/list" />
      </Helmet>
      <ToastContainer />

      {uploading ? (
        <>
          <div
            className="popup"
            style={{
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: "24px",
                height: "100%",
                borderRadius: "10px",
              }}
            >
              <div className="status">
                <div>
                  <FontAwesomeIcon
                    icon={faCloudArrowUp}
                    style={{ color: "#79cee6" }}
                    size="2xl"
                    className="upload-icon"
                  />
                  <p>{`Uploaded ${uploadCount} images`}</p>
                </div>
                <div className="spinner-or-arrow-parent">
                  {uploadingImages === true ? (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="lg"
                      className="loading-spinner"
                      spin
                    />
                  ) : (
                    <FontAwesomeIcon icon={faArrowRight} />
                  )}
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    size="2xl"
                    className={`checkmark ${success}`}
                  />
                  <p>Pending requested!</p>
                </div>
              </div>
            </div>
          </div>

          {<div className="overlay"></div>}
        </>
      ) : null}

      <div>
        <div
          className="container justify-content-center mt-100"
          style={{
            display: "flex",
            marginTop: "15px",
            height: "100%",
            width: "100%",
            paddingLeft: "10px",
            paddingRight: "10px",
            marginBottom: "24px",
          }}
        >
          <div className="row" style={{ width: "100%", padding: "0px" }}>
            <div
              className={
                uploaded
                  ? "col-md-5 col-lg-7 col-sm-12"
                  : "col-md-12 col-lg-12 col-sm-12"
              }
              style={
                // uploaded
                // ?
                {
                  width: "453px",
                  border: "1px solid #f1f1f1",
                  boxShadow: "0 0 10px rgb(186, 186, 186)",
                  padding: "24px",
                  borderRadius: "5px",
                  marginTop: { windowWidth } > 1208 ? "0px" : "",
                  marginLeft: { windowWidth } > 1208 ? "0px" : "",
                  backgroundColor: "white",
                }

                // : { padding: "0px" }
              }
            >
              <div
                className="file-drop-area"
                style={
                  uploaded
                    ? {
                        width: "100%",
                        height: "50%",
                      }
                    : {
                        width: "100%",
                        height: "100%",
                      }
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
                    Select Images
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
                  <p style={{ paddingTop: "10px" }}>or drag images here</p>
                  <p style={{ color: "darkgray" }}>(Up to 5 images)</p>
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
                  key={src._id}
                >
                  <img
                    key={src._id}
                    src={src}
                    alt={`Selected ${index}`}
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

            {/* {uploaded ? ( */}
            <div
              className="col-md-7 col-lg-7 col-sm-12"
              style={
                // uploaded
                // ?
                {
                  border: "1px solid #f1f1f1",
                  boxShadow: "0 0 10px rgb(186, 186, 186)",
                  padding: "24px",
                  borderRadius: "5px",
                  marginLeft: { windowWidth } < 1208 ? "0px" : "10px",
                  margin: { windowWidth } < 1208 ? "0px" : "auto",
                  backgroundColor: "white",
                }
                // : { padding: "0px" }
              }
            >
              <div className="xmas-hat-div">
                <img src="/xmas-hat.png" alt="" />
              </div>
              <form onSubmit={handleSubmit}>
                <p
                  style={{
                    margin: "0px",
                    textAlign: "right",
                    paddingRight: "5px",
                    color: "red",
                  }}
                >
                  *
                </p>
                <div className="form__group field">
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Title"
                    name="title"
                    id="title"
                    required
                    onChange={handleTitle}
                    maxLength={50}
                  />
                </div>

                <p
                  style={{
                    margin: "0px",
                    textAlign: "right",
                    paddingRight: "5px",
                    color: "red",
                  }}
                >
                  *
                </p>

                <div
                  className="form__group field "
                  style={{ position: "relative" }}
                >
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleCountryChange}
                  >
                    {countryList.map((country, index) => (
                      <option key={index} value={country}>
                        {`${country} ${countryEmojiMap[country]}`}
                      </option>
                    ))}
                  </select>
                </div>

                <p
                  style={{
                    margin: "0px",
                    textAlign: "right",
                    paddingRight: "5px",
                    color: "red",
                  }}
                >
                  *
                </p>

                <div className="form__group field ">
                  <input
                    type="input"
                    className="form__field location_field"
                    placeholder="Location (Disneyland, wonderland, time square...)"
                    name="location"
                    id="location"
                    required
                    onChange={handleLocationChange}
                    maxLength={30}
                  />
                  <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ color: "#9192a0" }}
                    className="location_info"
                  />
                  <div className="hover_text">
                    Please specify the exact location to better assist the user
                    in planning their trip. e.g. Canada's Wonderland ➡{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://www.google.com/maps?q=Canada's Wonderland`}
                    >
                      Canada's Wonderland
                    </a>
                  </div>
                </div>

                <div
                  className="form__group field"
                  style={{ marginTop: "20px" }}
                >
                  <input
                    type="input"
                    className="form__field"
                    placeholder="Event"
                    name="event"
                    id="event"
                    onChange={handleEventChange}
                    maxLength={50}
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
                <div
                  className="list-item-btn d-flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <div>
                    {uploading === true ? (
                      <p>Sending to Santa's team 💨</p>
                    ) : (
                      <p>🎅🏻 We'll review your request ASAP! 💨</p>
                    )}
                  </div>
                  <div>
                    {uploading === true ? (
                      <button
                        className="btn btn-secondary"
                        style={{ padding: "4px 24px", fontWeight: "bold" }}
                      >
                        <FontAwesomeIcon
                          icon={faSpinner}
                          size="lg"
                          className="loading-spinner"
                          spin
                        />
                      </button>
                    ) : (
                      <button
                        className="btn btn-success"
                        style={{ padding: "4px 24px", fontWeight: "bold" }}
                      >
                        Post!
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            {/* ) : null} */}
          </div>
        </div>
      </div>
      <br />
      {/* <br /> */}
      {/* <Footer /> */}
    </div>
  );
}

export default List;
