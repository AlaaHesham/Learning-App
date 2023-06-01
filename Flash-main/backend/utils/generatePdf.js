const PDFDocument = require('pdfkit');
const fs = require('fs');



const certificate = async (name,course,id) => {
	const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream(`./certificates/${name}${course}${id}.pdf`));
    doc
      .fontSize(25)
      .text("Certificate of completion", 100, 100);

    doc
      .addPage()
      .fontSize(20)
      .text(`This to certify that ${name} successfully completed ${course} online course on our website on ${Date.now} `, 100, 100);

    doc.end();
};

const notes=(notes,dataCallback,endCallback)=>{
  const doc = new PDFDocument();

    doc.on("data",dataCallback);
    doc.on("end",endCallback);
    doc.fontSize(20).text(notes, 100, 150);

    doc.end();
}

module.exports={certificate,notes}


