const express = require("express");
const multer = require("multer");
const ofx = require("ofx-js");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    const ofxContent = req.file.buffer.toString("utf8");
    const parsedData = await ofx.parse(ofxContent);

    const transactions =
      parsedData.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;

    const { receitas, despesas } = categorizeTransactions(transactions);

    res.status(200).json({
      message: "Arquivo OFX processado com sucesso!",
      receitas,
      despesas,
    });
  } catch (error) {
    console.error("Erro ao processar o arquivo OFX:", error);
    res.status(500).json({ error: "Erro ao processar o arquivo OFX" });
  }
});

const categorizeTransactions = (transactions) => {
  const receitas = [];
  const despesas = [];

  transactions.forEach((transaction) => {
    const value = parseFloat(transaction.TRNAMT);
    const category = {
      date: transaction.DTPOSTED,
      description: transaction.MEMO,
      value,
    };

    if (value >= 0) {
      receitas.push(category);
    } else {
      despesas.push(category);
    }
  });

  return { receitas, despesas };
};

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
