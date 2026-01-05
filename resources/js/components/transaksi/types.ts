export interface Divisi {
    id: number;
    nama: string;
}

export interface Kategori {
    id: number;
    nama: string;
    tipe: 'pemasukan' | 'pengeluaran';
}

export interface Transaksi {
    id: number;
    tanggal: string;
    deskripsi: string;
    divisi?: Divisi;
    kategori_transaksi?: Kategori;
    tipe: 'pemasukan' | 'pengeluaran';
    nominal: number;
    user?: { name: string };
    divisi_id: number;
    kategori_transaksi_id: number;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface Pagination {
    current_page: number;
    from: number;
    to: number;
    total: number;
    links: PaginationLink[];
}
