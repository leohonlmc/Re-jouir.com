import React from "react";
import "../../Faq.scoped.css";
import { useTranslation } from "react-i18next";

function Faq() {
  const { t } = useTranslation();

  return (
    <div className="Faq">
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
              <h2 className="title">{t("asked_questions")}</h2>
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
                      {t("faq_question_1")}
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
                      <p>{t("faq_answer_1")}</p>
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
                      {t("faq_question_2")}
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>{t("faq_answer_2")}</p>
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
                      {t("faq_question_3")}
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
                      <p>{t("faq_answer_3")}</p>
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
                      {t("faq_question_4")}
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
                        {t("faq_answer_4")}{" "}
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
                      {t("faq_question_5")}
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    className="accordion-collapse collapse "
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionFaq"
                  >
                    <div className="accordion-body">
                      <p>{t("faq_answer_5")}</p>
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
