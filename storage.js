export class CADStorage {
    constructor() {
        this.dbName = 'FusionLiteDB';
        this.storeName = 'projects';
    }

    async initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async saveProject(projectData) {
        const db = await this.initDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            // projectData should include: { id: 'default', historyTree: [], stepBlob: ... }
            const request = store.put(projectData);
            
            request.onsuccess = () => resolve('Project Saved Locally');
            request.onerror = () => reject(request.error);
        });
    }
}
