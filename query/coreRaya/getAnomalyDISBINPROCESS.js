const getAnomalyDISBINPROCESS = nik => {
	return `select
	case a.LOANTYPE when '10018' then 'PNANG' when '40007' then 'PLNEW' else LOANTYPE end product_type,
	no_id NIK,
	c.CIFNUM,
	SHORTNAME,
	ACCOUNTNUMBER loan_account,
	CONVERT(datetime, STUFF(STUFF(OPENDAT6, 5, 0, '.'), 3, 0, '.'), 4) converte_date,
	b.remark,
	CAST(principalamount as float) as plafond,
	case a.status when 1 then 'aktif' when 2 then 'close' when 3 then 'DPK/NPL' when 4 then 'new open' else a.status end status_account,
	CAST(CBAL as float) as Outstanding
from AGROBANKCORESYSTEM.dbo.ABCS_M_LNMAST a,AUTODEBET.dbo.DISBURSE b,AGROBANKCORESYSTEM.dbo.ABCS_M_CFMAST c where a.accountnumber = b.LOAN_ACCOUNT and a.CIFNUM = c.cifnum and
	 CONVERT(datetime, STUFF(STUFF(OPENDAT6, 5, 0, '.'), 3, 0, '.'), 4) <= CONVERT(date, GETDATE()) and a.status != '2' and 
			c.no_id in(${nik}) 
order by nik ,CONVERT(datetime, STUFF(STUFF(OPENDAT6, 5, 0, '.'), 3, 0, '.'), 4) desc;`
}

module.exports = { getAnomalyDISBINPROCESS }