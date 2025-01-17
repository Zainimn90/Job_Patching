const getCpitNull = `

-- TEMP SOLUTION (CPIT NULL)
select
	c.db_ts,
	c.bank_id,
	c.application_id,
	account_number payroll_acc_num,
	left(account_number, 4) payroll_acc_branch,
	'' saving_amount,
	'' gender_wl,
	'' place_of_birth_wl,
	'' address_wl,
	'' name_wl,
	null birth_date_wl,
	null as free_txt1,
	null as free_txt2,
	null as free_date1,
	null as free_date2,
	'N' as del_flg,
	c.r_mod_id,
	c.r_mod_time,
	c.r_cre_id,
	c.r_cre_time,
	null as outlet_id,
	null as briva,
    legacy_cif,
	c.bank_code
from
	ececuser.clat c
join ececuser.capwd x on
	c.application_id = x.application_id
	where 
	c.application_status in ('PAYROLL_APP', 'DOCUMENT_SIGNED', 'KTP_SAVED')
	-- c.application_id = '4872550'
	and not exists (
	select
		application_id
	from
		ececuser.cpit cp
	where
		cp.application_id = c.application_id );`

	const insertCpitNull = `

	-- TEMP SOLUTION (CPIT NULL)
INSERT INTO ececuser.cpit (
    db_ts,
    bank_id,
    application_id,
    payroll_account_num,
    payroll_acc_branch,
    saving_amount,
    gender_wl,
    place_of_birth_wl,
    address_wl,
    name_wl,
    birth_date_wl,
    free_txt1,
    free_txt2,
    free_date1,
    free_date2,
    del_flg,
    r_mod_id,
    r_mod_time,
    r_cre_id,
    r_cre_time,
    outlet_id,
    briva
)
SELECT
    c.db_ts,
    c.bank_id,
    c.application_id,
    account_number payroll_acc_num,
    left(account_number,4) payroll_acc_branch, 
    '100000' saving_amount,
    '' gender_wl,
    '' place_of_birth_wl,
    '' address_wl,
    '' name_wl,
    null birth_date_wl,
    NULL AS free_txt1,
    NULL AS free_txt2,
    NULL AS free_date1,
    NULL AS free_date2,
    'N' AS del_flg,
    c.r_mod_id,
    c.r_mod_time,
    c.r_cre_id,
    c.r_cre_time,
    NULL AS outlet_id,
    NULL AS briva
FROM ececuser.clat c
JOIN ececuser.capwd x ON c.application_id = x.application_id
WHERE 
 c.application_status in ('PAYROLL_APP', 'DOCUMENT_SIGNED', 'KTP_SAVED')
 -- c.application_id ='4872550'
    AND NOT EXISTS (
        SELECT application_id
        FROM ececuser.cpit cp
        WHERE cp.application_id = c.application_id );`

	const updateCpit = (nama, gender, dob, pob, address, appid, avaliableBalance) => {
		return `
	update
		ececuser.cpit
	set
		name_wl = '${nama}',
		gender_wl = '${gender}',
		birth_date_wl = '${dob}',
		place_of_birth_wl = '${pob}',
		address_wl = '${address}',
		saving_amount = ${avaliableBalance}
	where
		application_id = '${appid}';
	`
	}

	const getCpit = (appid) => {
		return `
select
	cpit.application_id,
	cpit.gender_wl,
	clat.bank_code,
	clat.legacy_cif,
	capwd.account_number
from
	ececuser.cpit cpit
join ececuser.clat clat on
	cpit.application_id = clat.application_id
join ececuser.capwd capwd on
	cpit.application_id = capwd.application_id
where
cpit.application_id in (${appid});
`
	}

module.exports = { 
	getCpitNull,
	insertCpitNull,
	updateCpit,
	getCpit
}