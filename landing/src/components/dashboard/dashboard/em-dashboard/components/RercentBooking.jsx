import React, { useEffect, useState } from "react";


const RecentBooking = ({bookings,error,loading}) => {


  // Map status from backend to UI colors and labels


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="overflow-scroll scroll-bar-1 pt-30">
      <table className="table-2 col-12">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Payment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {row.item}
                <br /> {row.description}
              </td>
              <td className="fw-500">{row.total}</td>
              <td>{row.paid}</td>
              <td>
                <div
                  className={`rounded-100 py-4 text-center col-12 text-14 fw-500 bg-${row.status.color} text-${row.status.text}`}
                >
                  {row.status.label}
                </div>
              </td>
              <td>{row.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentBooking;
