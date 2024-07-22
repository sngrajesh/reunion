"use client";
import { useMemo } from "react";
import tableData from "../public/data.json";
import Table from "./components/Table/Table";

export default function Home() {
  const data = useMemo(() => tableData, []);

  let columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "ID",
    },
    {
      header: "Name",
      accessorKey: "name",
      footer: "Name",
    },
    {
      header: "Category",
      accessorKey: "category",
      footer: "Category",
      enableGrouping: true,
    },
    {
      header: "Subcategory",
      accessorKey: "subcategory",
      footer: "Subcategory",
      enableGrouping: true,
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      footer: "Created At",
      cell: (info) => {
        return new Date(info.getValue()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      header: "Updated At",
      accessorKey: "updatedAt",
      footer: "Updated At",
      cell: (info) => {
        return new Date(info.getValue()).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
      },
    },
    {
      header: "Price",
      accessorKey: "price",
      footer: "Price",
    },
    {
      header: "Sale Price",
      accessorKey: "sale_price",
      footer: "Sale Price",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-12 max-w-7xl overflow-hidden mx-auto">
      <Table data={data} columns={columns} />
    </main>
  );
}
