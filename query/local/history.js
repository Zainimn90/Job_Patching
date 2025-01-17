const insertHistory = `
INSERT INTO action_job_history (
    action_process, 
    before, 
    after, 
    table_name, 
    execute_by, 
    level,
    action_date
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    now()
);`

module.exports = {
    insertHistory
}