const dpkMt14 = `
select
--	foracid,
	gac.free_text_11
--	gam.acct_opn_date,
--	ei_perd_end_Date matured_date,
--	sol_bod_Date boddate,
--	abs(clr_bal_amt) clr_bal_amt ,
--	sys_calc_fee_amt prosf,
--	( (
--		select parameter_Value
--	from
--		custom.c_cpvalue
--	where
--		paramEter_id = 'PIN_PYLTR_LATEF_PCNT')/ 100 ) late_fee_pcnt,
--	abs(extract(day from ei_perd_end_date - sol_bod_Date)) no_days_for_latefees,
--	abs( (abs(clr_bal_amt)) * ( (select parameter_Value from custom.c_cpvalue where paramEter_id = 'PIN_PYLTR_LATEF_PCNT')/ 100 ) * extract(day from ei_perd_end_date - sol_bod_Date) ) late_fee_amt
from
	tbaadm.gam,tbaadm.lam,tbaadm.fe_Chat,tbaadm.sol,tbaadm.gac
where
	lam.acid = gam.acid
	and lam.acid = fe_chat.entity_id
	and gam.sol_id = sol.sol_id
	and gam.acid = gac.acid
	and fe_Chat.fee_type = 'PROSF'
	and gam.schm_code in('PYLTR',
	'PLNEW')
	and gam.acct_Cls_flg = 'N'
	and gam.entity_cre_flg = 'Y'
	and lam.payoff_flg = 'N'
	and gam.del_flg = 'N'
	and gam.acct_cls_Date is null
	and abs(extract(day from ei_perd_end_date - sol_bod_Date)) >= 14
	and lam.ei_perd_end_date < sol.sol_bod_Date;
    `
	const dpPnang91 = `select
	gac.free_text_11
from
	tbaadm.gam,tbaadm.gac
where gam.acid = gac.acid
	and gam.schm_code in('PNANG')
	and gam.acct_Cls_flg = 'N'
	and gam.entity_cre_flg = 'Y'
	and dpd_cntr > 90
order by dpd_cntr asc;`

module.exports = { dpkMt14, dpPnang91 }