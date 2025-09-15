const ProductService = require("../services/product.service");
const si = require("systeminformation");
async function fillSystemInfo(data) {
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
    return data;
}
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
    await fillSystemInfo(data);
    try {
      const prod = await ProductService.create(data);
      res.status(201).json(prod);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Asset code already exists.' });
      }
      if (error.code === 'INVALID_PRODUCT_TYPE') {
        return res.status(400).json({ message: 'Invalid product_type id' });
      }
      if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.message.includes('foreign key') ) {
        return res.status(400).json({ message: 'Invalid foreign key reference' , error: error.message});
      }
      res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
  },

  async list(req, res){
    const {search,status} = req.query;
    const q = {};
    if (search) q.search = search;
    if (typeof status !== 'undefined') q.status = Number(status);
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
    try {
      const id = req.params.id;
      const {newData,logData} = req.body;

      // if (newData.status_id !== undefined) {
      //   newData.status = newData.status_id;
      //   delete newData.status_id;
      // }

      await fillSystemInfo(newData);

      const updated = await ProductService.updateAndlog(id, newData,logData);
      return res.json({
        success: true,
        message: "Product updated and logged",
        data: updated,
      });
    } catch (error) {
      if (error.message.includes('Duplicate')) {
        return res.status(409).json({ message: error.message });
      }
      if (error.code === 'ER_NO_REFERENCED_ROW_2' || error.message.includes('foreign key') ) {
        return res.status(400).json({ message: 'Invalid foreign key reference' , error: error.message});
      }
      // if (error.message.includes("Data truncated for column 'status'")) {
      //   return res.status(400).json({ message: "Invalid status value. Please use 1 for 'Active' or 2 for 'Inactive'." });
      // }
      res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
  }
};

module.exports = ProductController;
