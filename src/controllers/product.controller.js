const ProductService = require('../services/product.service');
const si = require('systeminformation');

const ProductController = {
  async create(req, res) {
    const data = req.body;
    // allow clients to request current system info for hd/ram/cpu by passing `use_system_info=true`
    // only populate values that are missing (null/undefined/empty)
    if (req.query.use_system_info === 'true') {
      const needHd = !data.hd;
      const needRam = !data.ram;
      const needCpu = !data.cpu;
      if (needHd || needRam || needCpu) {
        try {
          const disk = await si.diskLayout();
          const mem = await si.mem();
          const cpu = await si.cpu();
          if (needHd) data.hd = disk && disk.length ? disk[0].name || disk[0].type : null;
          if (needRam) data.ram = mem ? `${Math.round(mem.total / (1024 * 1024))} MB` : null;
          if (needCpu) data.cpu = cpu ? cpu.manufacturer + ' ' + cpu.brand : null;
        } catch (err) {
          // ignore systeminfo errors and continue
        }
      }
    }
    const prod = await ProductService.create(data);
    res.status(201).json(prod);
  },

  async list(req, res) {
    const { search, status_id } = req.query;
    const q = {};
    if (search) q.search = search;
    if (typeof status_id !== 'undefined') q.status_id = Number(status_id);
    const prods = await ProductService.list(q);
    res.json(prods);
  },

  async get(req, res) {
    const id = req.params.id;
    const prod = await ProductService.get(id);
    if (!prod) return res.status(404).json({ message: 'Product not found' });
    res.json(prod);
  },

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const updated = await ProductService.update(id, data);
    res.json(updated);
  },

  async remove(req, res) {
    const id = req.params.id;
    const ok = await ProductService.remove(id);
    if (!ok) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product marked inactive' });
  },

  async restore(req, res) {
    const id = req.params.id;
    const ok = await ProductService.restore(id);
    if (!ok) return res.status(404).json({ message: 'Product not found or not restorable' });
    res.json({ message: 'Product restored to active' });
  }
};

module.exports = ProductController;


