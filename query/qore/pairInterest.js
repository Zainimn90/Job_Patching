const pairInterest = `
select
	acid,
	Keterangan
from
	(
	select
		acct_name "NAMA_CUSTOMER",
		foracid "LOAN_ACCOUNT",
		(case
			when acct_cls_flg = 'N' then 'AKTIF'
			when acct_cls_flg = 'Y' then 'CLOSED'
		end) "STATUS",
		clr_bal_amt as "OutStanding",
		int_dmd_os "SISA_PAYDUE",
		nrml_accrued_amount_dr,
		nrml_booked_amount_dr,
		nrml_interest_amount_dr,
		gam.acid,
		case
			when clr_bal_amt != int_dmd_os then 'DONT EXECUTE'
			when nrml_accrued_amount_dr != nrml_booked_amount_dr then 'UPDATE'
			when nrml_booked_amount_dr != nrml_interest_amount_dr then 'UPDATE'
			when nrml_interest_amount_dr = nrml_booked_amount_dr
			and nrml_interest_amount_dr = nrml_accrued_amount_dr then 'TUNGGU EOD'
		end Keterangan
	from
		tbaadm.gam
	join tbaadm.eit on
		gam.acid = eit.entity_id
	join tbaadm.lrs on
		gam.acid = lrs.acid
	join tbaadm.lam on
		gam.acid = lam.acid
	where
		acct_cls_flg = 'N'
		and 
    schm_code in ('PNANG', 'PNNEW')
		and 
    clr_bal_amt = 0
	group by
		int_dmd_os,
		prin_dmd_os,
		num_of_flows,
		num_of_dmds,
		gam.foracid,
		gam.acct_name,
		acct_cls_flg,
		clr_bal_amt,
		nrml_accrued_amount_dr,
		nrml_booked_amount_dr,
		nrml_interest_amount_dr,
		gam.acid
	order by
		acct_name asc
)
where
	Keterangan = 'UPDATE';`

module.exports = { pairInterest }