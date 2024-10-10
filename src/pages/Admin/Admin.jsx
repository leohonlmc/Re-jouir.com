import "../About/About.scoped.css";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from "../../components/partial/Header";
import Footer from "../../components/partial/Footer";
import formatDateString from "../../components/functions/formatDateString";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ViewIcon from "../../components/popup/ViewIcon";
import { Helmet } from "react-helmet";

const { REACT_APP_API_ENDPOINT, REACT_APP_AWS } = process.env;

function Admin() {
  const [pending, setPending] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currImageUrl, setCurrImageUrl] = useState("");
  const [allImage, setAllImage] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/pending/upload`)
      .then((res) => {
        if (res.data) {
          setPending(res.data.upload);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleApprove = async (postId) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/approve`,
        {
          postId,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        toast.success("Approved!");
      }
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.error) {
        toast.error(`Error: ${ex.response.data.error}`);
      } else {
        console.error("An error occurred:", ex);
      }
    }
  };

  const handleReject = async (postId) => {
    try {
      const { data } = await axios.post(
        `${REACT_APP_API_ENDPOINT}/reject`,
        {
          postId,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (data) {
        toast.success("Rejected!");
      }
    } catch (ex) {
      if (ex.response && ex.response.data && ex.response.data.error) {
        toast.error(`Error: ${ex.response.data.error}`);
      } else {
        console.error("An error occurred:", ex);
      }
    }
  };

  return (
    <div className="About">
      <div className="blog-section">
        <Header title="Admin | Réjouir" />
      </div>

      <Helmet>
        <link
          rel="canonical"
          href="https://www.rejouirxmas.com/admin/username/leohon/leohonlmc"
        />
      </Helmet>

      <ToastContainer style={{ zIndex: 9999 }} />

      {showPopup && <ViewIcon setShowPopup={setShowPopup} images={allImage} />}

      <div
        style={{ width: "95%", margin: "auto", padding: "100px 0px 0px 0px" }}
      >
        <h2
          style={{ fontWeight: "bold" }}
        >{`New pending (${pending.length})`}</h2>

        {pending.map((upload, uploadIndex) => (
          <div
            className="d-flex"
            style={{ marginBottom: "30px", marginTop: "10px" }}
            key={upload._id}
          >
            <div className="images-section">
              <div className="row py-3 shadow-5">
                <div className="col-9" style={{ display: "flex" }}>
                  {upload.images.map((image, index) => (
                    <div
                      className="mb-1"
                      key={index}
                      onClick={() => {
                        setShowPopup(true);
                        setCurrImageUrl(`${REACT_APP_AWS}${image}`);
                        setAllImage(upload.images);
                      }}
                      style={{ width: "100%" }}
                    >
                      <div className="D_Qy-2">
                        <p
                          className="D_oz D_ov D_o_ D_oE D_oH D_oK D_oN D_oP"
                          style={{
                            textAlign: "center",
                            margin: "0px",
                            fontSize: "11px",
                          }}
                        >
                          {index + 1}
                        </p>
                      </div>
                      <img
                        src={`${REACT_APP_AWS}${image}`}
                        alt=""
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="blog-info"
              style={{ paddingTop: "0px", paddingBottom: "0px" }}
            >
              <div className="blog-info-child responsive-table-container admin">
                <table className="bordered-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Country</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Event</th>
                      <th>Description</th>
                      <th>Guest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{upload.title}</td>
                      <td>{upload.country}</td>
                      <td>{upload.location}</td>
                      <td>{formatDateString(upload.created)}</td>
                      <td>{upload.event}</td>
                      <td>{upload.description}</td>
                      <td>{upload.guest}</td>
                    </tr>
                  </tbody>
                </table>

                <br />

                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleApprove(upload._id);
                    alert("Approved!");
                    window.location.reload();
                  }}
                  style={{ marginRight: "10px" }}
                >
                  Approve
                </button>

                <button
                  className="btn btn-warning"
                  onClick={() => {
                    handleReject(upload._id);
                    alert("Rejected!");
                    window.location.reload();
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Admin;
