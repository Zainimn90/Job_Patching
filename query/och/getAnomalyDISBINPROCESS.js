const getAnomalyDISBINPROCESS = (startDate, endDate) => {
	return `select
	clat.r_mod_id,
	clat.application_id,
	scheme_code ,
	pan_national_id,
	clad.name name_clad,
	application_status,
	clat.r_mod_time,
	clat.r_mod_id
from
	ececuser.clat ,	ececuser.clad ,	ececuser.cakd ,ececuser.cusr,ececuser.clpa
where
	clat.application_id = clad.application_id
	and clat.application_id = cakd.application_id
	and clat.application_id = clpa.application_id
	and clat.user_id = cusr.user_id
	and application_status in('DISB_IN_PROCESS') -- isi statusnya
	AND clat.r_mod_time >= TO_TIMESTAMP('${startDate}', 'YYYY-MM-DD')
    AND clat.r_mod_time < TO_TIMESTAMP('${endDate}', 'YYYY-MM-DD')
	and scheme_code in ('PNANG','PLNEW')
order by
	clat.r_mod_time desc;`
}

const patchLoanCreate = (appId, loanAccount, applicationStatus) => {
	return `
UPDATE 
    ececuser.clat 
SET 
    application_status = '${applicationStatus}',
	loan_account_id = '${loanAccount}' 
WHERE 
    application_id = '${appId}';`
}

const insertCLHT = ( appId, rModId, applicationStatus, dataInsertAfterRemarks) => {
	return `
INSERT INTO 
	ececuser.custom_loan_appln_his_table
	(
		db_ts, 
		bank_id, 
		application_id, 
		application_status, 
		remarks, 
		free_txt1, 
		free_txt2, 
		free_txt3, 
		free_date1, 
		free_date2, 
		del_flg, 
		r_mod_id, 
		r_mod_time,
		r_cre_id, 
		r_cre_time
	)
VALUES
	(
		1, 
		'01',
		'${appId}', 
		'${applicationStatus}', 
		'${dataInsertAfterRemarks}', 
		NULL, 
		NULL, 
		NULL, 
		NULL, 
		NULL, 
		'N', 
		'${rModId}', 
		now(), 
		'${rModId}',
		now()
	);`
}

module.exports = { 
	getAnomalyDISBINPROCESS,
	patchLoanCreate,
	insertCLHT
}