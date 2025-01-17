const UpdateJobWlDailyConcate = ()=>{
    return `
update custom.payroll
    set description = concat('B.497/DPD/PMN/08/2024',' - ',description),
    del_flag = 'false'
where payroll.acctno_wl in (
select acctno_wl from custom.payroll 
	where description in (
      'PAYROLL - TIDAK LOLOS AV, AV MINUS > 1 TITIK DALAM 1 BULAN PADA BULAN-3 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', 
      'PAYROLL - TIDAK LOLOS AV, AV < -10 JUTA ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', 
      'PAYROLL - TIDAK LOLOS AV, AV < -10 JUTA PADA BULAN-1 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', --add 1
      'PAYROLL - TIDAK LOLOS AV, AV < -10 JUTA PADA BULAN-2 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', --add 1
      'PAYROLL - TIDAK LOLOS AV, AV < -10 JUTA PADA BULAN-3 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', --add 1
      'PAYROLL - TIDAK LOLOS AV, AV MINUS > 1 TITIK DALAM 1 BULAN PADA BULAN-1 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK',
      'PAYROLL - TIDAK LOLOS AV, AV MINUS > 1 TITIK DALAM 1 BULAN PADA BULAN-1 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK', 
      'PAYROLL - TIDAK LOLOS AV, AV MINUS > 1 TITIK DALAM 1 BULAN PADA BULAN-2 ; LOLOS MINIMAL CREDIT ; LOLOS BPJS/DPLK',
      'PAYROLL - TIDAK LOLOS MAX KOLEK',
      'TIDAK LOLOS MAX KOLEK',
      'PAYROLL - TIDAK LOLOS, WORK END DATE TIDAK VALID',
      'PAYROLL - TIDAK LOLOS, WORK END DATE < TODAY',
      'PAYROLL - WORK END DATE TIDAK VALID',
      'PAYROLL - WORK END DATE < TODAY')
    and pendapatan_netto_wl > 0
    and bank_code = '002'
    -- and tgl_gajian_wl != '1901-01-01'
    and del_flag = 'true');
`
}

module.exports = { UpdateJobWlDailyConcate }