import { jsPDF } from "jspdf";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();

  useEffect(() => {
    generateInvoice();
  }, []);

  const generateInvoice = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/orders`
      );

      const order = data.find(o => o._id === id);

      if (!order) return alert("Order not found");

      const doc = new jsPDF();

      // 🏷️ HEADER
      doc.setFontSize(18);
      doc.text("GadgetHub Invoice", 20, 20);

      doc.setFontSize(10);
      doc.text(`Order ID: ${order._id}`, 20, 30);
      doc.text(
        `Date: ${new Date(order.createdAt).toLocaleDateString()}`,
        20,
        35
      );

      // 👤 CUSTOMER
      doc.setFontSize(12);
      doc.text("Customer Details:", 20, 45);

      doc.setFontSize(10);
      doc.text(`Name: ${order.user?.name || "Guest"}`, 20, 52);

      // 📍 ADDRESS
      doc.text("Address:", 20, 60);
      doc.text(order.address?.street || "-", 20, 66);
      doc.text(
        `${order.address?.city || ""}, ${order.address?.state || ""}`,
        20,
        72
      );
      doc.text(`ZIP: ${order.address?.zip || "-"}`, 20, 78);

      // 📦 ITEMS HEADER
      let y = 90;

      doc.setFontSize(12);
      doc.text("Items:", 20, y);

      y += 8;

      doc.setFontSize(10);
      doc.text("Name", 20, y);
      doc.text("Qty", 110, y);
      doc.text("Price", 140, y);

      y += 6;

      // 📦 ITEMS LOOP
      order.items.forEach((item) => {
        doc.text(item.name, 20, y);
        doc.text(String(item.quantity), 110, y);
        doc.text(`₹${item.price}`, 140, y);
        y += 8;
      });

      // 💰 TOTAL
      y += 10;

      doc.setFontSize(12);
      doc.text(`Total: ₹${order.total}`, 20, y);

      // 🎉 FOOTER
      y += 10;
      doc.setFontSize(10);
      doc.text("Thank you for shopping with GadgetHub!", 20, y);

      // SAVE
      doc.save(`invoice_${order._id}.pdf`);

    } catch (err) {
      console.log(err);
      alert("Error generating invoice");
    }
  };

  return <h2 style={{ padding: "40px" }}>Generating Invoice...</h2>;
};

export default Invoice;