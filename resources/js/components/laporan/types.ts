export interface Transaction {
    id: number;
    tanggal: string;
    divisi?: {
        nama: string;
    };
    kategori_transaksi?: {
        nama: string;
    };
    tipe: 'pemasukan' | 'pengeluaran';
    nominal: number;
}

export interface LaporanData {
    pemasukan: number;
    pengeluaran: number;
    saldo: number;
    transaksi: Transaction[];
}
