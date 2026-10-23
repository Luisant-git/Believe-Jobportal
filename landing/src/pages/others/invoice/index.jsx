import InvoiceComponent from "@/components/invoice/Invoice";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Invoice || TravelMoyo - Travel & Tour ReactJs Template",
  description: "TravelMoyo - Travel & Tour ReactJs Template",
};

const Invoice = ({bookings}) => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <InvoiceComponent  bookings={bookings}/>
    </>
  );
};

export default Invoice;
