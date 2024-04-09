import { lastValueFrom } from 'rxjs';
import { productService } from './ProductService';
import { sqliteService } from './SQLiteService';
import { purchaseRecordService } from './PurchaseRecordsService';

class AppInitializer {
    platform: string = sqliteService.getPlatform();
    async initialize() {
        // Perform initialization tasks, such as setting up plugin
        await this.setupPlugin();
        if (this.platform === 'web') {                
            await new Promise(r => setTimeout(r, 500));
        }
        await this.setupProductDatabase();
        await this.setupPurchaseDatabase();

    }

    private async setupPlugin() {
        // Set up plugins here (e.g., initialize Capacitor, initialize other plugins)
        console.log('Setting up plugins...');
        try {
            if (this.platform === 'web') {                
                await sqliteService.initWebStore();
            }
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupPlugin: ${msg}`);        
        }
    }

    private async setupProductDatabase() {
        try {
            await productService.initializeDatabase();
            if (this.platform === 'web') {
                await sqliteService.saveToStore(productService.getDatabaseName());
            }
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupUserDatabase: ${msg}`);        
        }
    }

    private async setupPurchaseDatabase() {
        try {
            await purchaseRecordService.initializeDatabase();
            if (this.platform === 'web') {
                await sqliteService.saveToStore(purchaseRecordService.getDatabaseName());
            }
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupPurchaseDatabase: ${msg}`);        
        }
    }
}

// Create a singleton instance of the AppInitializer service
const appInitializer = new AppInitializer();

export default appInitializer;