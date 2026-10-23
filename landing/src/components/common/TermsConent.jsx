import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TermsConent = () => {
  return (
    <Tabs>
      <style>{`
        .tabs__button {
          color: #004080 !important;
          font-weight: 600;
          cursor: pointer;
          padding: 12px 0;
          border: none;
          background: none;
          text-align: left;
          transition: background 0.2s;
        }
        .tabs__button.react-tabs__tab--selected {
          background: #e6f0ff;
          border-radius: 6px;
          color: #004080 !important;
        }
        .tabs__controls {
          border-right: 2px solid #e6e6e6;
        }
        .tabs__content h1, .tabs__content h2, .tabs__content h3 {
          color: #004080;
        }
        .tabs__content ul {
          margin-left: 20px;
        }
        .tabs__content li {
          margin-bottom: 6px;
        }
      `}</style>
      <div className="row y-gap-30">
        <div className="col-lg-3">
          <div className="px-30 py-30 rounded-4 border-light">
            <TabList className="tabs__controls row y-gap-10 js-tabs-controls">
              <Tab className="col-12 tabs__button js-tabs-button">
                Terms & Conditions
              </Tab>
              <Tab className="col-12 tabs__button js-tabs-button">
                Refund Policy
              </Tab>
              <Tab className="col-12 tabs__button js-tabs-button">
                Privacy Policy
              </Tab>
            </TabList>
          </div>
        </div>
        {/* End .col-lg-3 */}

        <div className="col-lg-9">
          {/* Terms & Conditions */}
          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15">Terms and Conditions</h1>
              <p>
                Believe Jobs provides an online platform that facilitates interaction between job seekers and employers/recruiters (collectively referred to as "Users") to share information related to job opportunities and hiring needs.
              </p>
              <p>
                By accessing or using this Website, you acknowledge and accept all the terms outlined in this agreement. If you do not agree with any part of these terms and conditions or do not intend to comply with them, you are advised not to use this Website.
              </p>
              <p>
                We expressly state that Believe Jobs does not verify, endorse, or guarantee the authenticity of any job seeker or employer/recruiter profiles. Our role is limited to that of an intermediary providing a digital space for posting job openings and uploading resumes or profiles.
              </p>
              <p>
                It is the sole responsibility of the recruiter/employer to conduct appropriate background checks and verifications before engaging with any job seeker. Similarly, job seekers are expected to exercise due diligence in verifying the authenticity of recruiters or job offers before proceeding further.
              </p>
              <p>
                Believe Jobs shall not be held liable under any circumstances for any kind of interaction, agreement, or transaction—monetary or otherwise—between users, including transactions between employers and job seekers, job seekers among themselves, or job seekers and any employees or representatives of Believe Jobs.
              </p>
              <h2 className="text-16 fw-500 mt-35">2. Registration</h2>
              <ul  style={{ color: "#004080" }}>
                <li>
                  2.1. When accessing or using the Believe Jobs platform and its services, users may browse available job listings and apply to relevant openings posted by verified recruiters and employers.
                </li>
                <li>
                  2.2. To access certain features and services of Believe Jobs, including applying for jobs and receiving personalized job alerts, users must register and create an account. Upon registration, an individual profile is created to store your personal and professional details, allowing us to provide you with tailored services and better user experience.
                </li>
                <li>
                  2.3. During the registration process, you are required to provide accurate and complete information, including your name, contact number, email ID, educational qualifications, work history, preferred job locations, expected salary, and other relevant details. While Believe Jobs does not support or encourage discriminatory practices, recruiters may list job roles with gender-specific requirements in compliance with applicable laws. It is your responsibility to ensure that the information you submit is truthful and up-to-date. We are not liable for any issues arising due to misinformation provided by the user.
                </li>
                <li>
                  2.4. You will also be required to create a secure password for your account. You are responsible for maintaining the confidentiality of your password and any activities that occur under your account. You must notify us immediately if you suspect unauthorized use of your account or a breach of security. Believe Jobs shall not be held liable for any unauthorized access resulting from your failure to maintain password confidentiality.
                </li>
                <li>
                  2.5. All accounts must be registered with a valid and regularly monitored personal email address. If we find that an account has been registered with a temporary or invalid email address, we reserve the right to suspend or deactivate it. We may also require periodic re-verification of accounts to maintain platform integrity.
                </li>
                <li>
                  2.6. Job postings created by recruiters on the Believe Jobs platform will remain active for a period of 30 days from the date of publication. After this period, the listing will expire automatically. Recruiters can repost or extend listings if the position is still vacant.
                </li>
              </ul>
              <h2 className="text-16 fw-500 mt-35">3. User Obligations and Restrictions</h2>
              <p>By accessing or using Believe Jobs, you agree that you will not:</p>
              <ul style={{ color: "#004080" }}>
                <li>Violate any applicable laws, regulations, or government guidelines.</li>
                <li>Interfere with or disrupt any network connected to Believe Jobs.</li>
                <li>Impersonate any individual or misrepresent your affiliation with any entity.</li>
                <li>Manipulate headers or identifiers to disguise the origin of your data or communications.</li>
                <li>Harass, stalk, threaten, or otherwise interfere with other users’ use of the platform.</li>
                <li>Attempt unauthorized access to any part of the Believe Jobs platform or to other users’ data.</li>
                <li>Mine or extract user data for building external databases, either for personal or commercial use.</li>
                <li>Impersonate a representative of Believe Jobs or mislead others regarding your role.</li>
                <li>Reproduce, distribute, modify, sell, or exploit the content, materials, or design of Believe Jobs for commercial purposes without authorization.</li>
                <li>Use Believe Jobs’ content to develop competing services or derivative works.</li>
                <li>Use bots, software, or scripts to disrupt or automate access to the platform.</li>
                <li>Place undue burden on our servers or infrastructure.</li>
                <li>Spam the platform through repeated or indiscriminate messaging.</li>
                <li>Access restricted data or areas without authorization.</li>
                <li>Engage in reverse engineering, decoding, or attempting to discover source code or technology behind the platform.</li>
                <li>Copy, mirror, or simulate the structure or appearance of the website for any purpose.</li>
                <li>Test system vulnerabilities without explicit written consent.</li>
                <li>Automatically or manually scrape data without permission.</li>
                <li>Engage in fraudulent behavior or solicit money from users.</li>
                <li>Access the website through any unauthorized interface or method.</li>
                <li>Breach or attempt to breach any platform security or authentication process.</li>
                <li>Extract data using crawlers, spiders, or other automated processes without written consent.</li>
                <li>Send unsolicited commercial messages or mass emails through or from the platform.</li>
                <li>Transfer, sublicense, or assign account rights or licenses to others.</li>
                <li>Use Believe Jobs' communication infrastructure to transmit or forward spam content.</li>
                <li>Misuse the job database by repeatedly forwarding irrelevant messages or content.</li>
                <li>Download, store, or use platform data for third-party business purposes without approval.</li>
                <li>Share resumes hosted on the platform with the job seeker’s current employer or third parties without consent.</li>
                <li>Upload, transmit, or distribute content:
                  <ul>
                    <li>Without proper ownership or rights.</li>
                    <li>That infringes on third-party intellectual property or legal rights.</li>
                    <li>That contains viruses, malware, or disruptive code.</li>
                    <li>That is abusive, offensive, threatening, obscene, or defamatory.</li>
                    <li>That promotes illegal or criminal activity.</li>
                    <li>That deceives users or misleads recipients.</li>
                    <li>That belongs to someone else without consent.</li>
                    <li>That endangers minors in any way.</li>
                    <li>That threatens India’s sovereignty, security, or public order or violates any national interest.</li>
                  </ul>
                </li>
              </ul>
              <h2 className="text-16 fw-500 mt-35">4. Product/Service-Specific Conditions</h2>
              <p>
                Depending on the services or subscription plans you choose on Believe Jobs, additional terms and specific conditions may apply. These will be communicated to you separately at the time of subscription or engagement with those services. It is your responsibility to review and accept those terms prior to usage.
              </p>
              <h2 className="text-16 fw-500 mt-35">5. Employer or Recruiter Terms – Believe Jobs</h2>
              <ul style={{ color: "#004080" }}>
                <li>
                  a. You acknowledge and agree that the responsibility for complying with any request from a data subject (data principal) lies with the party that collects or processes the personal data. If you are in possession of such data, you are solely accountable for responding in compliance with applicable data protection laws.
                </li>
                <li>
                  b. You represent and warrant that any personal data acquired from Believe Jobs will not be transferred or disclosed to any sub-processors or third parties without ensuring that such parties maintain adequate and equivalent levels of data protection and security.
                </li>
                <li>
                  c. You agree to retain and process personal data obtained from Believe Jobs only for as long as necessary to fulfill the specific, agreed-upon purpose. Once that purpose has been fulfilled, the data must be securely deleted or returned.
                </li>
                <li>
                  d. Upon receiving personal data from Believe Jobs, you act as an independent Data Controller and are fully responsible for its secure handling and lawful use in accordance with all applicable regulations.
                </li>
                <li>
                  e. All products and services purchased from Believe Jobs are non-refundable and cannot be exchanged or transferred for any other products or services offered by Believe Jobs or its affiliated entities.
                </li>
                <li>
                  f. You shall ensure compliance with all applicable data protection and privacy laws while processing personal data. Under no circumstance will you use or process such data in an unlawful, excessive, or irrelevant manner beyond the scope defined in our Privacy Policy and these Terms.
                </li>
                <li>
                  g. You agree to implement appropriate technical and organizational safeguards to protect personal data obtained from Believe Jobs against unauthorized access, misuse, accidental loss, destruction, or unlawful disclosure.
                </li>
                <li>
                  h. In the event of a data breach involving personal data accessed through Believe Jobs, you agree to cooperate fully and provide all necessary assistance to help manage and mitigate the breach in a timely and compliant manner, as required by applicable law.
                </li>
                <li>
                  i. You confirm and guarantee that all job vacancies posted through Believe Jobs are legitimate, currently available, and that you hold the necessary authority to advertise and recruit for such roles. You further agree to use the candidate database solely for hiring purposes.
                </li>
                <li>
                  j. You shall comply with all applicable laws governing the handling of user data, including the Telecom Commercial Communications Customer Preference Regulations, 2010, and any related rules or directives. This applies when accessing or uploading data on the Believe Jobs platform or any associated networks or systems.
                </li>
                <li>
                  k. You undertake that you will not charge any fee, directly or indirectly, to job seekers who apply for or respond to job postings on Believe Jobs. Processing of applications and communication with candidates must remain free of charge.
                </li>
              </ul>
              <h2 className="text-16 fw-500 mt-35">6. Ownership</h2>
              <p>
                All content available on the Believe Jobs website, including but not limited to text, graphics, software, code, files, images, and any other materials or data (collectively, “Believe Jobs Content”) along with related updates, enhancements, and documentation, are the exclusive property of Believe Jobs or its licensors. This content is protected under applicable copyright, trademark, patent, and trade secret laws. You acknowledge that no ownership rights are transferred to you by accessing or using the website. All rights not expressly granted are reserved by Believe Jobs, and your use is limited to the scope permitted under these terms.
              </p>
              {/* ...continue with the rest of your content as needed... */}
            </div>
          </TabPanel>

          {/* Refund Policy */}
          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15">Refund Policy</h1>
              <p>
                <strong>25. Refund and Assignment</strong>
              </p>
              <ul style={{color:'#004080'}}>
                <li>
                  A. All payments made by users for subscriptions, renewals, or any other Believe Jobs services are non-refundable, under any circumstances.
                </li>
                <li>
                  B. Memberships or subscriptions are non-transferable. Users are not allowed to assign or share their paid membership with any other individual or entity. Doing so will be treated as a violation of these Terms and may lead to suspension or termination of your account without refund.
                </li>
                <li>
                  C. Payments made toward one Believe Jobs package cannot be adjusted or transferred toward any other product, service, or package offered by Believe Jobs or its affiliates.
                </li>
              </ul>
              <p>
                <strong>24. Mode of Payment</strong>
              </p>
              <ul  style={{color:'#004080'}}>
                <li>
                  A. Payments for any service on Believe Jobs may be made through various modes such as cash, cheque, net banking, debit/credit card, UPI, RTGS, NEFT, or PayPal, as per the applicable RBI guidelines. Activation of any paid service will only occur once the payment is successfully realized. In case a cheque or demand draft is dishonored, the user is responsible for paying applicable bank charges. Until the amount is settled in full (including charges), services will remain suspended.
                </li>
                <li>
                  B. Believe Jobs uses secure third-party payment gateways for processing payments. If you subscribe to any paid plan with a value of ₹2,00,000 or more, you may be required to submit your Permanent Account Number (PAN) or Form 60/61, in accordance with the Income Tax Act, 1961 and applicable rules.
                </li>
              </ul>
              <p>
                Please note that if you have subscribed to any paid services on Believe Jobs, no refunds will be issued for any portion of the subscription period that remains unused at the time of termination, regardless of whether the termination was initiated by you or by Believe Jobs.
              </p>
            </div>
          </TabPanel>

          {/* Privacy Policy */}
          <TabPanel>
            <div className="tabs__content js-tabs-content" data-aos="fade">
              <h1 className="text-30 fw-600 mb-15">Privacy Policy</h1>
              <p>
                At Believe Jobs, we are committed to protecting your personal information and ensuring transparency in how we collect, use, and safeguard your data. This Privacy Policy outlines our practices regarding the collection, use, disclosure, and protection of your information when you use our website, mobile application, and related services (collectively referred to as the “Platform”). By accessing or using Believe Jobs, you acknowledge that you have read, understood, and agreed to the terms outlined in this policy.
              </p>
              <p>
                We collect personal information from users including, but not limited to, name, contact details, educational background, employment history, skills, certifications, demographic information, and identity verification documents. This information is collected during account registration, while creating or updating profiles, and through interactions on our Platform. Employers and recruiters may also provide company details such as organization name, address, GSTIN, and hiring preferences. All such data is gathered to enable effective job matching, communication, and service delivery on our Platform.
              </p>
              <p>
                Your data is used solely for the purposes it was collected, such as creating job seeker or employer profiles, sending relevant job or candidate matches, responding to service inquiries, improving user experience, and ensuring compliance with applicable laws. We do not sell or rent your personal data to third parties. However, in specific circumstances—such as legal obligations, fraud prevention, or to fulfill a requested service—we may share your information with verified third-party service providers or legal authorities under strict confidentiality protocols.
              </p>
              <p>
                We implement industry-standard security measures, including SSL encryption, secure data storage, role-based access, and regular audits to ensure the safety and confidentiality of your data. While we strive to maintain the highest level of security, users are encouraged to adopt safe internet practices, such as using secure passwords and devices, as no system can guarantee absolute security in the digital space.
              </p>
              <p>
                Cookies and similar technologies may be used on our Platform to enhance user experience, analyze traffic, and provide personalized content. These cookies do not collect personally identifiable information unless you provide it. You may control cookie preferences through your browser settings. Believe Jobs does not use behavioral tracking across third-party websites and does not respond to Do Not Track (DNT) browser signals.
              </p>
              <p>
                We respect your privacy choices. You have the right to access, correct, or delete your personal information at any time. You may manage your preferences by logging into your account or contacting our support team. If you choose to disable data sharing or communications, some services may be limited. Users can also opt out of receiving promotional messages by following the instructions provided in those communications.
              </p>
              <p>
                Believe Jobs does not knowingly collect data from individuals under the age of 18. If we discover that a minor has provided personal information, we will take immediate steps to delete such data from our records. Additionally, if you choose to use our referral feature, we may collect and store your referral’s contact information solely for sending an invitation, and they may request removal at any time.
              </p>
              <p>
                We reserve the right to amend this Privacy Policy from time to time. Any updates will be published on this page, and significant changes will be communicated via email or on our Platform. Continued use of our services after any such updates will constitute your acceptance of the revised policy.
              </p>
              <p>
                This Privacy Policy is governed by and construed in accordance with the laws of India. Any disputes arising out of or related to this policy shall fall under the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
              </p>
              <p>
                If you have any questions, concerns, or requests related to your privacy or this policy, please contact us at <a href="mailto:hr@believejobs.com" style={{ color: "#004080" }}>hr@believejobs.com</a>.
              </p>
            </div>
          </TabPanel>
        </div>
        {/* End col-lg-9 */}
      </div>
    </Tabs>
  );
};

export default TermsConent;