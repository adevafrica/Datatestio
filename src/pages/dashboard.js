import { useEffect, useState } from "react";
import { fetchCustomers } from "../lib/apiClient";
import { generatePDF } from "../lib/pdfGenerator";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchCustomers();
        setCustomers(res.data || []);
      } catch (e) {
        console.error(e);
        alert("Failed to load customers");
      }
    };
    load();
  }, []);

  const students = customers.filter(
    (c) => c.customerType?.toLowerCase() === "student"
  );
  const villagers = customers.filter(
    (c) => c.customerType?.toLowerCase() === "villager"
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Customer Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => generatePDF(customers)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Download PDF
          </button>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">🎓 Students</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {students.map((c, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4">
              <h3 className="font-bold">{c.fullName}</h3>
              <p>{c.email}</p>
              <p>{c.primaryPhone}</p>
              <p>Programme: {c.programme || "N/A"}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">🏡 Villagers</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {villagers.map((c, i) => (
            <div key={i} className="bg-white shadow rounded-lg p-4">
              <h3 className="font-bold">{c.fullName}</h3>
              <p>{c.email}</p>
              <p>{c.primaryPhone}</p>
              <p>Village: {c.village || "N/A"}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
