const productGroup = (date) => {
	return `select 
		-- schm_code,
		-- product_group,
		-- acct_opn_date,
		foracid 
		from 
		tbaadm.gam 
	where 
		schm_code ='PNANG' 
	and 
		acct_cls_flg ='N' 
	and 
		acct_opn_date = '${date}'
	order by rcre_time desc;`
}

const updateProductGroup = (foracid) => {
	return `update 
		tbaadm.gam 
	set 
		product_group ='2024' 
	where 
		foracid in (${foracid});`
}

module.exports = { productGroup, updateProductGroup }