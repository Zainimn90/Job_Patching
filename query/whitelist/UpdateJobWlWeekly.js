const UpdateJobWlWeekly = ()=>{
    return `
update
	custom.payroll
set
	del_flag = 'Y',
	description = 'B.127/ERM/EPM/08/2024 - UPDATE STATEMENT BLOCK LIST PERUSAHAAN PADA WHITELIST PINANG FLEXI'
where
	payroll.acctno_wl in (
	select 
		acctno_wl
	from
		custom.payroll
	where
		upper(nama_perusahaan_wl) similar to '%HILLCON%|%CODAN%|%SINAR JERNIH SUKSESINDO%|%TBP%|PT%TRIMEGAH BANGUN PERS%DA|%TRIMEGA BAGUN PERSADA%|%WANA%TIARA PERSADA|%WANATIARA PERSADA%|%WANATIARA|%WANA%TIARA%|%MITRA%CITRA%MANDIRI%|%MIYTRA CITRA MANDIRI%|%JVC INDONESIA%|%JVC%|%PTJVC%|%JVC%KENWOOD%|%INDOMURO%|%INDOMORO KENCANA%|%INDO MURO%|%INDO MORO%|%INDO%MURO%KENCANA%|%HOTAN JAYA GRAHA%|%HOTANJAYA%'
	and del_flag = 'false'
);`
}

module.exports = { UpdateJobWlWeekly }