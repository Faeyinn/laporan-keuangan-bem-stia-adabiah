export interface FinancialReportItem {
    name: string;
    pemasukan: number;
    pengeluaran: number;
}

export interface Transaksi {
    id: number;
    tanggal: string;
    deskripsi: string;
    nominal: number;
    tipe: 'pemasukan' | 'pengeluaran';
    divisi?: { nama: string };
    kategori_transaksi?: { nama: string };
    user?: { name: string };
}
