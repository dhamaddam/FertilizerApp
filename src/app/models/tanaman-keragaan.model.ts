export class KeragaanTanaman {
    
    constructor(
        public user_id: string,
        public company: string,
        public kebun: string,
        public afdelling: string,
        public nomor_blok: string,
        public nomor_kcd: string,
        public tanggal: string,
        //top of parameter always used 
        public pertumbuhan: string,
        public indeks_luas_daun: string,
        
        public nitrogen: string,
        public phospat: string,
        public kalium: string,
        public calsium: string,
        public magnesium: string,
        public carbon: string,
        public ferum: string,
        public mangan: string,
        public zn_seng: string,
        public cu_tembaga: string,
        public ph_asam: string,
    
        public keragaan_tanaman: string,
        public bangunan_konservasi: string,
        public penanggulangan_gulma: string,
        public topografi: string,
     ) {}

}