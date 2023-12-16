import { error } from "console";
export const findSuitableTable = async (getAvailableTablesResponse) => {
    try {
        const { availableTables, guestAmount } = getAvailableTablesResponse;

        const tableWithMaxCapacity = availableTables.reduce(
            (maxTable, currentTable) => {
                return currentTable.capacity > maxTable.capacity
                    ? currentTable
                    : maxTable;
            },
            availableTables[0]
        );

        if (guestAmount <= tableWithMaxCapacity.capacity) {
            const suitableTables = availableTables.filter(
                (table) => table.capacity >= guestAmount
            );

            suitableTables.sort((table1, table2) => {
                const diff1 = Math.abs(table1.capacity - guestAmount);
                const diff2 = Math.abs(table2.capacity - guestAmount);
                return diff1 - diff2;
            });
            // getOfflineSuitableTableResponse = suitableTables;
            return suitableTables;
        } else {
            return [];
        }
    } catch (e: any) {
        // return res.status(500).json(e);
        // throw new Error(e);
        return error(e);
    }
};
