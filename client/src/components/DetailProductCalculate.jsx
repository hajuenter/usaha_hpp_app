import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Printer } from "lucide-react";

const satuanList = [
  { singkatan: "ton", nama: "Ton" },
  { singkatan: "kw", nama: "Kuintal" },
  { singkatan: "kg", nama: "Kilogram" },
  { singkatan: "hg", nama: "Hektogram" },
  { singkatan: "dag", nama: "Dekagram" },
  { singkatan: "gr", nama: "Gram" },
  { singkatan: "dg", nama: "Desigram" },
  { singkatan: "cg", nama: "Centigram" },
  { singkatan: "mg", nama: "Miligram" },
  { singkatan: "kl", nama: "Kiloliter" },
  { singkatan: "hl", nama: "Hektoliter" },
  { singkatan: "dal", nama: "Dekaliter" },
  { singkatan: "l", nama: "Liter" },
  { singkatan: "dl", nama: "Desiliter" },
  { singkatan: "cl", nama: "Centiliter" },
  { singkatan: "ml", nama: "Mililiter" },
];

const DetailProductCalculate = () => {
  const [productData, setProductData] = useState({
    namaProduk: "",
    deskripsi: "",
    hargaJual: "",
    jumlahProdukJadi: "",
    persentaseKeuntungan: "",
  });

  const [bahanList, setBahanList] = useState([
    { nama: "", hargaBahan: "", satuan: "gr", isi: "", jumlah: "", harga: 0 },
  ]);

  const [operasionalList, setOperasionalList] = useState([
    { jenis: "", harga: "", isi: "", totalPakai: "", totalHarga: 0 },
  ]);

  // Update harga bahan otomatis
  useEffect(() => {
    const updated = bahanList.map((item) => {
      const { hargaBahan, isi, jumlah } = item;
      if (hargaBahan && isi && jumlah) {
        const harga = (jumlah / isi) * hargaBahan;
        return { ...item, harga: Math.round(harga) };
      }
      return { ...item, harga: 0 };
    });
    setBahanList(updated);
  }, [
    bahanList
      .map((item) => `${item.hargaBahan}-${item.isi}-${item.jumlah}`)
      .join(","),
  ]);

  // Update harga operasional otomatis
  useEffect(() => {
    const updated = operasionalList.map((item) => {
      const { harga, isi, totalPakai } = item;
      if (harga && isi && totalPakai) {
        const totalHarga = (totalPakai / isi) * harga;
        return { ...item, totalHarga: Math.round(totalHarga) };
      }
      return { ...item, totalHarga: 0 };
    });
    setOperasionalList(updated);
  }, [
    operasionalList
      .map((item) => `${item.harga}-${item.isi}-${item.totalPakai}`)
      .join(","),
  ]);

  const handleProductChange = (name, value) => {
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBahanChange = (index, name, value) => {
    const updated = [...bahanList];
    updated[index][name] =
      name === "nama" || name === "satuan" ? value : parseFloat(value) || "";
    setBahanList(updated);
  };

  const handleOperasionalChange = (index, name, value) => {
    const updated = [...operasionalList];
    updated[index][name] = name === "jenis" ? value : parseFloat(value) || "";
    setOperasionalList(updated);
  };

  const handleTambahBahan = () => {
    setBahanList([
      ...bahanList,
      {
        nama: "",
        hargaBahan: "",
        satuan: "gr",
        isi: "",
        jumlah: "",
        harga: 0,
      },
    ]);
  };

  const handleTambahOperasional = () => {
    setOperasionalList([
      ...operasionalList,
      {
        jenis: "",
        harga: "",
        isi: "",
        totalPakai: "",
        totalHarga: 0,
      },
    ]);
  };

  const handleHapusBahan = (index) => {
    if (bahanList.length > 1) {
      const updated = bahanList.filter((_, i) => i !== index);
      setBahanList(updated);
    }
  };

  const handleHapusOperasional = (index) => {
    if (operasionalList.length > 1) {
      const updated = operasionalList.filter((_, i) => i !== index);
      setOperasionalList(updated);
    }
  };

  // Perhitungan otomatis
  const totalBiayaBahan = bahanList.reduce(
    (sum, item) => sum + (item.harga || 0),
    0
  );
  const totalBiayaOperasional = operasionalList.reduce(
    (sum, item) => sum + (item.totalHarga || 0),
    0
  );
  const totalBiayaProduksi = totalBiayaBahan + totalBiayaOperasional;
  const jumlahProduk = parseFloat(productData.jumlahProdukJadi) || 0;
  const hppPerProduk =
    jumlahProduk > 0 ? Math.round(totalBiayaProduksi / jumlahProduk) : 0;
  const hargaJual = parseFloat(productData.hargaJual) || 0;
  const persentaseKeuntungan =
    hppPerProduk > 0
      ? Math.round(((hargaJual - hppPerProduk) / hppPerProduk) * 100)
      : 0;

  // Fungsi untuk export ke Excel
  const handleExportExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Data untuk worksheet dengan format tabel
    const data = [];

    // Header laporan
    data.push(["LAPORAN HARGA POKOK PRODUKSI (HPP)"]);
    data.push([]);
    data.push(["Tanggal Laporan:", new Date().toLocaleDateString("id-ID")]);
    data.push([]);

    // TABEL 1: DETAIL PRODUK
    data.push(["DETAIL PRODUK"]);
    data.push([]);
    data.push(["Keterangan", "Detail"]);
    data.push(["─".repeat(20), "─".repeat(30)]);
    data.push(["Nama Produk", productData.namaProduk || "-"]);
    data.push(["Deskripsi", productData.deskripsi || "-"]);
    data.push(["Harga Jual", `Rp ${hargaJual.toLocaleString("id-ID")}`]);
    data.push(["Jumlah Produk Jadi", `${jumlahProduk} pcs`]);
    data.push([]);

    // TABEL 2: BIAYA BAHAN
    data.push(["BIAYA BAHAN"]);
    data.push([]);
    data.push([
      "No",
      "Nama Bahan",
      "Harga Bahan (Rp)",
      "Satuan",
      "Isi/Kemasan",
      "Jumlah Terpakai",
      "Total Harga (Rp)",
    ]);
    data.push([
      "─".repeat(3),
      "─".repeat(20),
      "─".repeat(15),
      "─".repeat(10),
      "─".repeat(12),
      "─".repeat(15),
      "─".repeat(18),
    ]);

    const bahanStartRow = data.length;
    bahanList.forEach((bahan, index) => {
      const satuanNama =
        satuanList.find((s) => s.singkatan === bahan.satuan)?.nama ||
        bahan.satuan;
      data.push([
        index + 1,
        bahan.nama || "-",
        bahan.hargaBahan
          ? `Rp ${parseFloat(bahan.hargaBahan).toLocaleString("id-ID")}`
          : "-",
        satuanNama,
        bahan.isi || "-",
        bahan.jumlah || "-",
        `Rp ${(bahan.harga || 0).toLocaleString("id-ID")}`,
      ]);
    });

    data.push([
      "═".repeat(3),
      "═".repeat(20),
      "═".repeat(15),
      "═".repeat(10),
      "═".repeat(12),
      "TOTAL BIAYA BAHAN:",
      `Rp ${totalBiayaBahan.toLocaleString("id-ID")}`,
    ]);
    data.push([]);

    // TABEL 3: BIAYA OPERASIONAL
    data.push(["BIAYA OPERASIONAL"]);
    data.push([]);
    data.push([
      "No",
      "Jenis Biaya",
      "Harga Satuan (Rp)",
      "Isi/Kemasan",
      "Total Pemakaian",
      "Total Harga (Rp)",
    ]);
    data.push([
      "─".repeat(3),
      "─".repeat(20),
      "─".repeat(18),
      "─".repeat(12),
      "─".repeat(15),
      "─".repeat(18),
    ]);

    const operasionalStartRow = data.length;
    operasionalList.forEach((operasional, index) => {
      data.push([
        index + 1,
        operasional.jenis || "-",
        operasional.harga
          ? `Rp ${parseFloat(operasional.harga).toLocaleString("id-ID")}`
          : "-",
        operasional.isi || "-",
        operasional.totalPakai || "-",
        `Rp ${(operasional.totalHarga || 0).toLocaleString("id-ID")}`,
      ]);
    });

    data.push([
      "═".repeat(3),
      "═".repeat(20),
      "═".repeat(18),
      "═".repeat(12),
      "TOTAL BIAYA OPERASIONAL:",
      `Rp ${totalBiayaOperasional.toLocaleString("id-ID")}`,
    ]);
    data.push([]);

    // TABEL 4: RINGKASAN HPP
    data.push(["RINGKASAN HARGA POKOK PRODUKSI"]);
    data.push([]);
    data.push(["Komponen Biaya", "Jumlah (Rp)"]);
    data.push(["─".repeat(25), "─".repeat(20)]);
    data.push([
      "Total Biaya Bahan",
      `Rp ${totalBiayaBahan.toLocaleString("id-ID")}`,
    ]);
    data.push([
      "Total Biaya Operasional",
      `Rp ${totalBiayaOperasional.toLocaleString("id-ID")}`,
    ]);
    data.push(["═".repeat(25), "═".repeat(20)]);
    data.push([
      "TOTAL BIAYA PRODUKSI",
      `Rp ${totalBiayaProduksi.toLocaleString("id-ID")}`,
    ]);
    data.push([]);

    // TABEL 5: ANALISIS KEUNTUNGAN
    data.push(["ANALISIS KEUNTUNGAN"]);
    data.push([]);
    data.push(["Keterangan", "Nilai"]);
    data.push(["─".repeat(25), "─".repeat(20)]);
    data.push(["Jumlah Produk Jadi", `${jumlahProduk} pcs`]);
    data.push(["HPP per Produk", `Rp ${hppPerProduk.toLocaleString("id-ID")}`]);
    data.push([
      "Harga Jual per Produk",
      `Rp ${hargaJual.toLocaleString("id-ID")}`,
    ]);
    data.push([
      "Keuntungan per Produk",
      `Rp ${(hargaJual - hppPerProduk).toLocaleString("id-ID")}`,
    ]);
    data.push(["Persentase Keuntungan", `${persentaseKeuntungan}%`]);

    // Buat worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths yang proporsional
    worksheet["!cols"] = [
      { wch: 5 }, // No - sempit
      { wch: 25 }, // Nama/Jenis - lebar
      { wch: 18 }, // Harga - sedang
      { wch: 12 }, // Satuan/Isi - kecil
      { wch: 15 }, // Jumlah/Total - sedang
      { wch: 18 }, // Total Pakai - sedang
      { wch: 20 }, // Total Harga - lebar
    ];

    // Styling function yang lebih efisien
    const applyCellStyle = (row, col, style) => {
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
      if (!worksheet[cellRef]) worksheet[cellRef] = { v: "", t: "s" };
      worksheet[cellRef].s = style;
    };

    // Style untuk judul utama
    if (!worksheet["!merges"]) worksheet["!merges"] = [];
    worksheet["!merges"].push({ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } });

    applyCellStyle(0, 0, {
      font: { bold: true, sz: 16, color: { rgb: "FFFFFF" } },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "2F4F4F" } },
      border: {
        top: { style: "thick", color: { rgb: "000000" } },
        bottom: { style: "thick", color: { rgb: "000000" } },
        left: { style: "thick", color: { rgb: "000000" } },
        right: { style: "thick", color: { rgb: "000000" } },
      },
    });

    // Style untuk header section
    const sectionHeaders = [
      "DETAIL PRODUK",
      "BIAYA BAHAN",
      "BIAYA OPERASIONAL",
      "RINGKASAN HARGA POKOK PRODUKSI",
      "ANALISIS KEUNTUNGAN",
    ];

    data.forEach((row, index) => {
      if (sectionHeaders.includes(row[0])) {
        // Merge cells untuk section header
        worksheet["!merges"].push({
          s: { r: index, c: 0 },
          e: { r: index, c: 6 },
        });

        applyCellStyle(index, 0, {
          font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
          alignment: { horizontal: "center", vertical: "center" },
          fill: { fgColor: { rgb: "4682B4" } },
          border: {
            top: { style: "medium" },
            bottom: { style: "medium" },
            left: { style: "medium" },
            right: { style: "medium" },
          },
        });
      }

      if (
        (row[0] === "No" ||
          row[0] === "Keterangan" ||
          row[0] === "Komponen Biaya") &&
        row[1]
      ) {
        for (let col = 0; col < row.length; col++) {
          applyCellStyle(index, col, {
            font: { bold: true, sz: 10, color: { rgb: "000000" } },
            alignment: { horizontal: "center", vertical: "center" },
            fill: { fgColor: { rgb: "E0E0E0" } },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          });
        }
      }

      if (!isNaN(row[0]) && row[0] !== "" && row[0] !== undefined) {
        for (let col = 0; col < row.length; col++) {
          applyCellStyle(index, col, {
            alignment: {
              horizontal: col === 0 ? "center" : col >= 2 ? "right" : "left",
              vertical: "center",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          });
        }
      }

      if (
        row[0] &&
        row[1] &&
        typeof row[0] === "string" &&
        !row[0].includes("─") &&
        !row[0].includes("═") &&
        !sectionHeaders.includes(row[0]) &&
        row[0] !== "No" &&
        row[0] !== "Keterangan" &&
        row[0] !== "Komponen Biaya" &&
        isNaN(row[0])
      ) {
        for (let col = 0; col < 2; col++) {
          applyCellStyle(index, col, {
            alignment: {
              horizontal: col === 0 ? "left" : "left",
              vertical: "center",
            },
            border: {
              top: { style: "thin" },
              bottom: { style: "thin" },
              left: { style: "thin" },
              right: { style: "thin" },
            },
          });
        }
      }

      if (
        row.some(
          (cell) =>
            typeof cell === "string" &&
            (cell.includes("TOTAL") || cell.includes("═"))
        )
      ) {
        for (let col = 0; col < row.length; col++) {
          applyCellStyle(index, col, {
            font: { bold: true, sz: 10 },
            alignment: { horizontal: "right", vertical: "center" },
            fill: { fgColor: { rgb: "F0F8FF" } },
            border: {
              top: { style: "medium" },
              bottom: { style: "medium" },
              left: { style: "medium" },
              right: { style: "medium" },
            },
          });
        }
      }
    });

    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan HPP");

    // Export file
    const fileName = `Laporan_HPP_${
      productData.namaProduk
        ? productData.namaProduk.replace(/[^a-zA-Z0-9]/g, "_")
        : "Produk"
    }_${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="w-full px-4 mt-14 py-6">
        {/* Bagian Detail Produk */}
        <div className="w-full mb-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-bold mb-4 text-white bg-blue-600 py-3 rounded">
              DETAIL PRODUK
            </h2>
            <table className="w-full table-fixed border border-blue-600 text-sm">
              <tbody>
                <tr className="bg-blue-400 text-white">
                  <th className="border border-blue-600 px-3 py-2 text-left bg-blue-400 text-white w-1/3 md:w-48">
                    Nama Produk
                  </th>
                  <td className="border border-blue-600 px-3 py-2 bg-white">
                    <input
                      type="text"
                      value={productData.namaProduk}
                      onChange={(e) =>
                        handleProductChange("namaProduk", e.target.value)
                      }
                      placeholder="Masukkan nama produk"
                      className="w-full px-3 py-2 outline-none bg-white text-black placeholder:text-gray-500 rounded"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border border-blue-600 px-3 py-2 text-left bg-blue-400 text-white">
                    Deskripsi
                  </th>
                  <td className="border border-blue-600 px-3 py-2 bg-white">
                    <textarea
                      value={productData.deskripsi}
                      onChange={(e) =>
                        handleProductChange("deskripsi", e.target.value)
                      }
                      placeholder="Deskripsi produk"
                      className="w-full px-3 py-2 outline-none rounded"
                      rows={3}
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th className="border border-blue-600 px-3 py-2 text-left bg-blue-400 text-white">
                    Harga Jual
                  </th>
                  <td className="border border-blue-600 px-3 py-2 bg-white">
                    <input
                      type="number"
                      value={productData.hargaJual}
                      onChange={(e) =>
                        handleProductChange("hargaJual", e.target.value)
                      }
                      placeholder="Rp"
                      className="w-full px-3 py-2 outline-none rounded"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="border border-blue-600 px-3 py-2 text-left bg-blue-400 text-white">
                    Jumlah Produk Jadi
                  </th>
                  <td className="border border-blue-600 px-3 py-2 bg-white">
                    <input
                      type="number"
                      value={productData.jumlahProdukJadi}
                      onChange={(e) =>
                        handleProductChange("jumlahProdukJadi", e.target.value)
                      }
                      placeholder="Jumlah produk yang dihasilkan"
                      className="w-full px-3 py-2 outline-none rounded"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bagian Biaya Bahan */}
        <div className="w-full mb-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-bold mb-4 text-white bg-blue-600 py-3 rounded">
              BIAYA BAHAN
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm border border-blue-600 text-center">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-blue-600 px-3 py-2">No</th>
                    <th className="border border-blue-600 px-3 py-2">
                      Nama Bahan
                    </th>
                    <th className="border border-blue-600 px-3 py-2">
                      Harga Bahan
                    </th>
                    <th className="border border-blue-600 px-3 py-2">Satuan</th>
                    <th className="border border-blue-600 px-3 py-2">Isi</th>
                    <th className="border border-blue-600 px-3 py-2">
                      Jumlah Terpakai
                    </th>
                    <th className="border border-blue-600 px-3 py-2">Harga</th>
                    <th className="border border-blue-600 px-3 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {bahanList.map((bahan, index) => (
                    <tr key={index} className="bg-white hover:bg-blue-50">
                      <td className="border border-blue-600 px-3 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="text"
                          value={bahan.nama}
                          onChange={(e) =>
                            handleBahanChange(index, "nama", e.target.value)
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Nama"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={bahan.hargaBahan}
                          onChange={(e) =>
                            handleBahanChange(
                              index,
                              "hargaBahan",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Rp"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <div className="relative w-full">
                          <select
                            value={bahan.satuan}
                            onChange={(e) =>
                              handleBahanChange(index, "satuan", e.target.value)
                            }
                            className="w-full min-w-max pr-6 px-2 py-1 outline-none text-sm bg-white text-black rounded appearance-none"
                          >
                            <option value="">Pilih satuan</option>
                            {satuanList.map((item, i) => (
                              <option key={i} value={item.singkatan}>
                                {item.nama} ({item.singkatan})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                            ▼
                          </div>
                        </div>
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={bahan.isi}
                          onChange={(e) =>
                            handleBahanChange(index, "isi", e.target.value)
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Isi"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={bahan.jumlah}
                          onChange={(e) =>
                            handleBahanChange(index, "jumlah", e.target.value)
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Jumlah"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={bahan.harga}
                          readOnly
                          className="w-full px-2 py-1 outline-none bg-gray-100 text-black rounded"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <button
                          onClick={() => handleHapusBahan(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          disabled={bahanList.length === 1}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-center">
                <button
                  onClick={handleTambahBahan}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"
                >
                  + Tambah Bahan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Biaya Operasional */}
        <div className="w-full mb-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-bold mb-4 text-white bg-blue-600 py-3 rounded">
              BIAYA OPERASIONAL
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm border border-blue-600 text-center">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-blue-600 px-3 py-2">No</th>
                    <th className="border border-blue-600 px-3 py-2">Jenis</th>
                    <th className="border border-blue-600 px-3 py-2">Harga</th>
                    <th className="border border-blue-600 px-3 py-2">Isi</th>
                    <th className="border border-blue-600 px-3 py-2">
                      Total Pakai
                    </th>
                    <th className="border border-blue-600 px-3 py-2">
                      Total Harga
                    </th>
                    <th className="border border-blue-600 px-3 py-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {operasionalList.map((operasional, index) => (
                    <tr key={index} className="bg-white hover:bg-blue-50">
                      <td className="border border-blue-600 px-3 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="text"
                          value={operasional.jenis}
                          onChange={(e) =>
                            handleOperasionalChange(
                              index,
                              "jenis",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Jenis biaya"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={operasional.harga}
                          onChange={(e) =>
                            handleOperasionalChange(
                              index,
                              "harga",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Rp"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={operasional.isi}
                          onChange={(e) =>
                            handleOperasionalChange(
                              index,
                              "isi",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Isi"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={operasional.totalPakai}
                          onChange={(e) =>
                            handleOperasionalChange(
                              index,
                              "totalPakai",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 outline-none rounded"
                          placeholder="Total pakai"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <input
                          type="number"
                          value={operasional.totalHarga}
                          readOnly
                          className="w-full px-2 py-1 outline-none bg-gray-100 text-black rounded"
                        />
                      </td>
                      <td className="border border-blue-600 px-3 py-2">
                        <button
                          onClick={() => handleHapusOperasional(index)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          disabled={operasionalList.length === 1}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 text-center">
                <button
                  onClick={handleTambahOperasional}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold"
                >
                  + Tambah Biaya Operasional
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Ringkasan HPP */}
        <div className="w-full mb-6">
          <div className="bg-blue-200 p-6 rounded-lg shadow-md">
            <h2 className="text-center text-lg font-bold mb-4 text-white bg-blue-600 py-3 rounded">
              RINGKASAN HPP
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-blue-600">
                <h3 className="font-bold text-blue-800 mb-4 text-lg">
                  Biaya Produksi
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Biaya Bahan:</span>
                    <span className="font-semibold text-blue-800 text-lg">
                      Rp {totalBiayaBahan.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Biaya Operasional:</span>
                    <span className="font-semibold text-blue-800 text-lg">
                      Rp {totalBiayaOperasional.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center font-bold">
                    <span>Total Biaya Produksi:</span>
                    <span className="text-blue-800 text-xl">
                      Rp {totalBiayaProduksi.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg border border-blue-600">
                <h3 className="font-bold text-blue-800 mb-4 text-lg">
                  Analisis Produk
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Jumlah Produk Jadi:</span>
                    <span className="font-semibold text-lg">
                      {jumlahProduk} pcs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>HPP per Produk:</span>
                    <span className="font-semibold text-blue-800 text-lg">
                      Rp {hppPerProduk.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Harga Jual:</span>
                    <span className="font-semibold text-lg">
                      Rp {hargaJual.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center font-bold">
                    <span>Persentase Keuntungan:</span>
                    <span
                      className={`text-xl ${
                        persentaseKeuntungan >= 0
                          ? "text-blue-600"
                          : "text-red-600"
                      }`}
                    >
                      {persentaseKeuntungan}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleExportExcel}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-5 h-5" />
              Cetak Laporan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProductCalculate;
