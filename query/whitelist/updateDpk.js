const updateDpkMt14 = (nikwl) => {
    return `update custom.payroll_privilege set del_flag ='TRUE' , description ='DPK 14 hari' where nik_wl in (${nikwl});`
}

const updateDpkPnang91 = (nikwl) => {
    return `update custom.payroll_privilege set del_flag ='TRUE' , description ='DPK 91 hari' where nik_wl in (${nikwl});`
}

module.exports = { updateDpkMt14, updateDpkPnang91 }