export const parseData = (rawData) => {
    const currentDate = new Date(Date.now());
    const currentMonth = currentDate.getMonth();
    const months = [currentMonth - 2, currentMonth - 1, currentMonth];
    if(months[0] < 0) {
        months[0] += 12;
    }
    if(months[1] < 0) {
        months[1] += 12;
    }
    const income = rawData.filter(value => value.type === "INCOME");
    const expenses = rawData.filter(value => value.type === "EXPENSE");
    
    const monthlyTotalIncome = [];
    months.forEach((month, index) => {
        monthlyTotalIncome[index] = income.filter((i) => {
            const date = new Date(i.CreatedAt);
            return month === date.getMonth();
        }).reduce((totalIncome, i) => {
            totalIncome += i.value;
            return totalIncome;
        }, 0);
    });

    const monthlyTotalExpenses = [];
    months.forEach((month, index) => {
        monthlyTotalExpenses[index] = expenses.filter((e) => {
            const date = new Date(e.CreatedAt);
            return month === date.getMonth();
        }).reduce((totalExpenses, e) => {
            totalExpenses += e.value;
            return totalExpenses;
        }, 0);
    });

    return {months, monthlyTotalIncome, monthlyTotalExpenses};
};