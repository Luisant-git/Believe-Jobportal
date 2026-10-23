import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEnquiryEmail(enquiryData: {
    to: string;
    username: string;
    email: string;
    mobileno: string;
    queries: string;
  }) {
    const { to, username, email, mobileno, queries } = enquiryData;
    
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f7; margin: 0; padding: 0; }
            .email-container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            .header { text-align: center; padding-bottom: 20px; }
            .header img { width: 300px; }
            .title { color: #333; font-size: 24px; font-weight: bold; margin: 0; }
            .content { padding: 30px; }
            .content p { font-size: 16px; color: #666; line-height: 1.5; }
            .info-box { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .footer { text-align: center; color: #888; font-size: 12px; padding: 10px; }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <img src="https://believejobs.com/img/general/BELIEVE%20JOBS-LOGO.png" alt="Believe Jobs Logo" />
            </div>
            <div class="content">
              <h1 class="title">New Enquiry Received</h1>
              <p>A new enquiry has been submitted through the website contact form.</p>
              
              <div class="info-box">
                <p><strong>Name:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mobile:</strong> ${mobileno}</p>
                <p><strong>Queries:</strong> ${queries}</p>
                <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
              </div>
              
              <p>Please respond to this enquiry at your earliest convenience.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Believe Jobs. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      await this.mailerService.sendMail({
        from: process.env.GODADDY_EMAIL,
        to,
        subject: `New Enquiry from ${username}`,
        html: htmlContent,
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending enquiry email:', error);
      throw new Error('Failed to send enquiry email');
    }
  }

  async sendUserConfirmation(
    to: string,
    username: string,
    message: string,
    subject: string,
    description: string,
  ) {
    try {
      const htmlContent = `
      <html>
       <head>
         <style>
           body {
             font-family: Arial, sans-serif;
             background-color: #f4f4f7;
             margin: 0;
             padding: 0;
           }
     
           .email-container {
             width: 100%;
             max-width: 600px;
             margin: 0 auto;
             background-color: #ffffff;
             padding: 20px;
             border-radius: 8px;
             box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           }
     
           .header {
             text-align: center;
             padding-bottom: 20px;
           }
     
           .header img {
             width: 300px;
           }
     
           .title {
             color: #333;
             font-size: 24px;
             font-weight: bold;
             margin: 0;
           }
     
           .content {
             text-align: center;
             padding: 30px;
           }
     
           .content p {
             font-size: 16px;
             color: #666;
             line-height: 1.5;
           }
     
           .btn {
             display: inline-block;
             background-color: #6f5ce5;
             color: white;
             padding: 12px 25px;
             text-decoration: none;
             font-size: 16px;
             border-radius: 5px;
             margin-top: 20px;
           }
     
           .app-links {
             text-align: center;
             padding: 20px;
             border-top: 1px solid #eee;
           }
     
           .app-links img {
             width: 120px;
             margin: 10px;
           }
     
           .footer {
             text-align: center;
             color: #888;
             font-size: 12px;
             padding: 10px;
           }
     
           .social-links img {
             width: 54px;
             margin: 0 5px;
           }
         </style>
       </head>
       <body>
         <div class="email-container">
           <div class="header">
             <img  src="https://believejobs.com/img/general/BELIEVE%20JOBS-LOGO.png" alt="Logo" />
           </div>
           <div class="content">
             <h1 class="title">Message : ${message}</h1>
             <h2 class="title">Thanks for registering, ${username}</h2>
            
              <p>Your account has been successfully created. You can now access your dashboard and start exploring all the features of our service.</p>
               <p>${description}</p>
           </div>
           <div class="footer">
             <p>Follow us on:</p>
             <div class="social-links">
               <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320973.jpg?w=740&t=st=1726668515~exp=1726669115~hmac=4ed22d400bddc9e46315dcf2a50b5061092438075910bcd9742241d9d8a21a47" alt="Facebook" /></a>
               <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320965.jpg?w=740&t=st=1726668486~exp=1726669086~hmac=235f10282eff556a1d159d2ab0ea20897e0b27580b8d047f08c1a971354087a3" alt="LinkedIn" /></a>
               <a href="#"><img src="https://img.freepik.com/free-psd/social-media-logo-design_23-2151320963.jpg?w=740&t=st=1726668498~exp=1726669098~hmac=090526455a0f2460247c31bd6b4ede62f52f16bd8427aef58d9333e818dd028d" alt="Instagram" /></a>
             </div>
            <p>&copy; ${new Date().getFullYear()} Tech Corp. All rights reserved.</p>
           </div>
         </div>
       </body>
     </html>
     
         `;

      await this.mailerService.sendMail({
        from: process.env.GODADDY_EMAIL,
        to,
        subject: subject,
        html: htmlContent,
      });
      return { success: true };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
