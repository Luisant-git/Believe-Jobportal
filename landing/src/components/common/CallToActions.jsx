import React, { useState } from "react";
import { Modal, Input } from "antd";
import ContactForm from "./ContactForm";

const CallToActions = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSendClick = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <section className="layout-pt-md layout-pb-md" style={{ backgroundColor: '#054A91' }}>
        <div className="container">
          <div className="row y-gap-30 justify-between items-center">
            <div className="col-auto">
              <div className="row y-gap-20 flex-wrap items-center">
                <div className="col-auto">
                  <div className="icon-newsletter text-60 sm:text-40 text-white" />
                </div>
                <div className="col-auto">
                  <h4 className="text-26 text-white fw-600">
                    Your Career Journey Starts Here
                  </h4>
                  <div className="text-white">
                    We'll send the best job opportunities directly to you
                  </div>
                </div>
              </div>
            </div>
            {/* End .col */}

            <div className="col-auto">
              <div className="single-field -w-410 d-flex x-gap-10 y-gap-20">
                <div>
                  <button
                    className="button -md h-60"
                    style={{ backgroundColor: '#FFC000', color: '#054A91' }}
                    onClick={handleSendClick}
                  >
                    Enquire
                  </button>
                </div>
                {/* End subscribe btn */}
              </div>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>

      {/* Ant Design Modal */}
      <Modal
        title="Thank You!"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Close"
        width={900}
        footer={null}
        style={{ color: '#054A91' }}
      >
        <ContactForm />
      </Modal>
    </>
  );
};

export default CallToActions;