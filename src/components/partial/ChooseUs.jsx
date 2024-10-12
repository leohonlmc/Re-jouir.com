import "../../App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";

function ChooseUs() {
  const { t } = useTranslation();

  const data = [
    {
      title: t("christmas_blog_title"),
      description: t("christmas_blog_description"),
    },
    {
      title: t("connect_globe_title"),
      description: t("connect_globe_description"),
    },
    {
      title: t("share_christmas_title"),
      description: t("share_christmas_description"),
    },
    {
      title: t("guest_visit_title"),
      description: t("guest_visit_description"),
    },
  ];

  return (
    <div className="Home">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <br />
            <div className="section__title text-center title-mb-80">
              <h2 className="title why-rejouir">
                <span className="tg-text-gradient">{t("why_rejouir")}</span>
              </h2>
            </div>
            <br />
          </div>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="position-relative">
          <div className="row justify-content-center">
            {data.map((item, index) => (
              <div
                className={`col-xl-3 col-lg-4 col-sm-6 a${index}`}
                key={index}
              >
                <div className="choose__item">
                  <div className="choose__item-count tg-text-gradient">
                    0{index + 1}.
                  </div>
                  <div className="choose__item-content">
                    <h3 className="title">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
