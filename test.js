import { useEffect, useState } from 'react';

const YourComponent = ({ singleSale }) => {
  const [formData, setFormData] = useState<any>({
    fromChoice: "supplier",
    selectedOption: null,
    category: "",
    invoiceDate: "",
    poNo: "",
    invoiceNo: "",
    invoicedetail: "",
    taxPayable: "no",
    paymentType: "unpaid",
    updateInventory: false,
    editable: false,
    terms: "",
    paymentDate: "",
    paidAmount: ""
  });

  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const getDate = async () => {
      // Format the date to "YYYY-MM-DD"
      if (singleSale && singleSale.invoice_date) {
        const date = new Date(singleSale.invoice_date);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-indexed
        const year = date.getUTCFullYear();
        return `${year}-${month}-${day}`; // Return the formatted date
      }
      return ''; // Return an empty string if no date
    };

    const populateData = async () => {
      const date = await getDate(); // Wait for the date to be formatted

      if (singleSale) {
        const {
          to,
          to_id,
          category = "",
          address = "",
          invoice_number = "",
          taxPayable,
          paymentType = "unpaid",
          bank_name = "",
          ifc_code = "",
          branch = "",
          account_number = "",
          is_update_inventory_stock = false,
          is_editable = false,
          term_conditions = "",
          sales_consumption_details
        } = singleSale;

        setFormData({
          selectedOption: to_id,
          fromChoice: to,
          category,
          address,
          invoiceDate: date, // Use the formatted date
          invoiceNo: invoice_number,
          taxPayable: taxPayable ? "yes" : "no",
          paymentType,
          bankName: bank_name,
          ifscCode: ifc_code,
          bankBranch: branch,
          accountNumber: account_number,
          updateInventory: is_update_inventory_stock,
          editable: is_editable,
          terms: term_conditions,
        });

        setRows(
          sales_consumption_details.map((material: any) => ({
            name: material.raw_material,
            qty: material.qty,
            unit: material.unit,
            price: material.price,
            amount: material.amount,
            tax: "SGST",
            description: material.description,
            detail_id: material.id,
          }))
        );
      }
    };

    populateData();
  }, [singleSale]); // Change to singleSale

  // The rest of your component code...

  return (
    <div>
      {/* Render your form fields using formData and rows */}
    </div>
  );
};

export default YourComponent;
