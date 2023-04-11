export class KeragaanTanah {
    
    constructor(
        public user_id: string,
        public company: string,
        public kebun: string,
        public afdelling: string,
        public nomor_blok: string,
        public nomor_kcd: string,
        public tanggal: string,
        //top of parameter always used 
        public jenis_tanah: string,
        public kategori_tanah: string,
        public kematangan: string,
        public tatakelola_air: string,
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
        public bahan_organik: string,
        public salinitas: string,
        public bulk_density: string,
        public mechanical_strength: string,
        public electric_conductivity: string,
        public water_holding_capacity: string,
        public hydraulic_conductivity: string,
        public kedalaman_solum: string,
        public kelembapan_tanah: string,
    ) {}

}