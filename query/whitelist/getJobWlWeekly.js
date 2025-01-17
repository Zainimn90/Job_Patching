const getJobWlWeekly = `
select 
  company,
  count(company) as value 
from (
  select case 
    when upper(nama_perusahaan_wl) similar to '%MITRA%CITRA%MANDIRI%|%MIYTRA CITRA MANDIRI%' then 'MITRA CITRA MANDIRI'
    when upper(nama_perusahaan_wl) similar to '%JVC INDONESIA%|%JVC%|%PTJVC%|%JVC%KENWOOD%' then 'JVC'
    when upper(nama_perusahaan_wl) similar to '%INDOMURO%|%INDOMORO KENCANA%|%INDO MURO%|%INDO MORO%|%INDO%MURO%KENCANA%' then 'INDOMURO'
    when upper(nama_perusahaan_wl) similar to '%CODAN%' then 'PONG CODAN INDONESIA' when upper(nama_perusahaan_wl) similar to '%CODAN%' then 'PONG CODAN INDONESIA' 
    when upper(nama_perusahaan_wl) similar to '%HILLCON%' then 'PT HILLCON JAYASHAKTI'
    when upper(nama_perusahaan_wl) similar to '%SINAR JERNIH SUKSESINDO%' then 'SINAR JERNIH SUKSESINDO'
    when upper(nama_perusahaan_wl) similar to '%TBP%|PT%TRIMEGAH BANGUN PERS%DA|%TRIMEGA BAGUN PERSADA%' then 'TRIMEGAH BANGUN PERSADA'
    when upper(nama_perusahaan_wl) similar to '%WANA%TIARA PERSADA|%WANATIARA PERSADA%|%WANATIARA|%WANA%TIARA%' then 'WANATIARA PERSADA' end company 
  from
    custom.payroll
  where
      upper(nama_perusahaan_wl) similar to '%HILLCON%|%CODAN%|%SINAR JERNIH SUKSESINDO%|%TBP%|PT%TRIMEGAH BANGUN PERS%DA|%TRIMEGA BAGUN PERSADA%|%WANA%TIARA PERSADA|%WANATIARA PERSADA%|%WANATIARA|%WANA%TIARA%'
) master
where 
  company in ('PT HILLCON JAYASHAKTI','PONG CODAN INDONESIA','SINAR JERNIH SUKSESINDO','TRIMEGAH BANGUN PERSADA','WANATIARA PERSADA')
group by company;`

module.exports = { getJobWlWeekly }