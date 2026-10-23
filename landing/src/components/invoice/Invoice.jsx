import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./InvoiceComponent.css"; // Ensure to include CSS

export default function InvoiceComponent({ bookings }) {
  const handlePrintClick = () => {
    if (!bookings) {
      alert("Data is not fully loaded.");
      return;
    }
    setTimeout(() => {
      window.print();
    }, 500);
  };


  const handleDownloadPDF = () => {
    if (!bookings) {
      alert("Data is not fully loaded.");
      return;
    }

    const doc = new jsPDF("p", "mm", "a4");

    // Colors
    const primaryColor = "#2F2041"; // Deep Purple
    const secondaryColor = "#ADD8E6"; // Light Blue
    const lightColor = "#f8f9fa"; // Light background color
  
    // Add header with logo and company info
    doc.setFillColor(primaryColor);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor("#fff");
    doc.setFontSize(18);
    doc.text("Travel Moyo - Invoice", 15, 15);
    doc.setFontSize(12);
    doc.text("108 F, Rasi's Square, Thirumalaiswamy Road,", 15, 22);
    doc.text("New Siddhapudur, Tamil Nadu 641044", 15, 27);
  
    // Contact Information
    doc.setFontSize(10);
    doc.text("Toll-Free: +91 99527 47636 | travelmoyo@gmail.com", 200, 15, { align: "right" });
  
    // Invoice Details Section
    doc.setFontSize(12);
    doc.setTextColor("#000");
    doc.text(`Invoice #: ${bookings.bookingId}`, 15, 40);
    doc.text(`Invoice Date: ${new Date(bookings.createdAt).toLocaleDateString()}`, 15, 46);
    doc.text(`Due Date: ${new Date(bookings.checkOutDate).toLocaleDateString()}`, 15, 52);
  
    // Customer Details Section
    doc.setFillColor(lightColor);
    doc.rect(10, 60, 190, 30, "F");
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text("Customer Details", 15, 70);
    doc.setTextColor("#000");
    doc.text(`Name: ${bookings.name}`, 15, 80);
    doc.text(`Address: ${bookings.address}, ${bookings.postalcode}`, 15, 86);
    doc.text(`Phone: ${bookings.phone}`, 15, 92);
  
    // Table for Package Details
    doc.setTextColor(primaryColor);
    doc.text("Package Details", 15, 105);
  
    doc.autoTable({
      startY: 110,
      head: [["Title", "Duration", "Base Price"]],
      body: [
        [
          bookings.holidayPackage.title,
          `${bookings.holidayPackage.durationDays} Days / ${bookings.holidayPackage.durationNights} Nights`,
          `₹${bookings.holidayPackage.basePrice}`,
        ],
      ],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: primaryColor, textColor: "#fff" },
      bodyStyles: { textColor: "#000" },
    });
  
    // Table for Booking Details
    doc.setTextColor(primaryColor);
    doc.text("Guest Details", 15, doc.lastAutoTable.finalY + 10);
  
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Total Guests", "Adults", "Children"]],
      body: [[bookings.totalAdult+bookings?.totalChildren, bookings.totalAdult, bookings.totalChildren]],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: primaryColor, textColor: "#fff" },
      bodyStyles: { textColor: "#000" },
    });
  
    // Table for Payment Summary
    doc.setTextColor(primaryColor);
    doc.text("Payment Summary", 15, doc.lastAutoTable.finalY + 10);
  
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Description", "Amount"]],
      body: [["Total Amount", `₹${bookings.totalAmount}`]],
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: primaryColor, textColor: "#fff" },
      bodyStyles: { textColor: "#000" },
    });
  
    // Footer
    doc.setFillColor(primaryColor);
    doc.rect(0, 280, 210, 20, "F");
    doc.setFontSize(12);
    doc.setTextColor("#fff");
    doc.text("Thank you for choosing Travel Moyo!", 105, 290, { align: "center" });
    doc.text("Need help? Contact us at travelmoyo@gmail.com", 105, 295, { align: "center" });
  
    // Save the PDF
    doc.save(`Invoice_${bookings.bookingId}.pdf`);  
  };

  const holidayPackage = bookings?.holidayPackage;


  return (
    <section>
      <div className="invoice-container">
        <div className="row justify-center">
          <div className="col-xl-10 col-lg-11">
            <div className="d-flex justify-end print-hidden">
              {/* <button
                className="button h-50 px-24 -dark-1 bg-blue-1 text-white me-3"
                onClick={handlePrintClick}
              >
                Print Invoice
              </button> */}
              <button
                className="button h-50 px-24 -dark-1 bg-brown-1 text-white"
                onClick={handleDownloadPDF}
              >
                Download PDF
              </button>
            </div>
            <div className="invoice-content bg-white rounded-4 mt-50 border">
              <div className="layout-pt-lg layout-pb-lg px-50">
                <div className="row justify-between">
                  <div className="col-auto">
                    <img
                      className="w-50"
                      src="/img/general/logo-jpeg_dark.jpg"
                      alt="logo icon"
                    />
                  </div>
                  <div className="col-auto text-right">
                    <h3>Invoice</h3>
                    <p>
                      Invoice #: {bookings?.bookingsId} <br />
                      Date: {new Date(bookings?.createdAt).toLocaleDateString()} <br />
                      Due: {new Date(bookings?.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-6">
                    <h4>Customer</h4>
                    <p>
                      {bookings?.name} <br />
                      {bookings?.address}, {bookings?.postalcode} <br />
                      {bookings?.phone}
                    </p>
                  </div>
                  <div className="col-6 text-right">
                    <h4>TravelMoyo</h4>
                    <p>
                    +91 99527 47636<br />
                      108 F, Rasi's Square, Thirumalaiswamy Road, New Siddhapudur, Tamil Nadu 641044
                    </p>
                  </div>
                </div>

                <div className="row mt-30">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                        <th>Total Members</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Holiday Package</td>
                        <td>{holidayPackage?.title}</td>
                        <td>{bookings?.totalAdult+bookings?.totalChildren}</td>
                        <td>₹{holidayPackage?.basePrice}</td>
                        <td>₹{bookings?.totalAmount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="row justify-end mt-30">
                  <h5>
                    Total Amount: <strong>₹{bookings?.totalAmount}</strong>
                  </h5>
                </div>
              </div>
              <div className="border-top-light py-50 text-center">
                <p>Thank you for your booking!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
