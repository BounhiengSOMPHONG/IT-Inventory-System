const Product = require('../models/product.model');
const si = require("systeminformation");


const ProductService = {
    async create(data) {
        const asset_code = await this.generateAssetCode();
        const filledData = await this.fillSystemInfo(data);
        return Product.create({ ...filledData, assetCode: asset_code });
    },
    async generateAssetCode() {
        const lastCode = await Product.getLastCode();

        let nextNumber = 1;
        if (lastCode) {
            // Extract the number from either format: IT-XXXX or ITXXXX
            const lastNumber = parseInt(lastCode.replace("IT-", "").replace("IT", ""), 10);
            nextNumber = lastNumber + 1;
        }

        // Use the format ITXXXX to match existing data
        return `IT${String(nextNumber).padStart(4, "0")}`;
    },
    async fillSystemInfo(data) {
        const { diskLayout, mem, cpu, osInfo } = si;

        if (!data.hd || !data.ram || !data.cpu) {
            try {
                const [disk, memory, proc, os] = await Promise.all([
                    diskLayout(),
                    mem(),
                    cpu(),
                    osInfo(),
                ]);
                //name computer
                data.hd ||= os.hostname || null;
                //hdd
                // data.hd ||= disk?.[0]?.name || disk?.[0]?.type || null;
                // data.ram ||= memory
                //     ? `${Math.round(memory.total / 1024 / 1024)} MB`
                //     : null;
                data.ram ||= memory
                    ? `${(memory.total / 1024 / 1024 / 1024).toFixed(2)} GB`
                    : null;
                data.cpu ||= proc ? `${proc.manufacturer} ${proc.brand}` : null;
            } catch (err) {
                console.error("systeminfo error:", err);
            }
        }
        return data;
    },
    list(query) {
        // Accept status filter that can be string names or numeric ids.
        return Product.findAll(query.search, query.status);
    },
    get(id) {
        return Product.findById(id);
    },
    update(id, data, userId) {
        return Product.update(id, data, userId);
    },
    delete(id, userId) {
        return Product.delete(id, userId);
    },
    restore(id, userId) {
        return Product.restore(id, userId);
    },
    getDeleted() {
        return Product.findDeleted();
    },
    getEditLogs(productId) {
        return Product.getEditLogs(productId);
    },
    searchEditLogs(search, productId) {
        return Product.searchEditLogs(search, productId);
    }
};

module.exports = ProductService;
