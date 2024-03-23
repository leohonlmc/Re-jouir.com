import React, { useEffect, useState, useRef } from "react";
import "../../Faq.scoped.css";

function Faq() {
  return (
    <div className="Faq" style={{ paddingTop: "100px" }}>
      <div className="container">
        <div
          className="row justify-content-center"
          data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;"
        >
          <div className="col-xl-8 col-lg-10">
            <div
              className="section__title text-center title-mb-75"
              style={{ marginBottom: "75px" }}
            >
              <h2 className="title">Asked Questions</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xxl-7 col-xl-9 col-lg-10">
            <div
              className="faq__wrapper"
              data-anime="opacity:[0, 1]; translateY:[24, 0]; onview: true; delay: 100;"
            >
              <div className="accordion" id="accordionFaq">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What is Rejouir?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionFaq"
                    style={{}}
                  >
                    <div className="accordion-body">
                      <p>
                        Rejouir is a blog platform that shares Christmas moment
                        with images and information for you to plan your trip
                        around the world.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Do we need an account to upload images?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        No! You can upload images without an account. We want to
                        simplify the process of sharing your Christmas moment.
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Why we should choose Rejouir?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionFaq"
                    style={{}}
                  >
                    <div className="accordion-body">
                      <p>
                        We build Christmas community and create contents with
                        passion. And one of the reason is to centralize
                        Christmas contents not just from other soical media.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFour">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Where we can contact rejouir team?
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        You can contact us via email via{" "}
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="mailto:rejouirxmas@gmail.com"
                        >
                          gmail
                        </a>
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingFive">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      How many images we can upload?
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>
                        We offer 5 images at most for each upload. We want to
                        keep the quality of the content and not to spam the
                        platform.
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
