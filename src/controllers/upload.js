const ofx = require("ofx-js");

const getData = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    const ofxContent = req.file.buffer.toString("utf8");
    const parsedData = await ofx.parse(ofxContent);

    const transactions =
      parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

    const { income, outcome } = categorizeTransactions(transactions);

    res.status(200).json({
      income,
      outcome,
    });
  } catch (error) {
    console.error("Erro ao processar o arquivo OFX:", error);
    res.status(500).json({ error: "Erro ao processar o arquivo OFX" });
  }
};

const categorizeTransactions = (transactions) => {
  const income = [];
  const outcome = [];

  transactions.forEach((transaction) => {
    const value = parseFloat(transaction.TRNAMT);
    const category = {
      date: transaction.DTPOSTED,
      description: transaction.MEMO,
      value,
    };

    if (value >= 0) {
      income.push(category);
    } else {
      outcome.push(category);
    }
  });

  return { income, outcome };
};

module.exports = {
  getData,
};
