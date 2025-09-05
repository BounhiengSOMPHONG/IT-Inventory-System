const ProductService = require("../services/product.service");
const si = require("systeminformation");

const ProductController = {
  async create(req, res) {
    const data = req.body;
    const {
      name,
      product_model,
      manufacturer,
      product_type_id,
      asset_code,
      serial_number,
      service_tag,
      added_by,
      year_bought,
    } = data;
    if (
      !name ||
      !product_model ||
      !manufacturer ||
      !product_type_id ||
      !asset_code ||
      !serial_number ||
      !service_tag ||
      !added_by ||
      !year_bought
    ) {
      return res.status(400).json({ message: "Incomplete information" });
    }
    const { diskLayout, mem, cpu, osInfo  } = si;

    if (!data.hd || !data.ram || !data.cpu) {
      try {
        const [disk, memory, proc,os] = await Promise.all([
          diskLayout(),
          mem(),
          cpu(),
          osInfo(),
        ]);
        //name computer
        data.hd ||= os.hostname || null;
        //hdd
        // data.hd ||= disk?.[0]?.name || disk?.[0]?.type || null;
        data.ram ||= memory
          ? `${Math.round(memory.total / 1024 / 1024)} MB`
          : null;
        data.cpu ||= proc ? `${proc.manufacturer} ${proc.brand}` : null;
      } catch (err) {
        console.error("systeminfo error:", err);
      }
    }
    try {
      const prod = await ProductService.create(data);
      res.status(201).json(prod);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Asset code already exists.' });
      }
      res.status(500).json({ message: 'An error occurred.' });
    }
  },

  async list(req, res){
    const {search,status_id} = req.query;
    const q = {};
    if (search) q.search = search;
    if (typeof status_id !== 'undefined') q.status_id = Number(status_id);
    const prods = await ProductService.list(q);
    res.json(prods);
  },
  async get(req,res){
    const id = req.params.id;
    const prod = await ProductService.get(id);
    if (!prod) return res.status(404).json({message: 'Product not found'});
    res.json(prod);
  },
  async update(req,res){
    const id = req.params.id;
    const {newData,logData} = req.body;
    const updated = await ProductService.updateAndlog(id, newData,logData);
    return res.json({
      success: true,
      message: "Product updated and logged",
      data: updated,
    });
  }
};

module.exports = ProductController;
