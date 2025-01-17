const isDpk = (nikwl) => {
    return `
        select nik_wl, acctno_wl, del_flag, description from custom.payroll_privilege where nik_wl in (${nikwl});
    `
}

module.exports = { isDpk }