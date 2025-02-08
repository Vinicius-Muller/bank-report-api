const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

function cacheControl(fetchFunction) {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    try {
      const freshData = await fetchFunction(req, res);
      
      if (cachedData) {
        if (JSON.stringify(cachedData) === JSON.stringify(freshData)) {
          res.setHeader("X-Cache", "HIT");
          return res.json(cachedData);
        }
      }
      
      res.setHeader("X-Cache", "MISS");
      cache.set(key, freshData);
      return res.json(freshData);

    } catch (err) {
      next(err);
    }
  };
}

module.exports = cacheControl;
