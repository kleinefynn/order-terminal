import { lastValueFrom } from 'rxjs';
import { productService } from './ProductService';
import { sqliteService } from './SQLiteService';

class AppInitializer {
    platform: string = sqliteService.getPlatform();
    async initialize() {
        // Perform initialization tasks, such as setting up plugin
        await this.setupPlugin();
        if (this.platform === 'web') {                
            await new Promise(r => setTimeout(r, 100));
        }
        await this.setupProductDatabase();

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
            let v = lastValueFrom(productService.isInitCompleted);
            await productService.initializeDatabase();
            if (this.platform === 'web') {
                await sqliteService.saveToStore(productService.getDatabaseName());
            }
            await v;
            return;
        } catch(err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`AppInitializer setupUserDatabase: ${msg}`);        
        }

    }
}

// Create a singleton instance of the AppInitializer service
const appInitializer = new AppInitializer();

export default appInitializer;