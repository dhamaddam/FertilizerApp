export class KondisiLahan {
    
    constructor(
        public user_id: string,
        public company: string,
        public kebun: string,
        public afdelling: string,
        public nomor_blok: string,
        public nomor_kcd: string,
        public tanggal: string,
        //top of parameter always used 
        public elevasi: string,
        public kemiringan_lereng: string,
        public saluran_irigasi: string,
        public topografi: string,
        public teras: string,
     ) {}

}