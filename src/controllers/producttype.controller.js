const ProductTypeService = require('../services/producttype.service');

const ProductTypeController = {
    async create(req, res) {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });
        const pt = await ProductTypeService.create({ name });
        res.status(201).json(pt);
    },
    async list(req, res) {
        const { search } = req.query;
        const pts = await ProductTypeService.list(search);
        res.json(pts);
    },
    async get(req, res) {
        const id = req.params.id;
        const pt = await ProductTypeService.get(id);
        if (!pt) return res.status(404).json({ message: 'Product Type not found' });
        res.json(pt);
    }
    , async update(req, res) {
        const id = req.params.id;
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name is required' });
        const updated = await ProductTypeService.update(id, { name });
        res.json(updated);
    }
    , async remove(req, res) {
        const id = req.params.id;
        const deleted = await ProductTypeService.remove(id);
        if (!deleted) return res.status(404).json({ message: 'Product Type not found' });
        res.status(200).json({ message: 'Product Type deleted successfully' });
    }
    

};

module.exports = ProductTypeController;