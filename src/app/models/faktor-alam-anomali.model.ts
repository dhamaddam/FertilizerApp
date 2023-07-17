export class FaktorAlamAnomali {
    
    constructor(
        public user_id: string,
        public company: string,
        public kebun: string,
        public afdelling: string,
        public nomor_blok: string,
        public nomor_kcd: string,
        public tanggal: string,
        //top of parameter always used 
        public curah_hujan: string,
        public hari_hujan: string,
        public serangan_hama: string,
        public serangan_penyakit: string,
       
     ) {}

}