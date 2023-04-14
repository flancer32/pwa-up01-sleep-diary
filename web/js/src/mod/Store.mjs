// MODULE'S VARS
const IDB = 'SleepDiary';
const VERSION = 1;
const STORE_ITEMS = 'items';
let DB;

// MODULE'S FUNCS
function openDb() {
    if (!DB)
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(IDB, VERSION);
            req.onupgradeneeded = (evt) => {
                const db = evt.target.result;
                db.createObjectStore(STORE_ITEMS, {autoIncrement: true});
            };

            req.onsuccess = (evt) => {
                DB = evt.target.result;
                resolve();
            };

            req.onerror = function () {
                console.error('IDB open error:' + req.error);
                reject();
            };
        });
}

// MODULE'S MAIN

export default {
    async create(data) {
        await openDb();
        const trn = DB.transaction([STORE_ITEMS], 'readwrite');
        const os = trn.objectStore(STORE_ITEMS);
        os.add({data});
        trn.commit();
    },
    async list() {
        return new Promise(async (resolve) => {
            await openDb();
            const trn = DB.transaction([STORE_ITEMS]);
            const os = trn.objectStore(STORE_ITEMS);
            const req = await os.getAll();
            req.onsuccess = () => resolve(req.result);
            trn.commit();
        });

    },
}