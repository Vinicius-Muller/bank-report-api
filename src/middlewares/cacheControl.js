const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

function cacheControl(fetchFunction) {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if (cachedData) {
      res.setHeader("X-Cache", "HIT");
      res.json(cachedData);

      setImmediate(async () => {
        try {
          const freshData = await fetchFunction(req, res);
          cache.set(key, freshData);
        } catch (err) {
          console.error(err);
        }
      });
    } else {
      res.setHeader("X-Cache", "MISS");
      try {
        const freshData = await fetchFunction(req, res);
        cache.set(key, freshData);
        res.json(freshData);
      } catch (err) {
        next(err);
      }
    }
  };
}

module.exports = cacheControl;
