import jsPDF from "jspdf";
import "jspdf-autotable";

export function generatePDF(customers) {
  const doc = new jsPDF();
  doc.text("Customer Report", 14, 15);

  const table = customers.map((c) => [
    c.fullName,
    c.customerType,
    c.email || "N/A",
    c.primaryPhone || "N/A",
    c.memberNo || "N/A",
  ]);

  doc.autoTable({
    head: [["Name", "Type", "Email", "Phone", "Member No"]],
    body: table,
    startY: 20,
  });

  doc.save("customers.pdf");
}
