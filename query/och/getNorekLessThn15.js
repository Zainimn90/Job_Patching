const getNorekLessThn15Befor = (condition, limit) => {
	return `select
	clat.application_id,
	payroll_account_num,
	length(payroll_account_num) anm_count
from
	ececuser.clpa,
	ececuser.clat
where
	clpa.application_id = clat.application_id
and application_status = 'LOAN_CREATED'
and length(payroll_account_num) < 15
and rayanet_flag = 'Y' 
${condition} 
order by application_id asc ${limit};
`}

const getNorekLessThn15After = (condition) => {
	return `select
	clat.application_id,
	payroll_account_num,
	length(payroll_account_num) anm_count
from
	ececuser.clpa,
	ececuser.clat
where
	clpa.application_id = clat.application_id
and application_status = 'LOAN_CREATED'
and rayanet_flag = 'Y' 
${condition}
order by application_id asc limit 500;
`}

const updatNorekLessThn15 = (payrollAccountNum) => {
	return `update
	ececuser.clpa
set
	payroll_account_num = (case
		when length(payroll_account_num) = 14 then concat('0',
		payroll_account_num)
		when length(payroll_account_num) = '13' then concat('00',
		payroll_account_num)
		when length(payroll_account_num) = '12' then concat('000',
		payroll_account_num)
	end )
where
	payroll_account_num in (${payrollAccountNum});
`}

module.exports = { 
	getNorekLessThn15Befor,
	getNorekLessThn15After,
	updatNorekLessThn15
 }