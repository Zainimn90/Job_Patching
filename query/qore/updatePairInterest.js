const updatePairInterest = (acid)=>{
    return `
    update
        tbaadm.eit
    set
        nrml_accrued_amount_dr = nrml_interest_amount_dr,
        nrml_booked_amount_dr = nrml_interest_amount_dr
    where
        entity_id in (${acid});`
}

module.exports = { updatePairInterest }